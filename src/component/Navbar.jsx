import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchKeyword, setCategory } from '../redux/newsSlice';
import { CiSearch } from 'react-icons/ci';
import { FaHeart } from 'react-icons/fa';
import NewsCard from './NewsCard';
import { AiOutlineClose } from 'react-icons/ai';
import logo from '../assets/newslogo.png'

const Navbar = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  const handleSearchChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    dispatch(setSearchKeyword(newSearchTerm.trim()));
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    dispatch(setSearchKeyword(searchTerm.trim()));
  };

  const handleSearchIconClick = () => {
    dispatch(setSearchKeyword(searchTerm.trim()));
  };

  const handleCategoryChange = (category) => {
    dispatch(setCategory(category));
  };

  const removeFavorite = (url) => {
    const newFavorites = favorites.filter((fav) => fav.url !== url);
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const toggleFavorites = () => {
    setShowFavorites(!showFavorites);
  };

  const handleResetSearch = () => {
    setSearchTerm('');
    dispatch(setSearchKeyword(''));
  };

  return (
    <div>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={logo} className="h-8 bg-white" alt="News Logo"  />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-red-500">News!</span>
          </a>
          <button
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Open main menu"
          >
            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
          <div className={`w-full md:block md:w-auto ${isOpen ? 'block' : 'hidden'}`} id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 justify-center md:items-center">
              <li
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                <div onClick={() => handleCategoryChange('technology')}>Technology</div>
              </li>
              <li
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                <div onClick={() => handleCategoryChange('business')}>Business</div>
              </li>
              <li
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                <div onClick={() => handleCategoryChange('health')}>Health</div>
              </li>
              <li
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                <div onClick={() => handleCategoryChange('sports')}>Sports</div>
              </li>
              <li
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                <div onClick={() => handleCategoryChange('entertainment')}>Entertainment</div>
              </li>
              <div className="flex justify-center items-center p-4 md:p-0 gap-2">
                <form onSubmit={handleSearchSubmit} className="flex justify-center items-center gap-2">
                  <input
                    type="search"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Search"
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-900 dark:text-white"
                  />
                  {/* {searchTerm && (
                    <AiOutlineClose
                      className="text-gray-500 text-2xl cursor-pointer"
                      onClick={handleResetSearch}
                    />
                  )} */}
                  <CiSearch
                    className="text-white text-3xl cursor-pointer"
                    onClick={handleSearchIconClick}
                  />
                  <FaHeart className='text-red-500 text-3xl cursor-pointer' onClick={toggleFavorites} />
                </form>
              </div>
            </ul>
          </div>
        </div>
      </nav>

      {showFavorites && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg h-[600px] w-[1200px] overflow-y-auto">
            <div className="flex justify-end mb-4">
              <button className="text-blue-500 hover:text-blue-900 bg-black p-2 rounded-md py-2 text-center" onClick={() => setShowFavorites(false)}>
                Close
              </button>
            </div>
            <h2 className="text-xl font-semibold mb-2">Favorites</h2>
            {favorites.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500 text-2xl font-semibold">No Favorite News.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 overflow-y-auto">
                {favorites.map((favorite, index) => (
                  <div key={index} className="items-center mb-4">
                    <NewsCard {...favorite} />
                    <button className="text-red-500 hover:text-red-700 cursor-pointer ml-2" onClick={() => removeFavorite(favorite.url)}>
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
