import api from '@/lib/axios'

export const getCompletedTasks = async (page = 1) => {
  const res = await api.get(`/tasks?completed=true&page=${page}`)
  return res.data
}
export const getUnCompletedTasks = async (page = 1) => {
  const res = await api.get(`/tasks?completed=false&page=${page}`)
  return res.data
}
export const createTask = async (task) => {
  const res = await api.post('/tasks', task)
  return res.data
}

export const deleteTask = async (taskId) => {
  const res = await api.delete(`/tasks/${taskId}`)
  return res.data
}

export const updateTask = async (data) => {
  await api.put(`/tasks/${data.id}`, data.data)
}
export const updateTaskIsCompleted = async (data) => {
  await api.put(`/tasks/${data.id}/isCompleted`, data.data)
}
export const updateTaskPosition = async (data) => {
  await api.put(`/tasks/${data.id}/position`, data.data)
}
