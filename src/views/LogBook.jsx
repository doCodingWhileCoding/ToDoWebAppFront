import { getCompletedTasks } from '../api/taskAPI'
import TaskList from '../components/TaskList'
import InfinityScroll from '../components/InfinityScroll'
import TaskListMenu from '../components/TaskListMenu'
import InboxIcon from '../assets/icons/InboxIcon'
const LogBook = () => {
  const queryKey = ['tasks', { type: 'completed' }]
  return (
    <div className="LogBook h-full w-full relative flex flex-col items-center gap-10 px-40 py-16">
      <TaskListMenu isCustomList={false} title={'Registro'} Icon={InboxIcon} IconClassColor="text-green-600" />
      <InfinityScroll fetchFunction={getCompletedTasks} queryKey={queryKey}>
        {(docs, totalDocs, lastDocRef, setDocs) => (
          <TaskList tasks={docs} totalDocs={totalDocs} lastTaskRef={lastDocRef} setDocs={setDocs} queryKey={queryKey} />
        )}
      </InfinityScroll>
    </div>
  )
}
export default LogBook
