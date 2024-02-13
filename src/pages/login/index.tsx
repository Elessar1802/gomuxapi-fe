import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import './index.scss';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import Card from '../../components/card';
import '../../components/button/index.scss';
import { POST, GET } from '../../utils/utils';
import errorToast from '../../components/toasts';

function Form() {
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const [password, setPassword] = useState('');

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const credentials = {
      id: text,
      password,
    };
    try {
      const res = await POST('auth', JSON.stringify(credentials));
      if (res.success) {
        navigate('/dashboard');
        return;
      }
      errorToast('Wrong credentials!');
    } catch {
      // render a pop up of error
      errorToast('Internal Error!');
    }
  }

  function onChange(fn: React.Dispatch<React.SetStateAction<string>>) {
    return ({ target }: { target: { value: string } }) => fn(target.value);
  }

  return (
    <form className="flex flex-col gap-6" onSubmit={submit}>
      <input
        type="text"
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        value={text}
        onChange={onChange(setText)}
        placeholder="User ID"
      />
      <input
        type="password"
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        value={password}
        onChange={onChange(setPassword)}
        placeholder="Password"
      />
      <button type="submit" className="btn mt-6">
        Submit
      </button>
    </form>
  );
}

export default function LoginPage() {
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      const result = await GET('validate');
      if (result.success) {
        navigate('/dashboard');
      }
    })();
  }, [navigate]);

  return (
    <main className="min-h-screen flex justify-center items-center">
      <Card>
        <div className="flex flex-col gap-16 w-full">
          <div className="flex gap-2 justify-center items-center">
            <UserCircleIcon className="h-6 w-6" />
            <span className="tracking-wider font-light">LOGIN</span>
          </div>
          <Form />
        </div>
      </Card>
      <ToastContainer />
    </main>
  );
}
