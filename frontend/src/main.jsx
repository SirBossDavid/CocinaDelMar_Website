import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'

import Header from './components/Header.jsx'

import Home from './pages/Home.jsx'
import Menu from './pages/Menu.jsx'
import Gallery from './pages/Gallery.jsx'


import { CartProvider } from './context/CartContext.jsx'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
const router = createBrowserRouter([
  {path:"/", element:<Header/>, 
    children:[
      {
        path: '/',
        element: <Home/>
      },
      {
        path:'/menu',
        element: <Menu/>
      },
      {
        path:'/gallery',
        element: <Gallery/>
      }
    ],
    errorElement: <div>404 Not Found</div>}
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
      <RouterProvider router =  {router}/>
    </CartProvider>
  </StrictMode>,
)
