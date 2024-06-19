
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNews, setPage } from '../redux/newsSlice';
import NewsCard from './NewsCard';

const NewsApi = () => {
  const dispatch = useDispatch();
  const { articles, loading, error, totalResults, page, category, searchKeyword } = useSelector(
    state => state.news
  );

  useEffect(() => {
    if (searchKeyword) {
      dispatch(fetchNews({ q: searchKeyword, page }));
    } else {
      dispatch(fetchNews({ category, page }));
    }
  }, [category, page, dispatch, searchKeyword]);

  const handlePageChange = newPage => {
    dispatch(setPage(newPage));
  };

  const totalPages = Math.ceil(totalResults / 20);

  const getPageNumbers = () => {
    const pagesToShow = 5;
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers.slice(Math.max(0, page - 3), Math.min(totalPages, page + 2));
  };


  
  if (loading) {
    return (
      <div role="status" className='flex justify-center items-center h-screen'>
        <svg aria-hidden="true" className="w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  if (error) {
    return <div className='flex justify-center items-center h-screen'>Error: {error.message}</div>;
  }

  if (articles.length === 0) {
    return <div className='flex justify-center items-center h-screen'>No News found.</div>;
  }

  return (
    <div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-2">
        {articles.map((news, index) => (
          <NewsCard
            key={index}
            title={news.title}
            description={news.description}
            src={news.urlToImage}
            url={news.url}
          />
        ))}
      </div>
      

      {totalResults > 20 && (
        <div className="flex items-center justify-center mt-4 mb-3">
          <a
            href="#"
            onClick={e => {
              e.preventDefault();
              if (page > 1) handlePageChange(page - 1);
            }}
            className={`mx-1 text-sm font-semibold ${
              page === 1 ? 'cursor-not-allowed text-gray-500' : 'text-gray-900'
            }`}
          >
            ← Previous
          </a>
          {getPageNumbers().map(pageNumber => (
            <a
              key={pageNumber}
              href="#"
              onClick={e => {
                e.preventDefault();
                handlePageChange(pageNumber);
              }}
              className={`mx-1 flex items-center rounded-md border px-3 py-1 ${
                page === pageNumber ? 'bg-gray-300' : 'border-gray-400 text-gray-900 hover:scale-105'
              }`}
            >
              {pageNumber}
            </a>
          ))}
          <a
            href="#"
            onClick={e => {
              e.preventDefault();
              if (page < totalPages) handlePageChange(page + 1);
            }}
            className={`mx-1 text-sm font-semibold ${
              page === totalPages ? 'cursor-not-allowed text-gray-500' : 'text-gray-900'
            }`}
          >
            Next →
          </a>
        </div>
      )}
    </div>
  );
};


export default NewsApi;
