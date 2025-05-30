import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import PalindromeOfAList from './LinkedLists/Alg1.jsx'
import MergeKLinkedList from './LinkedLists/Alg2.jsx'
import LinkedList from './LinkedLists/LinkedList.jsx'
import {createBrowserRouter,RouterProvider} from "react-router-dom"

const router = createBrowserRouter([
  {path:"/algo-visuals/", element: <App/>},
  {path:"/LinkedList", element: <LinkedList />},
  {path:"/LinkedList/palindromeOfAList", element: <PalindromeOfAList />},
  {path:"/LinkedList/mergeKLinkedList", element: <MergeKLinkedList />}
]);
createRoot(document.getElementById('root')).render(
    <RouterProvider router = {router}/>
)
