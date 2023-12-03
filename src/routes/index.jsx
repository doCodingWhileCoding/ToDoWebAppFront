import { createBrowserRouter } from 'react-router-dom'
import ProtectedRoute from '../components/Auth/ProtectedRoute'
import MenuLayout from '../components/Layouts/MenuLayout'
import Inbox from '../views/Inbox'
import Today from '../views/Today'
import Upcoming from '../views/Upcoming'
import LogBook from '../views/LogBook'
import Login from '../views/Auth/Login'
import SignUp from '../views/Auth/SignUp'
import EmailVerificator from '../views/Auth/EmailVerificator'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <MenuLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: '/', element: <Inbox /> },
      { path: 'today', element: <Today /> },
      { path: 'upcoming', element: <Upcoming /> },
      { path: 'LogBook', element: <LogBook /> },
    ],
  },
  {
    path: '/auth',
    children: [
      { path: 'login', element: <Login /> },
      { path: 'signup', element: <SignUp /> },
      { path: 'emailVerification/:userId/:uuid', element: <EmailVerificator /> },
    ],
  },
])
export default router
