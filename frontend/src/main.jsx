import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import App from './App.jsx'
import Header from './components/Header.jsx'

import Home from './pages/Home.jsx'
import Menu from './pages/Menu.jsx'

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
      }
    ],
    errorElement: <div>404 Not Found</div>}
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router =  {router}/>
  </StrictMode>,
)
