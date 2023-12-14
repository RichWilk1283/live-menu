import React from 'react';
import Logout from './Logout';

export default function TitleBar({ userName }) {
  return (
    <div className="flex flex-row w-ful justify-between bg-[url('https://th.bing.com/th/id/OIG.EQR13_vh6wjB2e_f1Kfn?pid=ImgGn')] bg-center bg-cover h-52 items-end">
      <h1 className="bg-gray-700/70 text-white p-1 px-2 m-1 rounded-md">Hello, {userName}</h1>
      <Logout />
    </div>
  )
}
