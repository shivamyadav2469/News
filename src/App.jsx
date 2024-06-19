import React from 'react';
import { Provider } from 'react-redux';
import store from '../src/redux/store';
import NewsApi from './component/NewsApi';
import Navbar from './component/Navbar';
import { ToastContainer } from 'react-toastify';

const App = () => {
  
  
  return (
    <Provider store={store}>
      <Navbar  />
      <NewsApi />
      
      <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      className="toast-container" 
    />
    </Provider>
  );
};

export default App;
