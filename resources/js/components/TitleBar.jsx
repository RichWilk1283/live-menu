import React from 'react';
import Logout from './Logout';
import { useUserStore } from '../store/UserStore';

export default function TitleBar() {

  const loggedInUser = useUserStore((state) => state.loggedInUser);

  return (
    <div className="flex flex-col w-ful bg-[url('https://th.bing.com/th/id/OIG.SNQbolJs.pvCwpLrAabs?w=1024&h=1024&rs=1&pid=ImgDetMain')] justify-between bg-contain h-52">
      <h1 className="text-white text-6xl font-extrabold self-center my-auto">Live! Menu</h1>
      <div className="flex flex-row w-ful justify-between">
        <h1 className="bg-gray-700/70 text-white p-1 px-2 m-1 md:ml-8 rounded-md">Hello, {loggedInUser}</h1>
        <Logout />
      </div>
    </div>
  )
}
