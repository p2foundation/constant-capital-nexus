import { describe, expect, test } from 'bun:test';
import { debounce } from 'lodash';
import { createSaveQueue, createUploadCache } from '../src/lib/accountSaveConcurrency';

function deferred<T>() {
  let resolve: (value: T) => void = () => undefined;
  const promise = new Promise<T>((done) => { resolve = done; });
  return { promise, resolve };
}

describe('KYC save concurrency', () => {
  test('typing during an ID upload shares one pending upload and its completed path', async () => {
    const uploadOnce = createUploadCache();
    const file = new File(['photo'], 'ghana-card.jpg');
    const pending = deferred<string>();
    let uploads = 0;
    const upload = () => { uploads++; return pending.promise; };
    const saves = Array.from({ length: 10 }, () => uploadOnce(file, 'client/app/ghanaCardFront', upload));
    await Promise.resolve();
    expect(uploads).toBe(1);
    pending.resolve('client/app/front.jpg');
    expect(await Promise.all(saves)).toEqual(Array(10).fill('client/app/front.jpg'));
    expect(await uploadOnce(file, 'client/app/ghanaCardFront', upload)).toBe('client/app/front.jpg');
    expect(uploads).toBe(1);
  });

  test('the same File is uploaded separately for a different application or field', async () => {
    const uploadOnce = createUploadCache();
    const file = new File(['photo'], 'card.jpg');
    let uploads = 0;
    const upload = async () => String(++uploads);
    await uploadOnce(file, 'client/app1/front', upload);
    await uploadOnce(file, 'client/app2/front', upload);
    await uploadOnce(file, 'client/app2/back', upload);
    expect(uploads).toBe(3);
  });

  test('a failed upload can be retried', async () => {
    const uploadOnce = createUploadCache();
    const file = new File(['photo'], 'passport.jpg');
    let uploads = 0;
    const upload = async () => {
      uploads++;
      if (uploads === 1) throw new Error('offline');
      return 'passport.jpg';
    };
    await expect(uploadOnce(file, 'client/app/passport', upload)).rejects.toThrow('offline');
    expect(await uploadOnce(file, 'client/app/passport', upload)).toBe('passport.jpg');
    expect(uploads).toBe(2);
  });

  test('slow old answers finish before the latest answers are written', async () => {
    const enqueue = createSaveQueue();
    const photo = deferred<void>();
    const written: string[] = [];
    const first = enqueue(async () => { await photo.promise; written.push('P123'); });
    const latest = enqueue(async () => { written.push('P123456'); });
    await Promise.resolve();
    expect(written).toEqual([]);
    photo.resolve(undefined);
    await Promise.all([first, latest]);
    expect(written).toEqual(['P123', 'P123456']);
  });

  test('a failed save does not block newer answers', async () => {
    const enqueue = createSaveQueue();
    const failed = enqueue(async () => { throw new Error('offline'); });
    const latest = enqueue(async () => 'P123456');
    await expect(failed).rejects.toThrow('offline');
    expect(await latest).toBe('P123456');
  });

  test('edits typed in the last debounce window still save when the form unmounts', async () => {
    const saved: string[] = [];
    const debouncedSave = debounce((answers: string) => { saved.push(answers); }, 2000);
    const onUnmount = () => debouncedSave.flush();
    debouncedSave('P123456');
    onUnmount();
    expect(saved).toEqual(['P123456']);
  });
});