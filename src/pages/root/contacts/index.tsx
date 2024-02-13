import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { GET } from '../../../utils/utils';
import '../../../components/button/index.scss';
import errorToast from '../../../components/toasts';
import Card from '../../../components/card';
import User from '../../../repo/User';

export default function Contacts(): React.ReactNode {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<User[] | null>(null);

  async function query() {
    try {
      const result = await GET(`users?name=${search}`);
      if (!result.success) {
        errorToast('Request failed!');
      }
      setResults(result.payload);
    } catch {
      errorToast('Internal Error!');
    }
  }

  function capitalizeFirstLetter(s: string) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  return (
    <main className="w-full flex-col justify-center pt-20">
      <div className="search w-full flex justify-center gap-2">
        <input
          id="search"
          type="text"
          className="bg-white w-1/2"
          aria-label="search"
          placeholder="Enter user id or name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="button" className="btn" onClick={query} aria-label="search-button">
          <div className="flex gap-4">
            <MagnifyingGlassIcon className="h-6 w-6" />
            <span>SEARCH</span>
          </div>
        </button>
      </div>
      <div className="mt-20 py-10 flex flex-wrap gap-4 justify-center">
        {results === null ? (
          <span>No results to show!</span>
        ) : (
          results.map((result: User) => (
            <NavLink to={`/contacts/${result.id}`} key={result.id}>
              <Card>
                <div className="flex gap-6">
                  <img
                    src={`https://randomuser.me/api/portraits/men/${result.id}.jpg`}
                    className="h-24 w-24 rounded-full"
                    alt="profile"
                  />
                  <div className="flex flex-col gap-2 justify-center">
                    <div className="flex gap-4">
                      <span className="text-gray-600 italic">Name: </span>
                      <span>{result.name}</span>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-gray-600 italic">Phone: </span>
                      <span>{result.phone}</span>
                    </div>

                    <div className="flex gap-4">
                      <span className="text-gray-600 italic bold">Designation: </span>
                      <span>{capitalizeFirstLetter(result.role)}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </NavLink>
          ))
        )}
      </div>
      <ToastContainer />
    </main>
  );
}
