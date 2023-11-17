import './assets/scss/app.scss'
import { useMenuStore, usePopUpStore } from './store/app.store'
import Menu from './components/Menu'
import Inbox from './components/Inbox'
import Today from './components/Today'
import Upcoming from './components/Upcoming'
import LogBook from './components/LogBook'
import ErrorPopUp from './components/ErrorPopUp'
import EditTaskDateModal from './components/EditTaskDateModal'
import { AnimatePresence } from 'framer-motion'
import { useEditTaskDateModalStore } from './store/app.store'

function App() {
  const showErrorPopUp = usePopUpStore((state) => state.showErrorPopUp)
  const showEditTaskDateModal = useEditTaskDateModalStore((state) => state.showEditTaskDateModal)

  const selectedMenuItem = useMenuStore((state) => state.selectedMenuItem)
  return (
    <div className="App">
      <Menu />
      <div className="Content">
        {selectedMenuItem == 'inbox' && <Inbox />}
        {selectedMenuItem == 'today' && <Today />}
        {selectedMenuItem == 'upcoming' && <Upcoming />}
        {selectedMenuItem == 'record' && <LogBook />}
      </div>
      {showErrorPopUp && <ErrorPopUp />}
      <AnimatePresence>{showEditTaskDateModal && <EditTaskDateModal />}</AnimatePresence>
    </div>
  )
}

export default App
