
// Ghana public holidays and special observances
export interface Holiday {
  name: string;
  date: string; // YYYY-MM-DD format
  type: 'public' | 'religious' | 'observance';
}

// 2024 Ghana Public Holidays
const holidays2024: Holiday[] = [
  { name: "New Year's Day", date: "2024-01-01", type: "public" },
  { name: "Constitution Day", date: "2024-01-07", type: "public" },
  { name: "Independence Day", date: "2024-03-06", type: "public" },
  { name: "Good Friday", date: "2024-03-29", type: "religious" },
  { name: "Easter Monday", date: "2024-04-01", type: "religious" },
  { name: "Eid al-Fitr", date: "2024-04-10", type: "religious" },
  { name: "May Day", date: "2024-05-01", type: "public" },
  { name: "Eid al-Adha", date: "2024-06-17", type: "religious" },
  { name: "Founder's Day", date: "2024-08-04", type: "public" },
  { name: "Kwame Nkrumah Memorial Day", date: "2024-09-21", type: "public" },
  { name: "Farmer's Day", date: "2024-12-06", type: "public" },
  { name: "Christmas Day", date: "2024-12-25", type: "religious" },
  { name: "Boxing Day", date: "2024-12-26", type: "public" },
];

// 2025 Ghana Public Holidays (estimated dates)
const holidays2025: Holiday[] = [
  { name: "New Year's Day", date: "2025-01-01", type: "public" },
  { name: "Constitution Day", date: "2025-01-07", type: "public" },
  { name: "Independence Day", date: "2025-03-06", type: "public" },
  { name: "Good Friday", date: "2025-04-18", type: "religious" },
  { name: "Easter Monday", date: "2025-04-21", type: "religious" },
  { name: "Eid al-Fitr", date: "2025-03-30", type: "religious" },
  { name: "May Day", date: "2025-05-01", type: "public" },
  { name: "Eid al-Adha", date: "2025-06-06", type: "religious" },
  { name: "Founder's Day", date: "2025-08-04", type: "public" },
  { name: "Kwame Nkrumah Memorial Day", date: "2025-09-21", type: "public" },
  { name: "Farmer's Day", date: "2025-12-05", type: "public" },
  { name: "Christmas Day", date: "2025-12-25", type: "religious" },
  { name: "Boxing Day", date: "2025-12-26", type: "public" },
];

const allHolidays = [...holidays2024, ...holidays2025];

export const isHoliday = (date: Date): Holiday | null => {
  const dateString = date.toISOString().split('T')[0];
  const holiday = allHolidays.find(h => h.date === dateString);
  return holiday || null;
};

export const getTodaysHoliday = (): Holiday | null => {
  return isHoliday(new Date());
};

export const isWeekend = (date: Date): boolean => {
  const day = date.getDay();
  return day === 0 || day === 6; // Sunday or Saturday
};

export const isOfficeHours = (date: Date = new Date()): boolean => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const currentTime = hours + minutes / 60;
  
  // Office hours: 8:30 AM - 5:00 PM (Monday to Friday)
  const isWorkingHours = currentTime >= 8.5 && currentTime < 17;
  const isWeekday = !isWeekend(date);
  const holiday = isHoliday(date);
  
  return isWorkingHours && isWeekday && !holiday;
};

export const getOfficeStatus = () => {
  const now = new Date();
  const holiday = getTodaysHoliday();
  const weekend = isWeekend(now);
  const inOfficeHours = isOfficeHours(now);
  
  if (holiday) {
    return {
      isOpen: false,
      status: 'closed',
      reason: `Closed for ${holiday.name}`,
      type: 'holiday'
    };
  }
  
  if (weekend) {
    return {
      isOpen: false,
      status: 'closed',
      reason: 'Closed for weekend',
      type: 'weekend'
    };
  }
  
  if (inOfficeHours) {
    return {
      isOpen: true,
      status: 'open',
      reason: 'Open now',
      type: 'business_hours'
    };
  }
  
  return {
    isOpen: false,
    status: 'closed',
    reason: 'Outside business hours',
    type: 'after_hours'
  };
};
