import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import LoginPage from './page/LoginPage.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ListData from './page/ListData.jsx'
import UpadateData from './page/UpadateData.jsx'
import Profil from './page/Profil.jsx'
import AddData from './page/AddData.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "/login",
    element: <LoginPage/>
  },
  {
    path: "/data",
    element: <ListData/>
  },
  {
    path: "/add",
    element: <AddData/>
  },
  {
    path: "/update/:id",
    element: <UpadateData/>
  },
  {
    path: "/profile/edit",
    element: <Profil/>
  },
])

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
