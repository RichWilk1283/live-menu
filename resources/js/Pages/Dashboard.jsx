import React from 'react';
import CategoriesBoard from '../components/CategoriesBoard';
import { Link, Head } from '@inertiajs/react';
import Layout from '../components/Layout';

export default function Dashboard({ userName, categoriesSummary }) {

  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="This is the dashboard page." />
      </Head>
      <Layout userName={userName}>
        <div className="bg-[#F5F6F8]">
          <div className="flex flex-col items-center">
            <Link
              href={"/createmenuitem"}
              as="button"
              className="w-10/12 bg-[#946E83] text-white p-3 m-3 text-xl font-semibold">
              Create Menu Item
            </Link>
            <CategoriesBoard categoriesSummary={categoriesSummary} />
            <Link href={"/mainmenu"} as="button" className="lg-nav-btn">View Menu</Link>
          </div>
        </div>
      </Layout>
    </>
  )
}
