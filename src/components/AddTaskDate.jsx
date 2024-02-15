import { useEditTaskDateModalStore } from '../store/app.store'
import CalendarIcon from '../assets/icons/CalendarIcon'

const AddTaskDate = () => {
  const setShowEditTaskDateModal = useEditTaskDateModalStore((state) => state.setShowEditTaskDateModal)

  return (
    <div
      className="AddTaskDate flex justify-center items-center text-gray-400 cursor-pointer"
      onClick={() => setShowEditTaskDateModal(true)}
    >
      <CalendarIcon />
    </div>
  )
}
export default AddTaskDate
