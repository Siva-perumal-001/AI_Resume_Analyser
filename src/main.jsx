import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter , RouterProvider} from 'react-router-dom'
import App from './App.jsx'
import Upload from './Components/Upload'
import Auth from './Components/Auth'
import Resume from './Components/Resume'
import Wipe from './Components/wipe'

const router = new createBrowserRouter([
  {
    path : '/',
    element : <App />,
  },
  {
    path : '/upload',
    element : <Upload />,
  },
  {
    path: '/resume/:id',
    element: <Resume/>
  },
  {
    path:'/auth',
    element: <Auth/>
  },
  {
    path:'/wipe',
    element: <Wipe/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider  router={router}/>
  </StrictMode>,
)
