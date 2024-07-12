"use client"
import React, { useState } from 'react';
import { useAuth, useSignIn } from '@clerk/nextjs';
import type { NextPage } from 'next';
import { useRouter } from 'next/navigation';

const ForgotPasswordPage: NextPage = () => {

  const [successfulCreation, setSuccessfulCreation] = useState(false);

  const [complete,setComplete] = useState(false);

  const [secondFactor, setSecondFactor] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();
  const { isSignedIn } = useAuth();
  const { isLoaded, signIn, setActive } = useSignIn();

  if (!isLoaded) {
    return null;
  }

  // If the user is already signed in,
  // redirect them to the home page
  if (isSignedIn) {
    router.push('/');
  }

  // Send the password reset code to the user's email
  async function create(e: any) {
    e.preventDefault();
    const email = e.target[0].value;
    await signIn
      ?.create({
        strategy: 'reset_password_email_code',
        identifier: email,
      })
      .then(_ => {
        setSuccessfulCreation(true);
        setError('');
      })
      .catch(err => {
        console.error('error', err.errors[0].longMessage);
        setError(err.errors[0].longMessage);
      });
  }

  // Reset the user's password. 
  // Upon successful reset, the user will be 
  // signed in and redirected to the home page
  async function reset(e: any) {
    e.preventDefault();
    const password = e.target[0].value;
    const code = e.target[1].value;

    await signIn
      ?.attemptFirstFactor({
        strategy: 'reset_password_email_code',
        code,
        password,
      })
      .then(result => {
        // Check if 2FA is required
        if (result.status === 'needs_second_factor') {
          setSecondFactor(true);
          setError('');
        } else if (result.status === 'complete') {
          // Set the active session to 
          // the newly created session (user is now signed in)
          setActive({ session: result.createdSessionId });
          setComplete(true);
          setError('');
        } else {
          console.log(result);
        }
      })
      .catch(err => {
        console.error('error', err.errors[0].longMessage)
        setError(err.errors[0].longMessage);
      });
  }

  return (
    <div className=" flex min-h-screen flex-col items-center justify-between p-24">
        <div className=" bg-[#212121] p-8 rounded shadow-md w-96">
            <h1 className=" text-center font-semibold mb-8">
                {successfulCreation && !complete ? "New Password" : "Forgot Password"}
            </h1>
            <form onSubmit={!successfulCreation ? create : reset}>
                {!successfulCreation && !complete && (
                    <>
                        <input type="email" className='w-full  text-black rounded px-3 py-2 mb-4' placeholder="Email" required  />
                        <button type='submit' className=' w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600'>
                          {" "}
                          Submit
                        </button>

                    </>
                )}
                {successfulCreation && !complete && (
                  <>
                    <input 
                      type='password' 
                      className=' w-full border border-gray-300 text-black rounded px-3 py-2 mb-4'
                      placeholder='New Password' 
                      required
                      />
                    <input 
                      type='text' 
                      className=' w-full border border-gray-300 text-black rounded px-3 py-2 mb-4'
                      placeholder='Code' 
                      required
                      />
                      <button type='submit' className=' bg-blue-500 text-white py-2 rounded hover:bg-blue-600'>
                        {" "}
                        Submit
                      </button>
                  </>
                )}
                {
                  complete && " successfully changed your password"
                }
                {secondFactor && "2FA is required,this UI does not handle that"}
            </form>
        </div>
    </div>
  );
};

export default ForgotPasswordPage;