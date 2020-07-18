import React from 'react'
import Head from 'next/head'

export default function Layout({ children }) {
  return (
    <div>
      <Head>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>
      <main>
        {children}
      </main>
    </div>
  )
}
