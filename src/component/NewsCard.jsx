
import React, { useState, useEffect } from 'react';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import image from '../assets/news.webp';

const NewsCard = ({ title, description, src, url }) => {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const isFavorite = savedFavorites.some(fav => fav.url === url);
    setLiked(isFavorite);
  }, [url]);

  const handleHeartClick = () => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    console.log("Saved Favorites:", savedFavorites);
    
    if (!liked) {
      const newFavorite = { title, description, src, url };
      const newFavorites = [...savedFavorites, newFavorite];
      console.log("Adding Favorite:", newFavorite);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      toast.dark("Added to favorites");
    } else {
      const newFavorites = savedFavorites.filter(fav => fav.url !== url);
      console.log("Removing Favorite:", url);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      toast.dark("Removed from favorites");
    }
    setLiked(!liked);
  };

  return (
    <div className="border rounded-md p-4 shadow-md">
      <img src={src ? src : image} alt={title} className="w-full h-48 object-cover rounded-md mb-4" />
      <h2 className="font-bold text-lg mb-2">{title ? title.slice(0, 30) : "Title is unavailable"}</h2>
      <p className="text-sm text-gray-600 mb-4">{description ? description.slice(0, 60) : "This news details are currently unavailable. Stay tuned for updates."}</p>
      <div className='flex items-center gap-3'>
        <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline bg-black p-2 rounded-md py-2 text-center">
          Read more
        </a>
        <div onClick={handleHeartClick} className="text-3xl text-red-500 cursor-pointer">
          {liked ? <FaHeart /> : <FaRegHeart />}
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
