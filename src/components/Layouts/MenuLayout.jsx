import '../../assets/scss/menulayout.scss'
import Menu from '../Menu'
import { Outlet } from 'react-router-dom'
const MenuLayout = () => {
  return (
    <div className="MenuLayout">
      <div className="MenuLayout_Menu">
        <Menu />
      </div>
      <div className="MenuLayout_Content">
        <Outlet />
      </div>
    </div>
  )
}
export default MenuLayout
