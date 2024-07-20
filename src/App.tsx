import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainPage, InscriptionDetailsPage, NotFoundPage } from './pages';
import { CoreServiceProvider } from './contexts/CoreServiceContext';

export function App() {
  return (
    <CoreServiceProvider>
      <Router>
        <Routes>
          <Route index path="/" element={<MainPage />} />
          <Route path="/details/:inscriptionId" element={<InscriptionDetailsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </CoreServiceProvider>
  )
}
