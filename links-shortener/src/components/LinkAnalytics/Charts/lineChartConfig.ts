import { TDetails } from "@/schemas/dbSchema";
import {
  addDays,
  addMonths,
  differenceInDays,
  differenceInHours,
  eachDayOfInterval,
  endOfDay,
  format,
  isAfter,
  isBefore,
  isWithinInterval,
  startOfDay,
  startOfHour,
  startOfMonth,
  subDays,
  subHours,
  subMonths,
} from "date-fns";

const marginConfig = {
  top: 10,
  left: 10,
  right: 10,
  bottom: 10,
};

type Tperiod = "24h" | "1week" | "1month" | "1year" | "AllTime";

const processData24h = (data: TDetails[]) => {
  const now = new Date();
  const currentHour = startOfHour(now);
  const past24h = subHours(currentHour, 23);

  const hours = Array.from({ length: 24 }, (_, index) => {
    const hour = subHours(currentHour, 23 - index);
    return {
      hour: format(hour, "HH:00"),
      count: 0,
      originalDate: null as Date | null,
    };
  });
  data.forEach((entry) => {
    const entryDate = new Date(entry.created_at);
    if (isAfter(entryDate, past24h) && entryDate <= currentHour) {
      const hourIndex =
        23 - differenceInHours(currentHour, startOfHour(entryDate));
      hours[hourIndex].count++;
      if (
        !hours[hourIndex].originalDate ||
        entryDate > hours[hourIndex].originalDate
      ) {
        hours[hourIndex].originalDate = entryDate;
      }
    }
  });
  return hours.map((hourData) => ({
    hour: hourData.hour,
    count: hourData.count,
    originalDate: hourData.originalDate
      ? format(hourData.originalDate, "yyyy-MM-dd HH:mm:ss")
      : null,
  }));
};

const processDataWeek = (data: TDetails[]) => {
  const now = new Date();
  const today = startOfDay(now);
  const pastWeek = subDays(today, 6);

  const days = Array.from({ length: 7 }, (_, index) => {
    const day = addDays(pastWeek, index);
    return {
      day: format(day, "EEE"),
      date: format(day, "yyyy-MM-dd"),
      count: 0,
      originalDate: null as Date | null,
    };
  });
  data.forEach((entry) => {
    const entryDate = new Date(entry.created_at);
    if (isAfter(entryDate, pastWeek) && entryDate <= now) {
      const dayIndex = differenceInDays(startOfDay(entryDate), pastWeek);
      if (dayIndex >= 0 && dayIndex < 7) {
        days[dayIndex].count++;
        if (
          !days[dayIndex].originalDate ||
          entryDate > days[dayIndex].originalDate
        ) {
          days[dayIndex].originalDate = entryDate;
        }
      }
    }
  });
  return days.map((dayData) => ({
    day: dayData.day,
    date: dayData.date,
    count: dayData.count,
    originalDate: dayData.originalDate
      ? format(dayData.originalDate, "yyyy-MM-dd")
      : null,
  }));
};

const processDataMonth = (data: TDetails[]) => {
  const now = new Date();
  const today = startOfDay(now);
  const pastMonth = subDays(today, 29);

  const days = Array.from({ length: 30 }, (_, index) => {
    const day = addDays(pastMonth, index);
    return {
      day: format(day, "d"),
      date: format(day, "yyyy-MM-dd"),
      count: 0,
      originalDate: null as Date | null,
    };
  });
  data.forEach((entry) => {
    const entryDate = new Date(entry.created_at);
    if (isAfter(entryDate, pastMonth) && entryDate <= now) {
      const dayIndex = differenceInDays(startOfDay(entryDate), pastMonth);
      if (dayIndex >= 0 && dayIndex < 30) {
        days[dayIndex].count++;
        if (
          !days[dayIndex].originalDate ||
          entryDate > days[dayIndex].originalDate
        ) {
          days[dayIndex].originalDate = entryDate;
        }
      }
    }
  });
  return days.map((dayData) => ({
    day: dayData.day,
    date: dayData.date,
    count: dayData.count,
    originalDate: dayData.originalDate
      ? format(dayData.originalDate, "yyyy-MM-dd")
      : null,
  }));
};

const processDataYear = (data: TDetails[]) => {
  const now = new Date();
  const currentMonth = startOfMonth(now);
  const pastYear = subMonths(currentMonth, 11);
  const months = Array.from({ length: 12 }, (_, index) => {
    const month = addMonths(pastYear, index);
    return {
      month: format(month, "MMM"),
      date: format(month, "yyyy-MM"),
      count: 0,
      originalDate: null as Date | null,
    };
  });
  data.forEach((entry) => {
    const entryDate = new Date(entry.created_at);
    if (
      isAfter(entryDate, pastYear) &&
      isBefore(entryDate, addMonths(currentMonth, 1))
    ) {
      const monthIndex =
        parseInt(format(entryDate, "M")) - parseInt(format(pastYear, "M"));
      const adjustedIndex = monthIndex < 0 ? monthIndex + 12 : monthIndex;
      if (adjustedIndex >= 0 && adjustedIndex < 12) {
        months[adjustedIndex].count++;
        if (
          !months[adjustedIndex].originalDate ||
          entryDate > months[adjustedIndex].originalDate
        ) {
          months[adjustedIndex].originalDate = entryDate;
        }
      }
    }
  });
  return months.map((monthData) => ({
    month: monthData.month,
    date: monthData.date,
    count: monthData.count,
    originalDate: monthData.originalDate
      ? format(monthData.originalDate, "yyyy-MM")
      : null,
  }));
};

const processDataAllTime = (data: TDetails[]) => {
  if (data.length === 0) {
    return [];
  }

  const sortedData = [...data].sort(
    (a, b) =>
      new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  );
  const oldestDate = startOfDay(new Date(sortedData[0].created_at));
  const newestDate = endOfDay(
    new Date(sortedData[sortedData.length - 1].created_at)
  );

  const allDays = eachDayOfInterval({ start: oldestDate, end: newestDate });

  const daysData = allDays.map((day) => ({
    date: format(day, "yyyy-MM-dd"),
    count: 0,
    originalDate: null as Date | null,
  }));

  sortedData.forEach((entry) => {
    const entryDate = new Date(entry.created_at);
    const dayIndex = allDays.findIndex((day) =>
      isWithinInterval(entryDate, {
        start: startOfDay(day),
        end: endOfDay(day),
      })
    );

    if (dayIndex !== -1) {
      daysData[dayIndex].count++;
      if (
        !daysData[dayIndex].originalDate ||
        entryDate > daysData[dayIndex].originalDate!
      ) {
        daysData[dayIndex].originalDate = entryDate;
      }
    }
  });

  const filteredDaysData = daysData.filter(
    (day, index, array) =>
      day.count > 0 || index === 0 || index === array.length - 1
  );

  return filteredDaysData.map((dayData) => ({
    date: dayData.date,
    count: dayData.count,
    originalDate: dayData.originalDate
      ? format(dayData.originalDate, "yyyy-MM-dd HH:mm:ss")
      : null,
  }));
};

export {
  marginConfig,
  processDataWeek,
  processDataMonth,
  processDataYear,
  processData24h,
  processDataAllTime,
};

export type { Tperiod };
