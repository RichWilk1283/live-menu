import React from 'react';
import { Link } from '@inertiajs/react';
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";

export default function Logout() {
  return (
    <div>
      <Link
        href="/logout"
        method="post"
        as="button"
        type="button"
        className="text-white font-semibold flex p-1 px-2 m-1 md:mr-8 bg-[#005E5B] rounded-md"
      >
        Logout
        <ArrowRightOnRectangleIcon
          className="h-6 w-6"
        />
      </Link>
    </div>
  )
}
