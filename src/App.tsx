import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainPage, InscriptionDetails } from './pages';

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/details" element={<InscriptionDetails />} />
      </Routes>
    </Router>
  )
}
