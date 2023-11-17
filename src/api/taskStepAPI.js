import api from '@/lib/axios'

export const createTaskStep = async (data) => {
  const res = await api.post(`/tasks/${data.taskId}/taskSteps`, data.data)
  return res.data
}
export const getTaskSteps = async (taskId) => {
  const res = await api.get(`/tasks/${taskId}/taskSteps`)
  return res.data
}
export const updateTaskStep = async (data) => {
  const res = await api.put(`/tasks/${data.taskId}/taskSteps/${data.taskStepId}`, data.data)
  return res.data
}
export const updateTaskStepPosition = async (data) => {
  const res = await api.put(`/tasks/${data.taskId}/taskSteps/${data.taskStepId}/position`, data.data)
  return res.data
}
export const deleteTaskStep = async (data) => {
  const res = await api.delete(`/tasks/${data.taskId}/taskSteps/${data.taskStepId}`)
  return res.data
}
