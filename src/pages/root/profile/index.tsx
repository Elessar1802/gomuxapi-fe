import React, { useContext, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import '../../../components/button/index.scss';
import { Cog6ToothIcon, UserIcon } from '@heroicons/react/24/outline';
import UserContext from '../../contexts';
import { PUT } from '../../../utils/utils';
import { errorToast, successToast } from '../../../components/toasts';
import './index.scss';
import Card from '../../../components/card';

export default function Profile(): React.ReactNode {
  const user = useContext(UserContext);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [oldpswd, setOldPswd] = useState('');
  const [newpswd, setNewPswd] = useState('');
  const [retypepswd, setRetypePswd] = useState('');

  async function updateDetails(e: React.FormEvent) {
    e.preventDefault();
    if (name === '' && phone === '') return;
    const data = {
      name,
      phone,
    };
    const res = await PUT(`users/${user.id}`, JSON.stringify(data));
    if (!res.success) {
      errorToast(res.error.message);
    } else {
      successToast('Succesfully updated personal details!');
    }
  }

  async function updatePassword(e: React.FormEvent) {
    e.preventDefault();
    if (retypepswd !== newpswd) {
      errorToast("The passwords don't match");
      return;
    }
    const data = {
      id: String(user.id),
      old_password: oldpswd,
      new_password: newpswd,
    };
    const res = await PUT('auth', JSON.stringify(data));
    if (!res.success) {
      errorToast(res.error.message);
    } else {
      successToast('Succesfully updated password!');
      setRetypePswd('');
      setNewPswd('');
      setOldPswd('');
    }
  }

  function capitalizeFirstLetter(s: string) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  return (
    <main className="min-h-screen flex flex-col justify-center items-center py-20">
      <div className="w-1/2 flex flex-col justify-center gap-14 divide-y divide-gray-500">
        <div className="max-w-lg">
          <Card>
            <div className="flex gap-6">
              <img
                src={`https://randomuser.me/api/portraits/men/${user.id}.jpg`}
                className="h-24 w-24 rounded-full"
                alt="profile"
              />
              <div className="flex flex-col gap-2 justify-center">
                <div className="flex gap-4">
                  <span className="text-gray-600 italic">Name: </span>
                  <span>{user.name}</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-gray-600 italic">Phone: </span>
                  <span>{user.phone}</span>
                </div>

                <div className="flex gap-4">
                  <span className="text-gray-600 italic bold">Designation: </span>
                  <span>{capitalizeFirstLetter(user.role)}</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
        <section className="w-full flex flex-col gap-8 pt-10">
          <div className="flex justify-center gap-4">
            <UserIcon className="h-6 w-6" />
            Personal Details
          </div>
          <form className="flex flex-col gap-4" onSubmit={updateDetails}>
            <input
              id="name"
              type="text"
              className="bg-white w-full block rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              aria-label="search"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              id="phone"
              type="text"
              className="bg-white w-full block rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              aria-label="search"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <button type="submit" className="btn uppercase tracking-wider">
              Update
            </button>
          </form>
        </section>
        <section className="pt-10 w-full flex flex-col gap-8">
          <div className="flex justify-center gap-4">
            <Cog6ToothIcon className="h-6 w-6" />
            Update Password
          </div>
          <form className="flex flex-col gap-4" onSubmit={updatePassword}>
            <input
              id="oldpswd"
              type="password"
              className="bg-white w-full block rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              aria-label="old password"
              placeholder="Old Password"
              value={oldpswd}
              onChange={(e) => setOldPswd(e.target.value)}
              required
            />
            <input
              id="newpswd"
              type="password"
              className="bg-white w-full block rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              aria-label="new password"
              placeholder="New Password"
              value={newpswd}
              onChange={(e) => setNewPswd(e.target.value)}
              required
            />
            <div className={newpswd !== retypepswd ? 'mismatch' : ''}>
              <input
                id="retypepswd"
                type="password"
                className="bg-white w-full block rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                aria-label="retype new password"
                placeholder="Retype New Password"
                value={retypepswd}
                onChange={(e) => setRetypePswd(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn uppercase tracking-wider">
              Update
            </button>
          </form>
        </section>
      </div>
      <ToastContainer />
    </main>
  );
}
