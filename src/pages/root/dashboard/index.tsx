import React, { useContext, useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import '../../../components/button/index.scss';
import UserContext from '../../contexts';
import { POST, PUT } from '../../../utils/utils';
import { successToast, errorToast } from '../../../components/toasts';
import Card from '../../../components/card';
import CalendarComponent from '../../../components/calendar';
import DateComponent from '../../../components/date';
import { getAttendanceThisMonth, Attendances, extractAttendanceDays } from '../../../utils/attendance';
import { MonthEnumReverse } from '../../../types';

export default function Dashboard(): React.ReactNode {
  const user = useContext(UserContext);
  const [attendance, setAttendance] = useState<Attendances | null>(null);

  useEffect(() => {
    if (user.role === 'principal') return;
    (async () => {
      const res = await getAttendanceThisMonth(String(user.id), 'user');
      if (!res.success) {
        return;
      }
      setAttendance(res.payload);
    })();
  }, [user]);

  async function punchIn() {
    const result = await POST(`attendance/user/${user?.id}`);
    if (result.success) {
      successToast('Successfully punched in');
    } else {
      errorToast(result.error.message);
    }
  }

  async function punchOut() {
    const result = await PUT(`attendance/user/${user?.id}`);
    if (result.success) {
      successToast('Successfully punched out');
    } else {
      errorToast(result.error.message);
    }
  }

  return (
    <main className="min-h-screen flex flex-col gap-20">
      <section className="flex items-center px-20 mt-20">
        <div className="flex flex-col gap-4 flex-grow">
          <span className="font-bold text-lg">
            Welcome,
            {` ${user.name}`}
          </span>
          <div className="text-xl">
            <DateComponent />
          </div>
        </div>
        {user?.role === 'principal' ? undefined : (
          <div className="flex gap-6">
            <button className="btn" type="button" onClick={punchIn}>
              Punch In
            </button>
            <button className="btn" type="button" onClick={punchOut}>
              Punch Out
            </button>
          </div>
        )}
      </section>
      {user.role === 'principal' ? undefined : (
        <section className="flex justify-center items-center">
          <Card>
            <div className="flex flex-col gap-10 px-10 items-center">
              <span className="text-2xl">{`${MonthEnumReverse[new Date().getMonth()]}'s Attendance Record`}</span>
              <CalendarComponent
                attendance={attendance ? extractAttendanceDays(attendance) : []}
                month={MonthEnumReverse[new Date().getMonth()]}
              />
            </div>
          </Card>
        </section>
      )}
      <ToastContainer />
    </main>
  );
}
