import { Link, Head } from '@inertiajs/react';
import React from 'react';
import { XMarkIcon, CheckIcon } from "@heroicons/react/24/outline";
import Layout from '../components/Layout';

function MenuItemTile({ item }) {
  return (
    <Link
      href={`/menuitem/${item.id}`}
      className="flex flex-col items-center w-full py-1 border-4 border-[#005E5B]"
    >
      <h3 className="font-semibold text-3xl text-[#F3651E]">{item.title}</h3>
      <p>{item.description}</p>
      <p>{item.price}</p>
      <div className="flex flex-col gap-2 text-[#946E83]">
        <div className="flex gap-2">
          <p>Vegetarian: </p>
          {item.vegetarian ? <CheckIcon className="h-6 w-6" /> : <XMarkIcon className="h-6 w-6" />}
        </div>
        <div className="flex gap-2">
          <p>Vegan: </p>
          {item.vegan ? <CheckIcon className="h-6 w-6" /> : <XMarkIcon className="h-6 w-6" />}
        </div>
        <div className="flex gap-2">
          <p>Glutan Free: </p>
          {item.glutanfree ? <CheckIcon className="h-6 w-6" /> : <XMarkIcon className="h-6 w-6" />}
        </div>
        <div className="flex gap-2">
          <p>Active: </p>
          {item.active ? <CheckIcon className="h-6 w-6" /> : <XMarkIcon className="h-6 w-6" />}
        </div>
      </div>
    </Link>
  )
}

export default function ItemsByCategory({ categoryItems, category }) {
  return (
    <>
      <Head>
        <title>Items by Category</title>
        <meta name="description" content="This is the page to view items by category." />
      </Head>
      <Layout>
        <div className="flex flex-col items-center">
          <h1 className="font-semibold text-6xl text-[#946E83]">{category}</h1>
          <div className="flex flex-col w-11/12 md:w-1/3 items-center mx-auto gap-2">
            {categoryItems.map(item => (
              <MenuItemTile key={item.id} item={item} />
            ))}
          </div>
          <Link href={"/dashboard"} as="button" className="lg-nav-btn">Dashboard</Link>
        </div>
      </Layout>
    </>
  )
}
