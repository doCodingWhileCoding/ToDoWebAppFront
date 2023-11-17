import '../assets/scss/menu.scss'
import { useMenuStore } from '../store/app.store'
import classNames from 'classnames'
import InboxIcon from '../assets/icons/InboxIcon.jsx'
import TodayIcon from '../assets/icons/TodayIcon'
import CalendarIcon from '../assets/icons/CalendarIcon'

const Menu = () => {
  const selectedMenuItem = useMenuStore((state) => state.selectedMenuItem)
  const updateSelectedMenuItem = useMenuStore((state) => state.updateSelectedMenuItem)
  return (
    <div className="Menu">
      <div className="Menu_Main">
        <div
          className={classNames({ Menu_Main_Inbox: true, selected: selectedMenuItem == 'inbox' })}
          onClick={() => updateSelectedMenuItem('inbox')}
        >
          <InboxIcon />
          <p>Entrada</p>
        </div>
        <div
          className={classNames({ Menu_Main_ToDay: true, selected: selectedMenuItem == 'today' })}
          onClick={() => updateSelectedMenuItem('today')}
        >
          <TodayIcon />
          <p>Hoy</p>
        </div>
        <div
          className={classNames({ Menu_Main_Next: true, selected: selectedMenuItem == 'upcoming' })}
          onClick={() => updateSelectedMenuItem('upcoming')}
        >
          <CalendarIcon />
          <p>Programadas</p>
        </div>
        <div
          className={classNames({ Menu_Main_Record: true, selected: selectedMenuItem == 'record' })}
          onClick={() => updateSelectedMenuItem('record')}
        >
          <CalendarIcon />
          <p>Registro</p>
        </div>
      </div>
      <div className="Menu_Proyects"></div>
    </div>
  )
}
export default Menu
