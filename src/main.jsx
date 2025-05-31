import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import PalindromeOfAList from './LinkedLists/Alg1.jsx'
import MergeKLinkedList from './LinkedLists/Alg2.jsx'
import LinkedList from './LinkedLists/LinkedList.jsx'
import NotFound from './NotFound.jsx' 
import { BrowserRouter, Routes, Route } from "react-router-dom"

createRoot(document.getElementById('root')).render(
  <BrowserRouter basename={import.meta.env.BASE_URL}>
    <Routes>
      <Route path="" element={<App/>} />
      <Route path="LinkedList" element={<LinkedList />} />
      <Route path="LinkedList/palindromeOfAList" element={<PalindromeOfAList />} />
      <Route path="LinkedList/mergeKLinkedList" element={<MergeKLinkedList />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>  
)
