import React from 'react'
import Link from 'next/link'

export default function PlaceItem({ place }) {
  return (
    <div className="placeItem w-full flex shadow bg-gray-100">
      <div
        className="image h-auto w-56 bg-center bg-cover rounded-l-md overflow-hidden"
        style={{
          backgroundImage: `url('${place.image}')`
        }}
      />

      <div className="bg-white w-full rounded-r-md p-4 flex flex-col justify-between leading-normal">
        <h3 className="font-bold text-large text-gray-900 mb-4">{ place.name }</h3>

        <div className="text-gray-900 text-sm mb-4">
          {place.address}
        </div>

        <div className="mb-4">
          { place.types.map((type, i) => (
            <div className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2" key={i}>
              {type}
            </div>
          )) }
        </div>

        <div>
          <Link href={`/place/${place.id}`}>
            <a className="px-4 py-2 border border-transparent leading-6 font-medium rounded-lg text-sm text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo">
              View Photos
            </a>
          </Link>
        </div>
      </div>
    </div>
  )
}
