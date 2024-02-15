import Menu from '../Menu'
import { Outlet } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useTaskStore } from '../../store/app.store'
const MenuLayout = () => {
  const showOverlay = useTaskStore((state) => state.showOverlay)

  return (
    <div className="MenuLayout w-full h-full flex flex-row">
      <div className="MenuLayout_Menu w-1/5">
        <Menu />
      </div>
      <div className="MenuLayout_Content w-4/5 bg-white dark:bg-zinc-900 relative">
        <Outlet />
        <AnimatePresence>
          {showOverlay && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              exit={{ opacity: 0 }}
              className="absolute top-0 left-0 z-10 w-full h-full bg-white dark:bg-zinc-900 pointer-events-none"
            ></motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
export default MenuLayout
