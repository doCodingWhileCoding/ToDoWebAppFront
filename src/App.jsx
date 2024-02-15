import './assets/scss/app.scss'
import { RouterProvider } from 'react-router-dom'
import router from './routes'
import { usePopUpStore } from './store/app.store'
import ErrorPopUp from './components/ErrorPopUp'
import EditTaskDateModal from './components/EditTaskDateModal'
import SettingsModal from './components/SettingsModal'
import { AnimatePresence } from 'framer-motion'
import { useEditTaskDateModalStore } from './store/app.store'
import { useSettingsModalStore } from './store/app.store'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { CustomDragLayer } from './components/CustomDragLayer'
import { useEffect } from 'react'
function App() {
  const showErrorPopUp = usePopUpStore((state) => state.showErrorPopUp)
  const showEditTaskDateModal = useEditTaskDateModalStore((state) => state.showEditTaskDateModal)
  const showSettingsModal = useSettingsModalStore((state) => state.showSettingsModal)

  useEffect(() => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])
  return (
    <div className="App h-full font-sans">
      <DndProvider backend={HTML5Backend}>
        <RouterProvider router={router} />
        {showErrorPopUp && <ErrorPopUp />}
        <AnimatePresence>{showEditTaskDateModal && <EditTaskDateModal />}</AnimatePresence>
        <AnimatePresence>{showSettingsModal && <SettingsModal />}</AnimatePresence>
        <CustomDragLayer />
      </DndProvider>
    </div>
  )
}

export default App
