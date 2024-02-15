import { getUpcomingTasks } from '../api/taskAPI'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import UpcomingDateList from '../components/UpcomingDateList'
import TaskListMenu from '../components/TaskListMenu'
import CalendarIcon from '../assets/icons/CalendarIcon'
const Upcoming = () => {
  const queryKey = ['tasks', { type: 'upcoming' }]
  const {
    isPending,
    data: tasks,
    isError,
    error,
    isSuccess,
  } = useQuery({
    queryKey: queryKey,
    queryFn: getUpcomingTasks,
  })
  if (isPending) {
    return <div>Loading...</div>
  } else if (isError) {
    return <div>Error: {error.response.data}</div>
  }
  return (
    <div className="Upcoming h-full w-full relative flex flex-col items-center gap-10 px-40 py-16">
      <TaskListMenu isCustomList={false} title={'Programadas'} Icon={CalendarIcon} IconClassColor="text-red-600" />
      <UpcomingDateList tasks={tasks} />
    </div>
  )
}
export default Upcoming
