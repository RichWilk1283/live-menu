import React from 'react';
import CreateMenuItemForm from '../components/CreateMenuItemForm';
import { Link, Head } from '@inertiajs/react';
import Layout from '../components/Layout';

export default function Create({ categories }) {
  return (
    <>
      <Head>
        <title>Create item</title>
        <meta name="description" content="This is the page where you create menu items." />
      </Head>
      <Layout>
        <div>
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
