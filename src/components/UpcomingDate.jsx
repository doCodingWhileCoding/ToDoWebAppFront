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
    <div className="UpcomingDate h-fit py-0 px-5 text-black dark:text-white mb-7">
      <div className="UpcomingDate_Title">
        {isSameDay(startDate, endDate) && (
          <div className="UpcomingDate_Title_Day flex flex-row gap-1">
            <div className="number font-semibold text-5xl">{format(startDate, 'd', { locale: es })}</div>
            <div className="name w-full flex flex-col justify-center text-2xl font-semibold text-gray-500">
              <div className="stroke w-full h-1 bg-gray-100"></div>
              <div className="text">{format(startDate, 'EEEE', { locale: es })}</div>
            </div>
          </div>
        )}
        {!isSameDay(startDate, endDate) && getDate(startDate) !== 1 && (
          <div className="UpcomingDate_Title_DayBetween flex flex-col">
            <div className="stroke w-full h-1 bg-gray-100"></div>
            <div className="date flex flex-row items-center gap-1 text-3xl">
              <div className="name font-semibold text-4xl">{format(startDate, 'MMMM', { locale: es })}</div>
              <div className="numbers text-gray-500">
                {`${format(startDate, 'd', { locale: es })}-${format(endDate, 'd', { locale: es })}`}
              </div>
            </div>
          </div>
        )}
        {!isSameDay(startDate, endDate) && getDate(startDate) === 1 && (
          <div className="UpcomingDate_Title_Month flex flex-col text-3xl">
            <div className="stroke w-full h-1 bg-gray-100"></div>
            <div className="text font-semibold text-4xl">{format(startDate, 'MMMM', { locale: es })}</div>
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
