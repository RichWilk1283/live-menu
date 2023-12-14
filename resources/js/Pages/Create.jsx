import React from 'react';
import CreateMenuItemForm from '../components/CreateMenuItemForm';
import { Link, Head } from '@inertiajs/react';
import TitleBar from '../components/TitleBar';
import Layout from '../components/Layout';

export default function Create({ categories }) {

  const userName = "TEST";
  return (
    <>
      <Head>
        <title>Create item</title>
        <meta name="description" content="This is the page where you create menu items." />
      </Head>
      <Layout userName={userName}>
        <div className="bg-[#F5F6F8]">
          <div className="flex flex-col items-center">
            <CreateMenuItemForm categories={categories} />
            <Link
              href={"/dashboard"}
              as="button"
              className="lg-nav-btn">
              Dashboard
            </Link>
          </div>
        </div>
      </Layout>
    </>
  )
}
