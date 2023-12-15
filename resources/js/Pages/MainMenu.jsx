import Echo from 'laravel-echo';
import { Head } from '@inertiajs/react';
import React from 'react';
import { XMarkIcon, CheckIcon } from "@heroicons/react/24/outline";

function MenuItem({ item }) {
  return (
    <div className="flex flex-col w-11/12 items-center border-4 border-[#946E83] last:mb-4">
      <div className="flex w-full justify-between py-2 px-3">
        <h4 className="font-semibold text-xl text-[#F3651E]">{item.title}</h4>
        <p className="font-semibold">£{item.price}</p>
      </div>
      <p className="w-full px-3">{item.description}</p>
      <div className="grid grid-cols-2 gap-2 text-[#946E83] p-3">
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
    </div>
  )
}

function MenuSection({ category, items }) {
  return (
    <div className="flex flex-col w-11/12 items-center gap-1 mb-4 border-4 border-[#005E5B]">
      <h3 className="text-3xl">{category}</h3>
      {items.map((item, index) => (
        <MenuItem key={index} item={item} />
      ))}
    </div>
  )
}

export default function MainMenu({ menuItemsByCategory }) {

  // Echo.private('App.Models.MenuItem.7').listen('.MenuItemUpdated', (e) => {
  //   console.log("TEST", e);
  // });

  return (
    <>
      <Head>
        <title>Restuarant Menu</title>
        <meta name="description" content="This is the restuarant menu page where can view current menu items." />
      </Head>
      <div className="flex flex-col items-center">
        <h1 className="text-5xl py-3">Restuarant Menu</h1>
        {menuItemsByCategory.map((categoryItems, index) => (
          <MenuSection key={index} category={categoryItems.category} items={categoryItems.items} />
        ))}
      </div>
    </>
  )
}
