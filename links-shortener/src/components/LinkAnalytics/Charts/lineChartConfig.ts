import { TDetails } from "@/schemas/dbSchema";
import {
  format,
  getDate,
  getDay,
  getHours,
  getMonth,
  isAfter,
  subDays,
} from "date-fns";
const marginConfig = {
  top: 10,
  left: 10,
  right: 10,
  bottom: 10,
};

type Tperiod = "24h" | "1week" | "1month" | "1year";

const processData24h = (data: TDetails[]) => {
  const now = new Date();
  const past24h = subDays(now, 1);
  const filteredData = data.filter((entry) =>
    isAfter(new Date(entry.created_at), past24h)
  );
  const hours = Array.from({ length: 24 }, () => ({
    count: 0,
    originalDate: null as Date | string | null,
  }));

  filteredData.forEach((entry) => {
    const entryDate = new Date(entry.created_at);
    const hour = getHours(entryDate);
    hours[hour].count++;
    if (!hours[hour].originalDate || entryDate > hours[hour].originalDate) {
      hours[hour].originalDate = format(entryDate, "yyyy-MM-dd HH:mm:ss");
    }
  });

  return hours.map((hourData, i) => ({
    hour: `${i}h`,
    count: hourData.count,
    originalDate: hourData.originalDate,
  }));
};

const processDataWeek = (data: TDetails[]) => {
  const now = new Date();
  const pastWeek = subDays(now, 7);
  const filteredData = data.filter((entry) =>
    isAfter(new Date(entry.created_at), pastWeek)
  );
  const days = Array.from({ length: 7 }, () => ({
    count: 0,
    originalDate: null as Date | string | null,
  }));

  filteredData.forEach((entry) => {
    const entryDate = new Date(entry.created_at);
    const day = getDay(entryDate);
    days[day].count++;
    if (!days[day].originalDate || entryDate > days[day].originalDate) {
      days[day].originalDate = format(entryDate, "yyyy-MM-dd");
    }
  });
  const labels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days.map((dayData, i) => ({
    day: labels[i],
    count: dayData.count,
    originalDate: dayData.originalDate,
  }));
};

const processDataMonth = (data: TDetails[]) => {
  const now = new Date();
  const pastMonth = subDays(now, 30);
  const filteredData = data.filter((entry) =>
    isAfter(new Date(entry.created_at), pastMonth)
  );
  const days = Array.from({ length: 30 }, () => ({
    count: 0,
    originalDate: null as Date | string | null,
  }));

  filteredData.forEach((entry) => {
    const entryDate = new Date(entry.created_at);
    const day = getDate(entryDate);
    if (day <= 30) {
      days[day - 1].count++;
      if (
        !days[day - 1].originalDate ||
        entryDate > days[day - 1].originalDate!
      ) {
        days[day - 1].originalDate = format(entryDate, "yyyy-MM-dd");
      }
    }
  });
  return days.map((dayData, i) => ({
    day: `${i + 1}`,
    count: dayData.count,
    originalDate: dayData.originalDate,
  }));
};

const processDataYear = (data: TDetails[]) => {
  const months = Array.from({ length: 12 }, () => ({
    count: 0,
    originalDate: null as Date | string | null,
  }));

  data.forEach((entry) => {
    const entryDate = new Date(entry.created_at);
    const month = getMonth(entryDate);
    months[month].count++;
    if (!months[month].originalDate || entryDate > months[month].originalDate) {
      months[month].originalDate = format(entryDate, "yyyy-MM");
    }
  });
  const labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return months.map((monthData, i) => ({
    month: labels[i],
    count: monthData.count,
    originalDate: monthData.originalDate,
  }));
};

export {
  marginConfig,
  processDataWeek,
  processDataMonth,
  processDataYear,
  processData24h,
};

export type { Tperiod };
