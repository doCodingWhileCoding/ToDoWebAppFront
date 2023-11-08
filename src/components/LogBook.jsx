import '../assets/scss/logbook.scss'
import { getCompletedTasks } from '../api/taskAPI'
import TaskList from './TaskList'
import InfinityScroll from './InfinityScroll'
import TaskListMenu from './TaskListMenu'
import InboxIcon from '../assets/icons/InboxIcon'
const LogBook = () => {
  const queryKey = ['tasks', { type: 'completed' }]
  return (
    <div className="LogBook">
      <TaskListMenu isCustomList={false} title={'Registro'} Icon={InboxIcon} />
      <InfinityScroll fetchFunction={getCompletedTasks} queryKey={queryKey}>
        {(docs, lastDocRef, setDocs) => (
          <TaskList tasks={docs} lastTaskRef={lastDocRef} setDocs={setDocs} queryKey={queryKey} />
        )}
      </InfinityScroll>
    </div>
  )
}
export default LogBook
