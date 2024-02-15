import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import DarkModeIcon from '../assets/icons/DarkModeIcon'
import LightModeIcon from '../assets/icons/LightModeIcon'
const DarkLightMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const switchMode = () => {
    console.log('entra')
    setIsDarkMode(!isDarkMode)
    if (localStorage.theme == 'light') {
      localStorage.theme = 'dark'
      document.documentElement.classList.add('dark')
    } else {
      localStorage.theme = 'light'
      document.documentElement.classList.remove('dark')
    }
  }
  return (
    <motion.div
      layout
      className="DarkLightMode taskClickOutsideException relative flex flex-row items-center w-24 min-w-[96px] h-full py-1 px-2 rounded-full ml-auto cursor-pointer bg-white dark:bg-zinc-800"
      onClick={switchMode}
    >
      {/* <motion.div
        className="circle absolute top-0 left-0 h-full aspect-square rounded-full bg-red-500"
        style={{ x: isDarkMode ? '100%' : 0 }}
      ></motion.div> */}
      <div className="pointer-events-none text-yellow-500">
        <LightModeIcon />
      </div>
      <div className="pointer-events-none ml-auto text-gray-700">
        <DarkModeIcon />
      </div>
      <AnimatePresence>
        {isDarkMode && (
          <motion.div
            layoutId="toggle"
            className="circle pointer-events-none absolute top-0 left-0 h-full aspect-square rounded-full bg-gray-300"
          ></motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {!isDarkMode && (
          <motion.div
            layoutId="toggle"
            className="circle pointer-events-none absolute top-0 right-0 h-full aspect-square rounded-full bg-gray-300"
          ></motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
export default DarkLightMode
