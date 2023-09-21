import api from '@/lib/axios'

export const getTasks = async () => {
  const res = await api.get('/tasks')
  return res.data
}

export const createTask = async (task) => {
  await api.post('/tasks', task)
}

export const deleteTask = async (taskId) => {
  await api.delete(`/tasks/${taskId}`)
}

export const updateTask = async (data) => {
  await api.put(`/tasks/${data.id}`, data.data)
}
