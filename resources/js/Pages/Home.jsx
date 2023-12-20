import React, { useState } from 'react';
import UserRegistration from '../components/UserRegistration';
import UserLogin from '../components/UserLogin';
import { Head } from '@inertiajs/react';

export default function Home() {

  const [isLoggingIn, setIsLoggingIn] = useState(true);

  function handleSignUpLoginToggle(e) {
    setIsLoggingIn(!isLoggingIn);
  }

  return (
    <>
      <Head>
        <title>Home Page</title>
        <meta name="description" content="This is the home page where you login or register for an account." />
      </Head>
      <div className="flex flex-col">
        <div className="flex w-ful bg-[url('https://th.bing.com/th/id/OIG.EQR13_vh6wjB2e_f1Kfn?pid=ImgGn')] bg-center bg-cover h-52">
        </div>
        <div className="flex w-full justify-center my-3 md:w-1/2 mx-auto">
          {isLoggingIn &&
            <div className="border-4 border-[#005E5B] w-11/12">
              <h3 className="text-xl ml-3 -translate-y-4 bg-[#F5F6F8] w-16 text-center text-[#F3651E]">Login:</h3>
              <UserLogin />
              <button onClick={() => handleSignUpLoginToggle()} type="button" className="text-blue-700 p-1 m-1 hover:font-bold">Register</button>
            </div>
          }

          {!isLoggingIn &&
            <div className="border-4 border-[#005E5B] w-11/12">
              <h3 className="text-xl ml-3 -translate-y-4 bg-[#F5F6F8] w-20 text-center text-[#F3651E]">Sign up:</h3>
              <UserRegistration />
              <button onClick={() => handleSignUpLoginToggle()} type="button" className="text-blue-700 p-1 m-1 hover:font-bold">
                Already registered
              </button>
            </div>
          }
        </div>
      </div>
    </>
  )
}
