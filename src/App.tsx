import './App.css'
import { Home } from './pages/Home';
import { Preview } from './pages/Preview';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/preview" element={<Preview />} />
      </Routes>
    </div>
  )
}

export default App
