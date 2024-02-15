import api from '@/lib/axios'

export const signUp = async (data) => {
  const res = await api.post(`auth/signup`, data)
  return res.data
}
export const login = async (data) => {
  const res = await api.post(`auth/login`, data)
  return res.data
}
export const resendEmailVerificationEmail = async (userId) => {
  const res = await api.get(`auth/resendEmailVerificationEmail/${userId}`)
  return res.data
}
export const verifyEmail = async (data) => {
  const res = await api.get(`auth/verifyEmail/${data.userId}/${data.uuid}`)
  return res.data
}
export const forgotPasswordByEmail = async (data) => {
  const res = await api.post(`auth/forgotPassword`, data)
  return res.data
}
export const forgotPasswordByUserId = async (userId) => {
  const res = await api.get(`auth/forgotPassword/${userId}`)
  return res.data
}
export const resetPassword = async (data) => {
  const res = await api.put(`auth/resetPassword/${data.userId}/${data.uuid}`, data.data)
  return res.data
}
