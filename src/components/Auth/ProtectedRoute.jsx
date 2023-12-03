import PropTypes from 'prop-types'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../../store/auth.store'

const ProtectedRoute = ({ redirectTo = 'auth/login', children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const token = useAuthStore((state) => state.token)
  console.log(token)
  if (!isAuthenticated) return <Navigate to={redirectTo} />
  return children ? children : <Outlet />
}
ProtectedRoute.propTypes = {
  redirectTo: PropTypes.string,
  children: PropTypes.object,
}
export default ProtectedRoute
