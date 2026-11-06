/** Keep draft writes (including creation) in request order, even after a failure. */
export function createSaveQueue() {
  let tail: Promise<unknown> = Promise.resolve();
  return function enqueue<T>(save: () => Promise<T>): Promise<T> {
    const result = tail.then(save);
    tail = result.catch(() => undefined);
    return result;
  };
}

/** Share both pending and completed uploads, scoped to the destination and File. */
export function createUploadCache() {
  const files = new WeakMap<File, Map<string, Promise<string>>>();
  return function uploadOnce(file: File, destination: string, upload: () => Promise<string>): Promise<string> {
    let destinations = files.get(file);
    if (!destinations) {
      destinations = new Map();
      files.set(file, destinations);
    }
    const existing = destinations.get(destination);
    if (existing) return existing;
    const cached = destinations;
    const pending = Promise.resolve().then(upload).catch((error) => {
      cached.delete(destination);
      throw error;
    });
    cached.set(destination, pending);
    return pending;
  };
}