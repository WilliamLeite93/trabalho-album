import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Capa from './components/Capa.jsx'
import App from './App.jsx'
import Incluir from './Incluir.jsx'
import Pesquisa from './Pesquisa.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css'


const rotas = createBrowserRouter([
  { path: "/", element: <Capa/> },
  { path: "/App" , element: <App /> },
  { path: "incluir", element: <Incluir /> },
  { path: "pesquisa", element: <Pesquisa /> },

])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={rotas} />
  </StrictMode>,
)
