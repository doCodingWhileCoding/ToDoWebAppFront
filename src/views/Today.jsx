import { getTodayTasks } from '../api/taskAPI'
import TaskList from '../components/TaskList'
import AddTask from '../components/AddTask'
import InfinityScroll from '../components/InfinityScroll'
import TaskListMenu from '../components/TaskListMenu'
import TodayIcon from '../assets/icons/TodayIcon'
const Today = () => {
  const queryKey = ['tasks', { type: 'today' }]
  return (
    <div className="Today w-full h-full relative flex flex-col items-center gap-10 px-40 py-16">
      <TaskListMenu isCustomList={false} title={'Hoy'} Icon={TodayIcon} IconClassColor="text-yellow-500" />
      <InfinityScroll fetchFunction={getTodayTasks} queryKey={queryKey}>
        {(docs, totalDocs, lastDocRef, setDocs) => (
          <TaskList tasks={docs} totalDocs={totalDocs} lastTaskRef={lastDocRef} setDocs={setDocs} queryKey={queryKey} />
        )}
      </InfinityScroll>
      <AddTask queryKey={queryKey} />
    </div>
  )
}
export default Today
