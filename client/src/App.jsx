 import { BrowserRouter , Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import IssueList from './pages/IssueList'
import PullList from './pages/PullList'
import Repo from './pages/Repo'
import Search from './pages/Search'
import Header from './components/Header'
export default function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/issue" element={<IssueList />} />
        <Route path="/pull" element={<PullList />} />
        <Route path="/repo" element={<Repo />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </BrowserRouter>
  )
}
