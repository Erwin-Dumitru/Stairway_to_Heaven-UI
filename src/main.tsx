// import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.scss';

const rootElement = document.getElementById('root');
// const basename = '/Users/tristandumitru/Documents/Site/AdminBlocFront_1/bloc-front/src';

if (rootElement) {
  const root = createRoot(rootElement);

  root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  // root.render(
  //   <React.StrictMode>
  //     {/* <BrowserRouter basename={basename}> */}
  //     <BrowserRouter>
  //       <App />
  //     </BrowserRouter>
  //   </React.StrictMode>
  // );
}
