import '../assets/scss/upcomingdate.scss'
import PropTypes from 'prop-types'
import TaskList from './TaskList'
import { format, getDate, isSameDay, isWithinInterval, parseISO } from 'date-fns'
import { es } from 'date-fns/locale'
const UpcomingDate = (props) => {
  const { tasks, startDate, endDate } = props
  const filteredTasks = tasks.filter((task) =>
    isWithinInterval(parseISO(task.date), { start: startDate, end: endDate })
  )
  return (
    <div className="UpcomingDate">
      <div className="UpcomingDate_Title">
        {isSameDay(startDate, endDate) && (
          <div className="UpcomingDate_Title_Day">
            <div className="number">{format(startDate, 'd', { locale: es })}</div>
            <div className="name">
              <div className="stroke"></div>
              <div className="text">{format(startDate, 'EEEE', { locale: es })}</div>
            </div>
          </div>
        )}
        {!isSameDay(startDate, endDate) && getDate(startDate) !== 1 && (
          <div className="UpcomingDate_Title_DayBetween">
            <div className="stroke"></div>
            <div className="date">
              <div className="name">{format(startDate, 'MMMM', { locale: es })}</div>
              <div className="numbers">
                {`${format(startDate, 'd', { locale: es })}-${format(endDate, 'd', { locale: es })}`}
              </div>
            </div>
          </div>
        )}
        {!isSameDay(startDate, endDate) && getDate(startDate) === 1 && (
          <div className="UpcomingDate_Title_Month">
            <div className="stroke"></div>
            <div className="text">{format(startDate, 'MMMM', { locale: es })}</div>
          </div>
        )}
      </div>
      <div className="UpcomingDate_Tasks">
        <TaskList tasks={filteredTasks} />
      </div>
    </div>
  )
}
UpcomingDate.propTypes = {
  tasks: PropTypes.array,
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
}
export default UpcomingDate
