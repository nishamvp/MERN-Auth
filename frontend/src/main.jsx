import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom'
import  store  from './store.js'
import { Provider } from 'react-redux'


import Home from './screens/Home.jsx'
import { Login } from './screens/Login.jsx'
import { Register } from './screens/Register.jsx'
import {Profile} from './screens/Profile.jsx'
import PrivateRoutes from './components/PrivateRoutes.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* Private Routes */}
      <Route path='' element ={<PrivateRoutes/>}  >
      <Route path="/profile" element={<Profile />} />
      </Route>
    </Route>,
  ),
)
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>,
)
