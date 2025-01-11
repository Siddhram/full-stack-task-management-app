import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'
import SignupForm from './components/SignupForm.jsx'
import SignInForm from './components/SignInForm.jsx'
import Gridview from './components/Gridview.jsx'
import Addmenue from './components/Addmenue.jsx'
import Updatemenue from './components/Updatemenue.jsx'
import Cartpage from './components/Cartpage.jsx'
import OrderPage from './components/OrderPage.jsx'

const PageNotFound = () => (
  <div className="flex items-center justify-center h-screen">
    <h1 className="text-4xl font-bold text-red-600">Page Not Found</h1>
  </div>
);
createRoot(document.getElementById('root')).render(
    <Provider store={store}>
    <BrowserRouter>
    <Routes>
      <Route path='/sign-in' element={<SignInForm />} ></Route>
      <Route path='/sign-up' element={<SignupForm />} ></Route>
      <Route path='/' element={<Gridview />} ></Route>
      <Route path='/add' element={<Addmenue />} ></Route>
            <Route path='/cart' element={<Cartpage />} ></Route>
      <Route path='/order' element={<OrderPage />} ></Route>
              <Route path='*' element={<PageNotFound />} />

      <Route path='/:id' element={<Updatemenue />} ></Route>

    </Routes>
    </BrowserRouter>
    </Provider>
)
