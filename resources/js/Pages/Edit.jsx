import React from 'react';
import EditMenuItemForm from '../components/EditMenuItemForm';
import { Link, Head } from '@inertiajs/react';
import Layout from '../components/Layout';

export default function Edit({ menuItem, categories }) {
  return (
    <>
      <Head>
        <title>Edit items</title>
        <meta name="description" content="This is the page to edit menu items." />
      </Head>
      <Layout>
        <div className="flex flex-col items-center bg-[#F5F6F8]">
          <EditMenuItemForm menuItem={menuItem} categories={categories} />
          <Link
            href={`/deletemenuitem/${menuItem.id}`}
            method="delete"
            as="button"
            className="w-10/12 items-center border-4 border-red-500/50 my-3 text-center font-extrabold text-xl text-red-500 hover:bg-red-800 hover:text-black">
            DELETE
          </Link>
          <Link
            href={"/dashboard"}
            as="button"
            className="lg-nav-btn">
            Dashboard
          </Link>
        </div>
      </Layout>
    </>
  )
}
