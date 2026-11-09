import { Routes, Route, Navigate } from 'react-router'
import AssignmentsPage from './pages/AssignmentsPage'
import AboutPage from './pages/AboutPage'
import AppLayout from './layouts/AppLayout'

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/assignments" element={<AssignmentsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/" element={<Navigate to="/assignments" replace />} />
      </Route>
    </Routes>
  )
}