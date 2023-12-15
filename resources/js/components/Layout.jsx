import React from 'react';
import TitleBar from './TitleBar';


export default function Layout({ children, userName }) {
  return (
    <main>
      <header>
        <TitleBar />
      </header>
      <article>
        {children}
      </article>
    </main>
  )
}
