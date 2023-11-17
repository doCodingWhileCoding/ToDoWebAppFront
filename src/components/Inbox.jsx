import '../assets/scss/inbox.scss'
import { getInboxTasks } from '../api/taskAPI'
import TaskList from './TaskList'
import AddTask from './AddTask'
import InfinityScroll from './InfinityScroll'
import TaskListMenu from './TaskListMenu'
import InboxIcon from '../assets/icons/InboxIcon'
const Inbox = () => {
  const queryKey = ['tasks', { type: 'inbox' }]
  return (
    <div className="Inbox">
      <TaskListMenu isCustomList={false} title={'Entrada'} Icon={InboxIcon} />
      <InfinityScroll fetchFunction={getInboxTasks} queryKey={queryKey}>
        {(docs, lastDocRef, setDocs) => (
          <TaskList tasks={docs} lastTaskRef={lastDocRef} setDocs={setDocs} queryKey={queryKey} />
        )}
      </InfinityScroll>
      <AddTask queryKey={queryKey} />
    </div>
  )
}
export default Inbox
