import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { lazy, Suspense } from 'react'

// Lazy load components
const PalindromeOfAList = lazy(() => import('./LinkedLists/Alg1.jsx'))
const MergeKLinkedList = lazy(() => import('./LinkedLists/Alg2.jsx'))
const LinkedList = lazy(() => import('./LinkedLists/LinkedList.jsx'))
const NotFound = lazy(() => import('./NotFound.jsx'))

// Loading component
const Loading = () => <div>Loading...</div>

createRoot(document.getElementById('root')).render(
  <BrowserRouter basename={import.meta.env.BASE_URL}>
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="" element={<App/>} />
        <Route path="LinkedList" element={<LinkedList />} />
        <Route path="LinkedList/palindromeOfAList" element={<PalindromeOfAList />} />
        <Route path="LinkedList/mergeKLinkedList" element={<MergeKLinkedList />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  </BrowserRouter>  
)
