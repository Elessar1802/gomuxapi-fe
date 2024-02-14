import React, { useContext } from 'react';
import { ToastContainer } from 'react-toastify';
import Date from '../../../components/date';
import '../../../components/button/index.scss';
import UserContext from '../../contexts';
import { POST, PUT } from '../../../utils/utils';
import { successToast } from '../../../components/toasts';

export default function Dashboard(): React.ReactNode {
  const user = useContext(UserContext);

  async function punchIn() {
    const result = await POST(`attendance/user/${user?.id}`);
    if (result.success) {
      successToast('Successfully punched in');
    }
  }

  async function punchOut() {
    const result = await PUT(`attendance/user/${user?.id}`);
    if (result.success) {
      successToast('Successfully punched out');
    }
  }

  return (
    <main className="min-h-screen">
      <section className="flex items-center px-20 mt-20">
        <div className="flex-grow text-xl">
          <Date />
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
      <ToastContainer />
    </main>
  );
}
