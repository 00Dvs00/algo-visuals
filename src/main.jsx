import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import PalindromeOfAList from './LinkedLists/Alg1.jsx'
import MergeKLinkedList from './LinkedLists/Alg2.jsx'
import LinkedList from './LinkedLists/LinkedList.jsx'
import { createHashRouter, RouterProvider } from "react-router-dom"

// Use createHashRouter instead of createBrowserRouter
const router = createHashRouter([
  { path: "/", element: <App /> },
  { path: "/LinkedList", element: <LinkedList /> },
  { path: "/LinkedList/palindromeOfAList", element: <PalindromeOfAList /> },
  { path: "/LinkedList/mergeKLinkedList", element: <MergeKLinkedList /> }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
