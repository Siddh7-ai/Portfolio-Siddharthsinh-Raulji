import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Cursor          from './components/Cursor'
import Loader          from './components/Loader'
import HomePage        from './pages/HomePage'
import AllProjectsPage from './pages/AllProjectsPage'
import { LoaderProvider, useLoader } from './context/LoaderContext'

function AppInner() {
  const { visible } = useLoader()

  return (
    <>
      {/* Page content */}
      <div style={{ visibility: visible ? 'hidden' : 'visible' }}>
        <Routes>
          <Route path="/"         element={<HomePage />} />
          <Route path="/projects" element={<AllProjectsPage />} />
        </Routes>
      </div>

      {/* Loader on top */}
      <AnimatePresence>
        {visible && <Loader key="loader" />}
      </AnimatePresence>

      {/* Global Cursor - last for backdrop inversion */}
      <Cursor />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <LoaderProvider>
        <AppInner />
      </LoaderProvider>
    </BrowserRouter>
  )
}