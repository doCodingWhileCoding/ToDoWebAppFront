import './assets/scss/app.scss'
import { useMenuStore, usePopUpStore } from './store/app.store'
import Menu from './components/Menu'
import Inbox from './components/Inbox'
import LogBook from './components/LogBook'
import ErrorPopUp from './components/ErrorPopUp'

function App() {
  const showErrorPopUp = usePopUpStore((state) => state.showErrorPopUp)

  const selectedMenuItem = useMenuStore((state) => state.selectedMenuItem)
  return (
    <div className="App">
      <Menu />
      <div className="Content">
        {selectedMenuItem == 'inbox' && <Inbox />}
        {selectedMenuItem == 'record' && <LogBook />}
      </div>
      {showErrorPopUp && <ErrorPopUp />}
    </div>
  )
}

export default App
