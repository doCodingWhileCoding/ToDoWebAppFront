import '../assets/scss/today.scss'
import { getTodayTasks } from '../api/taskAPI'
import TaskList from '../components/TaskList'
import AddTask from '../components/AddTask'
import InfinityScroll from '../components/InfinityScroll'
import TaskListMenu from '../components/TaskListMenu'
import TodayIcon from '../assets/icons/TodayIcon'
const Today = () => {
  const queryKey = ['tasks', { type: 'today' }]
  return (
    <div className="Today">
      <TaskListMenu isCustomList={false} title={'Hoy'} Icon={TodayIcon} />
      <InfinityScroll fetchFunction={getTodayTasks} queryKey={queryKey}>
        {(docs, lastDocRef, setDocs) => (
          <TaskList tasks={docs} lastTaskRef={lastDocRef} setDocs={setDocs} queryKey={queryKey} />
        )}
      </InfinityScroll>
      <AddTask queryKey={queryKey} />
    </div>
  )
}
export default Today
