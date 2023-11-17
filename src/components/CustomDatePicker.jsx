import '../assets/scss/customdatepicker.scss'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import classNames from 'classnames'
import {
  eachDayOfInterval,
  format,
  startOfToday,
  startOfMonth,
  endOfMonth,
  endOfWeek,
  startOfWeek,
  addMonths,
  isSameMonth,
  isToday,
  subMonths,
  isEqual,
  isBefore,
  isSameDay,
} from 'date-fns'
import { es } from 'date-fns/locale'
import ChevronLeftIcon from '../assets/icons/ChevronLeftIcon'
import ChevronRightIcon from '../assets/icons/ChevronRightIcon'
const CustomDatePicker = (props) => {
  const { showDaysBeforeToday, selectedDay, setSelectedDay } = props
  const today = startOfToday()
  const [startOfMonthDate, setStartOfMonthDate] = useState(startOfMonth(today))
  const [endOfMonthDate, setEndOfMonthDate] = useState(endOfMonth(today))

  const [days, setDays] = useState([])
  useEffect(() => {
    setDays(
      eachDayOfInterval({
        start: startOfWeek(startOfMonthDate, { weekStartsOn: 1 }),
        end: endOfWeek(endOfMonthDate, { weekStartsOn: 1 }),
      })
    )
  }, [startOfMonthDate, endOfMonthDate])
  const handleNextMonth = () => {
    console.log('entra')
    setStartOfMonthDate(addMonths(startOfMonthDate, 1))
    setEndOfMonthDate(addMonths(endOfMonthDate, 1))
  }
  const handlePrevMonth = () => {
    if (isSameDay(startOfMonthDate, startOfMonth(today)) && !showDaysBeforeToday) {
      return
    }
    setStartOfMonthDate(subMonths(startOfMonthDate, 1))
    setEndOfMonthDate(subMonths(endOfMonthDate, 1))
  }
  const handleSelectDay = (day) => {
    if (isBefore(day, today)) return
    setSelectedDay(day)
  }

  return (
    <div className="CustomDatePicker">
      <div className="CustomDatePicker_Header">
        <div className="CustomDatePicker_Header_Month">
          <h2>{format(startOfMonthDate, 'MMM yyyy', { locale: es })}</h2>
          <div className="CustomDatePicker_Header_Month_Change">
            <div
              onClick={handlePrevMonth}
              className={classNames({
                CustomDatePicker_Header_Month_Change_Prev: true,
                disabled: isSameDay(startOfMonthDate, startOfMonth(today)) && !showDaysBeforeToday,
              })}
            >
              <ChevronLeftIcon />
            </div>
            <div className="CustomDatePicker_Header_Month_Change_Next" onClick={handleNextMonth}>
              <ChevronRightIcon />
            </div>
          </div>
        </div>
        <div className="CustomDatePicker_Header_Week">
          <div>lun</div>
          <div>man</div>
          <div>mié</div>
          <div>jue</div>
          <div>vie</div>
          <div>sáb</div>
          <div>dom</div>
        </div>
      </div>
      <div className="CustomDatePicker_Content">
        {days.map((day, dayIndex) => (
          <div key={day.toString()} className="CustomDatePicker_Content_Day">
            <time
              dateTime={format(day, 'yyyy-MM-dd')}
              onClick={() => handleSelectDay(day)}
              className={classNames({
                isNotCurrentMont: !isSameMonth(day, startOfMonthDate),
                isBeforeToday: isBefore(day, today),
                isToday: isToday(day),
                isSelectedDay: isEqual(day, selectedDay),
              })}
            >
              {format(day, 'd')}
            </time>
          </div>
        ))}
      </div>
    </div>
  )
}
CustomDatePicker.propTypes = {
  showDaysBeforeToday: PropTypes.bool,
  selectedDay: PropTypes.instanceOf(Date),
  setSelectedDay: PropTypes.func,
}
export default CustomDatePicker
