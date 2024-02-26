import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { UserPlusIcon } from '@heroicons/react/24/outline';
import Card from '../../../components/card';
import '../../../components/button/index.scss';
import { POST } from '../../../utils/utils';
import { errorToast, successToast } from '../../../components/toasts';

export default function Enroll() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [Class, setClass] = useState('');
  const [role, setRole] = useState('student');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const user = {
      name,
      phone,
      role,
      class: Class,
    };
    const res = await POST('users', JSON.stringify(user));
    if (!res.success) {
      errorToast('User addition failed!');
    } else {
      successToast('User successfully added!');
    }
  }

  return (
    <main className="min-h-screen flex justify-center items-center">
      <Card>
        <div className="flex flex-col gap-16 w-full">
          <div className="flex justify-center gap-4">
            <UserPlusIcon className="h-6 w-6" />
            <span className="tracking-wide">Add User</span>
          </div>
          <form className="flex flex-col w-full gap-4" onSubmit={submit}>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              value={name}
              maxLength={50}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              required
            />
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              maxLength={10}
              placeholder="Phone"
              required
            />
            {role !== 'student' ? undefined : (
              <input
                type="text"
                className="mt-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={Class}
                onChange={(e) => setClass(e.target.value.toUpperCase())}
                maxLength={5}
                placeholder="Class"
                required
              />
            )}
            <div className="flex gap-4">
              <select
                className="flex-grow mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                aria-label="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option selected value="student">
                  Student
                </option>
                <option value="teacher">Teacher</option>
              </select>
              <button type="submit" className="btn">
                SUBMIT
              </button>
            </div>
          </form>
        </div>
      </Card>
      <ToastContainer />
    </main>
  );
}
