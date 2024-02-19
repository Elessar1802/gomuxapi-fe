import React, { useContext, useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { ToastContainer } from 'react-toastify';
import { errorToast } from '../../../components/toasts';
import {
  Attendances,
  AttendanceResourceType,
  getAttendance,
  getFormattedDate,
} from '../../../utils/attendance';
import UserContext from '../../contexts';

function UserAttendanceTable({ records }: { records: Attendances }) {
  return (
    <table className="w-2/3 text-sm text-left text-gray-500">
      <thead className="text-xs text-gray-700 uppercase bg-gray-100">
        <tr>
          <th className="px-6 py-3" scope="col">ID</th>
          <th className="px-6 py-3" scope="col">Date</th>
          <th className="px-6 py-3" scope="col">First In</th>
          <th className="px-6 py-3" scope="col">First Out</th>
          <th className="px-6 py-3" scope="col">Duration</th>
        </tr>
      </thead>
      <tbody>
        {records.map((el) => (
          <tr className="bg-white border-b" key={el.date}>
            <td className="px-6 py-3">{el.id}</td>
            <td className="px-6 py-3">{el.date}</td>
            <td className="px-6 py-3">{el.first_in}</td>
            <td className="px-6 py-3">{el.last_out}</td>
            <td className="px-6 py-3">{el.duration}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function Records(): React.ReactNode {
  const user = useContext(UserContext);
  const [search, setSearch] = useState('');
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [resourceType, setResourceType] = useState<AttendanceResourceType>('user');
  const [results, setResults] = useState<Attendances | null>(null);

  async function query(e: React.FormEvent) {
    e.preventDefault();
    try {
      const result = await getAttendance(
        search,
        resourceType,
        getFormattedDate(startDate),
        getFormattedDate(endDate),
      );
      if (!result.success) {
        errorToast(result.error.message);
      }
      setResults(result.payload === undefined ? null : result.payload);
    } catch {
      errorToast('Internal Error!');
    }
  }

  return (
    <main className="w-full flex-col justify-center pt-20">
      <form className="search w-full flex justify-center gap-2" onSubmit={query}>
        <div className="flex flex-col w-1/2 gap-4">
          <div className="flex gap-4">
            {user.role !== 'teacher' ? undefined : (
              <select
                className="block rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={resourceType}
                onChange={
                  (e) => setResourceType(e.target.value.toLowerCase() as AttendanceResourceType)
                }
                required
              >
                <option value="user">User</option>
                <option value="class">Class</option>
              </select>
            )}
            <input
              id="search"
              type="text"
              className="bg-white w-full block rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              aria-label="search"
              placeholder="Enter User ID"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              required
            />
          </div>
          <div className="flex gap-4">
            <input
              id="start_date"
              type="date"
              className="bg-white w-1/2 block rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              aria-label="start date"
              placeholder="Start Date"
              value={startDate.toISOString().substring(0, 10)}
              onChange={(e) => setStartDate(new Date(e.target.value))}
              required
            />
            <input
              id="end_date"
              type="date"
              className="bg-white w-1/2 block rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              aria-label="end date"
              placeholder="End Date"
              value={endDate.toISOString().substring(0, 10)}
              onChange={(e) => setEndDate(new Date(e.target.value))}
              required
            />
          </div>
        </div>
        <button type="submit" className="btn" aria-label="search-button">
          <div className="flex gap-4">
            <MagnifyingGlassIcon className="h-6 w-6" />
            <span>SEARCH</span>
          </div>
        </button>
      </form>
      <div className="mt-20 py-10 flex flex-wrap gap-4 justify-center">
        {results === null ? (
          <span>No results to show!</span>
        ) : (
          <UserAttendanceTable records={results} />
        )}
      </div>
      <ToastContainer />
    </main>
  );
}
