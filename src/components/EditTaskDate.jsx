import '../assets/scss/edittaskdate.scss'
import PropTypes from 'prop-types'
import { addDays, isAfter, isSameWeek, isToday, isTomorrow, format, startOfToday } from 'date-fns'
import { useEditTaskDateModalStore } from '../store/app.store'
import { es } from 'date-fns/locale'
import CalendarIcon from '../assets/icons/CalendarIcon'
const EditTaskDate = (props) => {
  const { date } = props
  console.log(date)
  const setShowEditTaskDateModal = useEditTaskDateModalStore((state) => state.setShowEditTaskDateModal)
  const today = startOfToday()
  return (
    <div className="EditTaskDate" onClick={() => setShowEditTaskDateModal(true)}>
      <CalendarIcon />
      <div className="text">
        {isToday(date) && <p>{'Hoy'}</p>}
        {isTomorrow(date) && <p>{'Mañana'}</p>}
        {isAfter(date, addDays(today, 2)) && isSameWeek(date, today) && <p>{format(date, 'EEEE', { locale: es })}</p>}
        {!isSameWeek(date, today) && <p>{format(date, 'EEE, d MMM', { locale: es })}</p>}
      </div>
    </div>
  )
}
EditTaskDate.propTypes = {
  date: PropTypes.instanceOf(Date),
}
export default EditTaskDate
