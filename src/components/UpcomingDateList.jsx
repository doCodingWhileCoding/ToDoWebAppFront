import PropTypes from 'prop-types'
import { useState } from 'react'
import { eachDayOfInterval, endOfMonth, addMonths, addDays, startOfTomorrow, eachMonthOfInterval } from 'date-fns'
import UpcomingDate from './UpcomingDate'
const UpcomingDateList = (props) => {
  const { tasks } = props
  const tomorrow = startOfTomorrow()
  const [days, setDays] = useState(
    eachDayOfInterval({
      start: tomorrow,
      end: addDays(tomorrow, 6),
    })
  )
  const [dayBetween, setDayBetween] = useState(addDays(tomorrow, 7))
  const [months, setMonths] = useState(
    eachMonthOfInterval({
      start: addMonths(dayBetween, 1),
      end: addMonths(dayBetween, 4),
    })
  )

  return (
    <div className="UpcomingDateList w-full h-full flex flex-col overflow-y-scroll">
      {days.map((day, i) => (
        <UpcomingDate key={day} tasks={tasks} startDate={day} endDate={day} />
      ))}
      <UpcomingDate key={dayBetween} tasks={tasks} startDate={dayBetween} endDate={endOfMonth(dayBetween)} />

      {months.map((month, i) => (
        <UpcomingDate key={month} tasks={tasks} startDate={month} endDate={endOfMonth(month)} />
      ))}
    </div>
  )
}
UpcomingDateList.propTypes = {
  tasks: PropTypes.array,
}
export default UpcomingDateList
