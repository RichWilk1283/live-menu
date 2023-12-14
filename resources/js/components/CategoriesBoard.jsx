import { Link } from '@inertiajs/react';
import React from 'react';

function CategoryTile({ summary }) {
  return (
    <Link
      href={`/categoryitems/${summary.category}`}
      className="flex flex-col items-center w-full py-1 border-4 border-[#005E5B]"
    >
      <h3 className="font-semibold text-3xl text-[#F3651E]">{summary.category}</h3>
      <p>TOTAL / {summary.info.totalItems}</p>
      <p>Active / {summary.info.totalActive}</p>
      <p>In-active / {summary.info.totalInactive}</p>
      <p>Average Price / £{summary.info.averagePrice}</p>
    </Link>
  )
}

export default function CategoriesBoard({ categoriesSummary }) {
  return (
    <div className="flex flex-col w-11/12 items-center mx-auto gap-2">
      {categoriesSummary.map((summary, index) => (
        <CategoryTile key={index} summary={summary} />
      ))}
    </div>
  )
}
