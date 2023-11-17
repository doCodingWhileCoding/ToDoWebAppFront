import '../assets/scss/upcoming.scss'
import { getUpcomingTasks } from '../api/taskAPI'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import UpcomingDateList from './UpcomingDateList'
import TaskListMenu from './TaskListMenu'
import CalendarIcon from '../assets/icons/CalendarIcon'
const Upcoming = () => {
  const queryKey = ['tasks', { type: 'upcoming' }]
  const {
    isLoading,
    data: tasks,
    isError,
    error,
    isSuccess,
  } = useQuery({
    queryKey: queryKey,
    queryFn: getUpcomingTasks,
  })
  if (isLoading) {
    return <div>Loading...</div>
  } else if (isError) {
    return <div>Error: {error.response.data}</div>
  }
  return (
    <div className="Upcoming">
      <TaskListMenu isCustomList={false} title={'Programadas'} Icon={CalendarIcon} />
      <UpcomingDateList tasks={tasks} />
    </div>
  )
}
export default Upcoming
