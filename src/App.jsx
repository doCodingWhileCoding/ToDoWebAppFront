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

function App() {
  const showErrorPopUp = usePopUpStore((state) => state.showErrorPopUp)
  const showEditTaskDateModal = useEditTaskDateModalStore((state) => state.showEditTaskDateModal)
  const showSettingsModal = useSettingsModalStore((state) => state.showSettingsModal)

  return (
    <div className="App">
      <RouterProvider router={router} />
      {showErrorPopUp && <ErrorPopUp />}
      <AnimatePresence>{showEditTaskDateModal && <EditTaskDateModal />}</AnimatePresence>
      <AnimatePresence>{showSettingsModal && <SettingsModal />}</AnimatePresence>
    </div>
  )
}

export default App
