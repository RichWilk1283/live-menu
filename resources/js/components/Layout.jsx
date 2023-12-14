import React from 'react';
import TitleBar from './TitleBar';


export default function Layout({ children, userName }) {
  return (
    <main>
      <header>
        <TitleBar userName={userName} />
      </header>
      <article>
        {children}
      </article>
    </main>
  )
}
