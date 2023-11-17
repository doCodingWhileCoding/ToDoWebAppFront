import { useEditTaskDateModalStore } from '../store/app.store'
import CalendarIcon from '../assets/icons/CalendarIcon'

const AddTaskDate = () => {
  const setShowEditTaskDateModal = useEditTaskDateModalStore((state) => state.setShowEditTaskDateModal)

  return (
    <div
      className="AddTaskDate"
      onClick={() => setShowEditTaskDateModal(true)}
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <CalendarIcon />
    </div>
  )
}
export default AddTaskDate
