import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Recipes = () => {
  const url = import.meta.env.VITE_BASE_URL
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    axios
      .get(`${url}/recipes`)
      .then(res => {
        setData(res.data)
      })
      .catch(err => {
        setError(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  if (error) {
    return <p className="text-center text-red-500 text-xl mt-5">Error </p>
  }

  return (
    <div className="py-10 px-5 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-10">
      </h2>

      {loading && (
        <div className="text-center text-2xl text-gray-600">Loading...</div>
      )}

      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
        {data?.recipes?.map(recipe => (
          <div
            key={recipe.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={recipe.image}
              alt={recipe.name}
              className="w-full h-64 object-cover"
              loading="lazy"
            />
            <div className="p-5 space-y-3">
              <h3 className="text-xl font-semibold text-gray-800 line-clamp-1">
                {recipe.name}
              </h3>
              <div className="text-sm text-gray-600">
                <p><strong> Cuisine:</strong> {recipe.cuisine}</p>
                <p><strong> Difficulty:</strong> {recipe.difficulty}</p>
                <p><strong> Prep:</strong> {recipe.prepTimeMinutes} min | Cook: {recipe.cookTimeMinutes} min</p>
                <p><strong> Rating:</strong> {recipe.rating} ({recipe.reviewCount} reviews)</p>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                {recipe.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-yellow-100 text-yellow-800 px-2 py-1 text-xs rounded-full"
                  >
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default React.memo(Recipes)
