import React from 'react'
import './index.scss'
import { UserIcon } from '@heroicons/react/24/outline'

export default function LoginPage() {
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
  }

  return (
    <main className="min-h-screen flex justify-center items-center">
      <form className='card card--vertical' onSubmit={submit}>
        <div className='card__header card__header--center'>
          {/* <UserIcon width="24px" height="24px" style={{marginRight: '10px'}} /> */}
          <UserIcon className='h-6 w-6' />
          <span className='card__header__span'>LOGIN</span>
        </div>
        <div className="text-input">
          <label htmlFor='id' className='text-input__label'>User ID</label>
          <input
            id='id'
            type='text'
            maxLength={10}
            className="text-input__input"
            placeholder="User ID"
            aria-label='user id' />
        </div>
        <div className="text-input">
          <label htmlFor='password' className='text-input__label'>Password</label>
          <input
            id='password'
            type='text'
            maxLength={10}
            className="text-input__input"
            placeholder="Password"
            aria-label='password' />
        </div>
        <button type='submit' className='button button--width-100'>Submit</button>
      </form>
    </main>
  )
}
