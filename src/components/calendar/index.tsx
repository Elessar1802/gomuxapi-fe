import React from 'react';
import Calendar from 'react-calendar';
import './index.scss';
import { MonthEnum, Month } from '../../types';

interface CalendarComponentIface {
  attendance: number[],
  month: Month,
}

export default function CalendarComponent({
  attendance,
  month,
}: CalendarComponentIface): React.ReactNode {
  const dict = Object.assign({}, ...attendance.map((el) => ({ [el]: true })));
  new Date().getMonth();
  const markPresence = ({ date }: { date: Date }) => (
    date.getMonth() === MonthEnum[month] && date.getDate() in dict ? 'user-present' : ''
  );
  return <Calendar tileClassName={markPresence} />;
}
