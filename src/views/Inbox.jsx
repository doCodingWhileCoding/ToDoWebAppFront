import { getInboxTasks } from '../api/taskAPI'
import TaskList from '../components/TaskList'
import AddTask from '../components/AddTask'
import InfinityScroll from '../components/InfinityScroll'
import TaskListMenu from '../components/TaskListMenu'
import InboxIcon from '../assets/icons/InboxIcon'
const Inbox = () => {
  const queryKey = ['tasks', { type: 'inbox' }]
  return (
    <div className="Inbox h-full w-full relative flex flex-col items-center gap-10 px-40 py-16">
      <TaskListMenu isCustomList={false} title={'Entrada'} Icon={InboxIcon} IconClassColor="text-blue-500" />
      <InfinityScroll fetchFunction={getInboxTasks} queryKey={queryKey}>
        {(docs, totalDocs, lastDocRef, setDocs) => (
          <TaskList tasks={docs} totalDocs={totalDocs} lastTaskRef={lastDocRef} setDocs={setDocs} queryKey={queryKey} />
        )}
      </InfinityScroll>
      <AddTask queryKey={queryKey} />
    </div>
  )
}
export default Inbox
