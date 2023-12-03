import '../assets/scss/settingsmodal.scss'
import { motion } from 'framer-motion'
import { useSettingsModalStore } from '../store/app.store'
import { useEffect, useRef } from 'react'
import { getUser } from '../api/userAPI'
import { useQuery } from '@tanstack/react-query'
import LoadingAnimationDots from './LoadingAnimationDots'
import { useAuthStore } from '../store/auth.store'
const SettingsModal = () => {
  const setToken = useAuthStore((state) => state.setToken)
  const queryKey = ['user']
  const setShowSettingsModal = useSettingsModalStore((state) => state.setShowSettingsModal)
  const ref = useRef(null)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowSettingsModal(false)
      }
    }
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [setShowSettingsModal])
  const {
    isLoading,
    data: userData,
    isError,
    error,
    isSuccess,
  } = useQuery({
    queryKey: queryKey,
    queryFn: getUser,
  })
  const logOut = () => {
    setShowSettingsModal(false)
    setToken(null)
  }
  const SettingsModalVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.1,
      },
    },
  }
  const SettingsModalContainerVariants = {
    hidden: {
      scale: 0.5,
      opacity: 0,
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        scale: { duration: 0.1 },
        opacity: { duration: 0.1 },
      },
    },
    exit: {
      scale: 0.5,
      opacity: 0,
      transition: {
        scale: { duration: 0.1 },
        opacity: { duration: 0.1 },
      },
    },
  }
  return (
    <motion.div
      className="SettingsModal"
      variants={SettingsModalVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div
        className="SettingsModal_Container"
        ref={ref}
        ariants={SettingsModalContainerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {isLoading && <LoadingAnimationDots />}
        {isSuccess && (
          <div className="success">
            <div className="email">
              <p>Email:</p>
              <p>{userData.email}</p>
            </div>
            <div className="logOut">
              <button onClick={logOut}>Cerrar sesión</button>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}
export default SettingsModal
