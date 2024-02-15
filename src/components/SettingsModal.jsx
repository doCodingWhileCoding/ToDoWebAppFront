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
    isPending,
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
      className="SettingsModal fixed top-0 left-0 z-30 w-full h-full bg-[#0000004d] backdrop-blur-sm flex justify-center items-center"
      variants={SettingsModalVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div
        className="SettingsModal_Container relative w-1/5 h-2/3 p-5 bg-white text-black dark:bg-black dark:text-white rounded-2xl font-semibold text-center flex flex-col justify-center items-center gap-5"
        ref={ref}
        ariants={SettingsModalContainerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {isPending && <LoadingAnimationDots />}
        {isError && <div className="error">Parece que algo no ha ido cómo debía</div>}
        {isSuccess && (
          <div className="success w-full flex flex-col gap-4">
            <div className="email w-full flex flex-col gap-1">
              <p>Email:</p>
              <p>{userData.email}</p>
            </div>
            <div className="logOut w-full flex justify-center items-center">
              <button
                className="w-1/2 p-2 rounded border-none outline-none font-semibold text-xl bg-gray-300 text-black cursor-pointer flex justify-center items-center"
                onClick={logOut}
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}
export default SettingsModal
