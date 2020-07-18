import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function SearchForm({ action }) {
  const router = useRouter();
  const [query, setQuery] = useState('')

  useEffect(() => {
    if ('q' in router.query) {
      setQuery(router.query.q)
    }
  }, [router.query])

  const handleInputChange = (e) => {
    setQuery(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push({
      pathname: action,
      query: {
        q: query,
      }
    })
  }

  return (
    <div className="bg-white shadow p-10 rounded">
      <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 mb-4">Search Place</h1>
      <form className="flex" onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-input block py-3 w-3/4 rounded-l-md rounded-r-none"
          placeholder="Type keywords..."
          value={query}
          onChange={handleInputChange}
        />
        <button type="submit" className="w-1/4 px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-r-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo">
          Search
        </button>
      </form>
    </div>
  )
}
