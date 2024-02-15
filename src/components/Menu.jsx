import InboxIcon from '../assets/icons/InboxIcon.jsx'
import TodayIcon from '../assets/icons/TodayIcon'
import CalendarIcon from '../assets/icons/CalendarIcon'
import { NavLink, useLocation } from 'react-router-dom'
import SettingsIcon from '../assets/icons/SettingsIcon'
import DarkLightMode from './DarkLightMode.jsx'
import BookIcon from '../assets/icons/BookIcon'
import { useSettingsModalStore } from '../store/app.store'
import classNames from 'classnames'

const Menu = () => {
  const setShowSettingsModal = useSettingsModalStore((state) => state.setShowSettingsModal)
  const location = useLocation()
  console.log(location.pathname)
  return (
    <div className="Menu taskClickOutsideException bg-gray-100 dark:bg-zinc-950 w-full h-full py-20 px-10 flex flex-col border-r-2 border-gray-200 dark:border-zinc-900 text-2xl font-semibold text-black dark:text-white">
      <div className="Menu_Main flex flex-col gap-5">
        <NavLink to="/">
          <div
            className={classNames(
              'flex flex-row items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-gray-300 dark:hover:bg-zinc-800',
              {
                'bg-gray-300 dark:bg-zinc-800': location.pathname === '/',
              }
            )}
          >
            <div className="w-fit h-fit text-blue-500">
              <InboxIcon />
            </div>
            <p>Entrada</p>
          </div>
        </NavLink>
        <NavLink to="/today">
          <div
            className={classNames(
              'flex flex-row items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-gray-300 dark:hover:bg-zinc-800',
              {
                'bg-gray-300 dark:bg-zinc-800': location.pathname === '/today',
              }
            )}
          >
            <div className="w-fit h-fit text-yellow-500">
              <TodayIcon />
            </div>
            <p>Hoy</p>
          </div>
        </NavLink>
        <NavLink to="/upcoming">
          <div
            className={classNames(
              'flex flex-row items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-gray-300 dark:hover:bg-zinc-800',
              {
                'bg-gray-300 dark:bg-zinc-800': location.pathname === '/upcoming',
              }
            )}
          >
            <div className="w-fit h-fit text-red-600">
              <CalendarIcon />
            </div>
            <p>Programadas</p>
          </div>
        </NavLink>
        <NavLink to="/logbook">
          <div
            className={classNames(
              'flex flex-row items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-gray-300 dark:hover:bg-zinc-800',
              {
                'bg-gray-300 dark:bg-zinc-800': location.pathname === '/logbook',
              }
            )}
          >
            <div className="w-fit h-fit text-green-600">
              <BookIcon />
            </div>
            <p>Registro</p>
          </div>
        </NavLink>
      </div>
      <div className="Menu_Proyects"></div>
      <div className="mt-auto w-full flex flex-row gap-4 p-2">
        <div
          className="Menu_Settings flex flex-row items-center gap-2 cursor-pointer w-fit p-1"
          onClick={() => setShowSettingsModal(true)}
        >
          <div className="flex justify-center items-center w-fit h-fit text-gray-500">
            <SettingsIcon />
          </div>
          <p className="text-gray-500">Ajustes</p>
        </div>
        <DarkLightMode />
      </div>
    </div>
  )
}
export default Menu
