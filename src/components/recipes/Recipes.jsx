import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Recipes = () => {
  const url = import.meta.env.VITE_BASE_URL
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [visibleCount, setVisibleCount] = useState(10)
  const [categories, setCategories] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(null)

  useEffect(() => {
    axios.get(`${url}/recipes/tags`)
      .then(res => setCategories(res.data))
      .catch(err => console.error("Error fetching categories:", err))
  }, [])

  useEffect(() => {
    axios.get(`${url}/recipes`)
      .then(res => setData(res.data))
      .catch(setError)
      .finally(() => setLoading(false))
  }, [])

  
  const filteredRecipes = selectedCategory
    ? data?.recipes?.filter(recipe => recipe.tags.includes(selectedCategory))
    : data?.recipes

  const handleSeeMore = () => {
    setVisibleCount(prev => prev + 10)
  }

  if (error) {
    return <p className="text-center text-red-500 text-xl mt-5">Error</p>
  }

  return (
    <div className="py-10 px-5 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-10">Recipes</h2>

      {loading && <div className="text-center text-2xl text-gray-600">Loading...</div>}

      {/* ✅ Category Filter */}
      <ul className='flex overflow-auto gap-3 mb-5'>
        <li
          onClick={() => setSelectedCategory(null)}
          className={`text-nowrap border border-gray-300 px-3 py-1 rounded-full text-sm cursor-pointer transition ${
            selectedCategory === null
              ? 'bg-yellow-400 text-white border-yellow-500'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          All
        </li>
        {categories?.map(category => (
          <li
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`text-nowrap border border-gray-300 px-3 py-1 rounded-full text-sm cursor-pointer transition ${
              selectedCategory === category
                ? 'bg-yellow-400 text-white border-yellow-500'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {category}
          </li>
        ))}
      </ul>

    
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
        {filteredRecipes?.slice(0, visibleCount).map(recipe => (
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
                <p><strong>Cuisine:</strong> {recipe.cuisine}</p>
                <p><strong>Difficulty:</strong> {recipe.difficulty}</p>
                <p><strong>Prep:</strong> {recipe.prepTimeMinutes} min | Cook: {recipe.cookTimeMinutes} min</p>
                <p><strong>Rating:</strong> {recipe.rating} ({recipe.reviewCount} reviews)</p>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                {recipe.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-yellow-100 text-yellow-800 px-2 py-1 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      
      {filteredRecipes?.length > visibleCount && (
        <div className="text-center mt-10">
          <button
            onClick={handleSeeMore}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-full transition cursor-pointer"
          >
            See More
          </button>
        </div>
      )}
    </div>
  )
}

export default React.memo(Recipes)
