import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainPage, InscriptionDetailsPage, NotFoundPage } from './pages';

export function App() {
  return (
    <Router>
      <Routes>
        <Route index path="/" element={<MainPage />} />
        <Route path="/details" element={<InscriptionDetailsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  )
}
