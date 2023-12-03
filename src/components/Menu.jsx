import '../assets/scss/menu.scss'
import InboxIcon from '../assets/icons/InboxIcon.jsx'
import TodayIcon from '../assets/icons/TodayIcon'
import CalendarIcon from '../assets/icons/CalendarIcon'
import { NavLink } from 'react-router-dom'
import SettingsIcon from '../assets/icons/SettingsIcon'
import { useSettingsModalStore } from '../store/app.store'

const Menu = () => {
  const setShowSettingsModal = useSettingsModalStore((state) => state.setShowSettingsModal)
  return (
    <div className="Menu">
      <div className="Menu_Main">
        <NavLink to="/">
          <InboxIcon />
          <p>Entrada</p>
        </NavLink>
        <NavLink to="/today">
          <TodayIcon />
          <p>Hoy</p>
        </NavLink>
        <NavLink to="/upcoming">
          <CalendarIcon />
          <p>Programadas</p>
        </NavLink>
        <NavLink to="/logbook">
          <CalendarIcon />
          <p>Registro</p>
        </NavLink>
      </div>
      <div className="Menu_Proyects"></div>
      <div className="Menu_Settings" onClick={() => setShowSettingsModal(true)}>
        <SettingsIcon />
        <p>Ajustes</p>
      </div>
    </div>
  )
}
export default Menu
