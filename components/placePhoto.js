import React from 'react'

export default function PlacePhoto({ photo }) {
  return (
    <div className="bg-white shadow overflow-hidden rounded-md">
      <div
        className="w-full h-48 bg-center bg-cover"
        style={{
          backgroundImage: `url('${photo.thumbnail}')`
        }}
      />
      <div className="p-3">
        <a href={photo.large} className="block text-center px-4 py-2 border border-transparent leading-6 font-medium rounded-lg text-sm text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo" download>
          Download Photo
        </a>

        <div className="attributions text-xs text-gray-600 mt-3">
          <div className="font-bold">Attributions:</div>
          {photo.attributions.map(item => (
            <div dangerouslySetInnerHTML={{ __html: item }}></div>
          ))}
        </div>
      </div>
    </div>
  )
}
