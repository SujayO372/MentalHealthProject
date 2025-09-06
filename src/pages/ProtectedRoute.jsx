import { Navigate } from 'react-router'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children }) {
  const { currentUser } = useAuth()

  if (!currentUser) {
    // if not logged in, send to login page
    return <Navigate to="/login" replace />
  }

  return children
}
