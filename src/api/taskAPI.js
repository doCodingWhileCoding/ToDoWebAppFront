import api from '@/lib/axios'

export const getCompletedTasks = async (page = 1) => {
  const res = await api.get(`/tasks?type=completed&page=${page}`)
  return res.data
}
export const getInboxTasks = async (page = 1) => {
  const res = await api.get(`/tasks?type=inbox&page=${page}`)
  return res.data
}
export const getTodayTasks = async (page = 1) => {
  const res = await api.get(`/tasks?type=today&page=${page}`)
  return res.data
}
export const getUpcomingTasks = async () => {
  const res = await api.get(`/tasks?type=upcoming&page=${0}`)
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
  await api.put(`/tasks/${data.taskId}`, data.data)
}
export const updateTaskIsCompleted = async (data) => {
  await api.put(`/tasks/${data.taskId}/isCompleted`, data.data)
}
export const updateTaskPosition = async (data) => {
  await api.put(`/tasks/${data.taskId}/position`, data.data)
}
