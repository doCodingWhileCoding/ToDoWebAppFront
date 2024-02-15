import PropTypes from 'prop-types'
import { addDays, isAfter, isSameWeek, isToday, isTomorrow, format, startOfToday, isEqual } from 'date-fns'
import { useEditTaskDateModalStore } from '../store/app.store'
import { es } from 'date-fns/locale'
import CalendarIcon from '../assets/icons/CalendarIcon'
const EditTaskDate = (props) => {
  const { date } = props
  const setShowEditTaskDateModal = useEditTaskDateModalStore((state) => state.setShowEditTaskDateModal)
  const today = startOfToday()
  return (
    <div
      className="EditTaskDate w-fit flex flex-row items-center gap-2 cursor-pointer"
      onClick={() => setShowEditTaskDateModal(true)}
    >
      <div className="w-fit h-fit text-gray-400">
        <CalendarIcon />
      </div>

      <div className="text">
        {isToday(date) && <p>{'Hoy'}</p>}
        {isTomorrow(date) && <p>{'Mañana'}</p>}
        {(isEqual(date, addDays(today, 2)) || isAfter(date, addDays(today, 2))) &&
          isSameWeek(date, today, { weekStartsOn: 1 }) && <p>{format(date, 'EEEE', { locale: es })}</p>}
        {!isSameWeek(date, today, { weekStartsOn: 1 }) && <p>{format(date, 'EEE, d MMM', { locale: es })}</p>}
      </div>
    </div>
  )
}
EditTaskDate.propTypes = {
  date: PropTypes.instanceOf(Date),
}
export default EditTaskDate
