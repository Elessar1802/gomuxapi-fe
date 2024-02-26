import { Month, MonthEnum, MonthEnumReverse } from '../types';
import { GET } from './utils';

export type Attendance = {
  id: string,
  date: string,
  first_in: string,
  last_out: string,
  duration: string,
};

export type Attendances = Attendance[];

export type AttendanceResourceType = 'class' | 'user';

export function getAttendance(
  id: string,
  resource: AttendanceResourceType,
  startDate: string,
  endDate: string,
) {
  return GET(`attendance/${resource}/${id}?start_date=${startDate}&end_date=${endDate}`);
}

function doubleDigit(month: number): string {
  const ns = String(month);
  if (ns.length > 1) {
    return ns;
  }
  return ns.padStart(2, '0');
}

function getMaxDateInMonth(month: Month) {
  const monthNumber = MonthEnum[month];
  if (monthNumber === 1) return '27';
  if (monthNumber <= 6) return monthNumber % 2 === 0 ? '31' : '30';
  return monthNumber % 2 === 1 ? '31' : '30';
}

export function getAttendanceThisMonth(id: string, resource: AttendanceResourceType) {
  const date = new Date();
  const month = date.getMonth();
  const startDate = `${date.getFullYear()}/${doubleDigit(month + 1)}/01`;
  const endDate = `${date.getFullYear()}/${doubleDigit(month + 1)}/${getMaxDateInMonth(MonthEnumReverse[month])}`;
  return getAttendance(id, resource, startDate, endDate);
}

export function extractAttendanceDays(at: Attendance[]) {
  return at.map((el: Attendance) => (new Date(el.date).getDate()));
}

export function getFormattedDate(date: Date) {
  return `${date.getFullYear()}/${doubleDigit(date.getMonth() + 1)}/${doubleDigit(date.getDate())}`;
}
