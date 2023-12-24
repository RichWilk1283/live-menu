import { Head, router } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import { XMarkIcon, CheckIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/20/solid";
import Pusher from 'pusher-js';

function MenuItem({ item }) {
  return (
    <div className="flex flex-col w-11/12 items-center border-4 border-[#946E83] last:mb-4 bg-[#F5F6F8]">
      <div className="flex w-full justify-between py-2 px-3">
        <h4 className="font-semibold text-xl text-[#F3651E]">{item.title}</h4>
        <p className="font-semibold">£{item.price}</p>
      </div>
      <p className="w-full px-3">{item.description}</p>
      <div className="flex w-full justify-between text-[#946E83] p-2 md:justify-evenly">
        <div className="flex gap-1">
          <p>Vegetarian: </p>
          {item.vegetarian ? <CheckIcon className="h-6 w-6" /> : <XMarkIcon className="h-6 w-6" />}
        </div>
        <div className="flex gap-1">
          <p>Vegan: </p>
          {item.vegan ? <CheckIcon className="h-6 w-6" /> : <XMarkIcon className="h-6 w-6" />}
        </div>
        <div className="flex gap-1">
          <p>Glutan Free: </p>
          {item.glutanfree ? <CheckIcon className="h-6 w-6" /> : <XMarkIcon className="h-6 w-6" />}
        </div>
      </div>
    </div>
  )
}

function MenuSection({ category, items }) {
  return (
    <div className="flex flex-col w-11/12 items-center gap-1 mb-4 border-4 border-[#005E5B] bg-[url('https://th.bing.com/th/id/OIG.SNQbolJs.pvCwpLrAabs?w=1024&h=1024&rs=1&pid=ImgDetMain')]">
      <div className="flex items-center">
        <StarIcon className="text-[#005E5B] h-6 w-6" />
        <h3 className="text-3xl font-semibold mx-4 md:text-5xl">{category}</h3>
        <StarIcon className="text-[#005E5B] h-6 w-6" />
      </div>
      {items.map((item, index) => (
        <MenuItem key={index} item={item} />
      ))}
    </div>
  )
}

export default function MainMenu({ menuItemsByCategory }) {

  useEffect(() => {
    const pusher = new Pusher(import.meta.env.VITE_PUSHER_APP_KEY, {
      cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER ?? 'mt1'
    });

    const channel = pusher.subscribe('mainmenu');

    channel.bind('MenuItemUpdated', (data) => {
      router.get('/mainmenu');
    });

    channel.bind('MenuItemCreated', (data) => {
      router.get('/mainmenu');
    });

    channel.bind('MenuItemDeleted', (data) => {
      router.get('/mainmenu');
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
      pusher.disconnect();
    };
  }, []);

  return (
    <>
      <Head>
        <title>Restuarant Menu</title>
        <meta name="description" content="This is the restuarant menu page where can view current menu items." />
      </Head>
      <div className="flex flex-col items-center">
        <h1 className="text-5xl md:text-8xl py-3">Restuarant Menu</h1>
        <div className="flex flex-col items-center w-full md:grid md:grid-cols-3 md:justify-items-center">
          {menuItemsByCategory.map((categoryItems, index) => (
            <MenuSection key={index} category={categoryItems.category} items={categoryItems.items} />
          ))}
        </div>
      </div>
    </>
  )
}
