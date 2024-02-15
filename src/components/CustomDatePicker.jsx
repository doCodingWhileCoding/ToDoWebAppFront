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
    <div className="taskClickOutsideException flex flex-col gap-4">
      <div className="taskClickOutsideException flex flex-col gap-4">
        <div className="taskClickOutsideException w-full flex flex-row">
          <h2 className="taskClickOutsideException text-xl text-black dark:text-white">
            {format(startOfMonthDate, 'MMM yyyy', { locale: es })}
          </h2>
          <div className="taskClickOutsideException ml-auto flex flex-row gap-2">
            <div
              onClick={handlePrevMonth}
              className={classNames('taskClickOutsideException cursor-pointer', {
                disabled: isSameDay(startOfMonthDate, startOfMonth(today)) && !showDaysBeforeToday,
              })}
            >
              <div
                className={classNames('taskClickOutsideException text-black dark:text-white cursor-pointer', {
                  'text-gray-300 cursor-not-allowed dark:text-zinc-700':
                    isSameDay(startOfMonthDate, startOfMonth(today)) && !showDaysBeforeToday,
                })}
              >
                <ChevronLeftIcon />
              </div>
            </div>
            <div
              className="taskClickOutsideException text-black dark:text-white cursor-pointer"
              onClick={handleNextMonth}
            >
              <ChevronRightIcon />
            </div>
          </div>
        </div>
        <div className="CustomDatePicker_Header_Week grid grid-cols-7 gap-4 text-black dark:text-white">
          <div>lun</div>
          <div>man</div>
          <div>mié</div>
          <div>jue</div>
          <div>vie</div>
          <div>sáb</div>
          <div>dom</div>
        </div>
      </div>
      <div className="CustomDatePicker_Content grid grid-cols-7 gap-4">
        {days.map((day, dayIndex) => (
          <div key={day.toString()} className="CustomDatePicker_Content_Day flex justify-center items-center">
            <time
              dateTime={format(day, 'yyyy-MM-dd')}
              onClick={() => handleSelectDay(day)}
              className={classNames('text-base flex justify-center items-center rounded-full w-8 h-8', {
                'text-gray-400 dark:text-zinc-600': !isSameMonth(day, startOfMonthDate),
                'cursor-pointer': !isBefore(day, today),
                'cursor-not-allowed': isBefore(day, today),
                'text-black dark:text-white': !isToday(day) && !isEqual(day, selectedDay),
                'text-red-500 dark:text-red-500': isToday(day) && !isEqual(day, selectedDay),
                'text-white bg-black dark:text-black dark:bg-white': isEqual(day, selectedDay) && !isToday(day),
                'text-red-500 bg-black dark:bg-white dark:text-red-500': isEqual(day, selectedDay) && isToday(day),
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
