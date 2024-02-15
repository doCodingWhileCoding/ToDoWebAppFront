import { useState } from 'react'
import VisibilityIcon from '../../assets/icons/VisibilityIcon'
import VisibilityOffIcon from '../../assets/icons/VisibilityOffIcon'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import AnimatedSpinnerIcon from '../../assets/icons/AnimatedSpinnerIcon'
import { Link, useNavigate } from 'react-router-dom'
import { loginSchema } from '../../schemas/auth.schemas'
import { useMutation } from '@tanstack/react-query'
import { login } from '../../api/authAPI'
import errorMessages from '../../constants/error_messages'
import classNames from 'classnames'
import ResendEmailVerificationEmail from '../../components/Auth/ResendEmailVerificationEmail'
import { useAuthStore } from '../../store/auth.store'

const Login = () => {
  const navigate = useNavigate()
  const setToken = useAuthStore((state) => state.setToken)
  const [showPassword, setShowPassword] = useState(false)
  const [serverError, setServerError] = useState('')
  const [userId, setUserId] = useState('')
  const [showResendEmailVerificationEmail, setShowResendEmailVerificationEmail] = useState('')

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setToken(data)
      navigate('/')
    },
    onError: (error) => {
      if (error.response.data.errMsg === errorMessages.EMAIL_NOT_VERIFIED) {
        setUserId(error.response.data.userId)
        setServerError('Debes verificar tu email para poder iniciar sesión')
        setShowResendEmailVerificationEmail(true)
      } else if (error.response.data.errMsg === errorMessages.INVALID_LOGIN) {
        setServerError('Email o contraseña incorrecta')
      }
    },
  })
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  })
  const onSubmit = async (formData) => {
    const data = {
      email: formData.email,
      password: formData.password,
    }
    loginMutation.mutate(data)
  }
  return (
    <div className="Login w-full h-full flex justify-center items-center bg-white">
      <div className="Login_Content w-1/3 rounded-3xl p-10 flex flex-col justify-center items-center gap-5 bg-gray-300">
        <form className="w-full flex flex-col items-center gap-2" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="email w-full flex flex-col gap-2">
            <div className="input flex flex-row items-center bg-white p-2 rounded">
              <input
                className="border-none outline-none text-xl font-semibold w-full bg-transparent text-black autofill:shadow-[0_0px_0px_1000px_rgba(255,255,255)_inset] caret-black"
                {...register('email')}
                type="email"
                placeholder="Email"
                name="email"
              />
            </div>
            <div className="error h-5 text-red-500">
              <p>{errors.email?.message}</p>
            </div>
          </div>
          <div className="password w-full flex flex-col gap-2">
            <div className="input flex flex-row items-center bg-white p-2 rounded">
              <input
                className="border-none outline-none text-xl font-semibold w-full bg-transparent text-black autofill:shadow-[0_0px_0px_1000px_rgba(255,255,255)_inset] caret-black"
                {...register('password')}
                type={showPassword ? 'text' : 'password'}
                placeholder="Contraseña"
              ></input>
              <div
                className="visibility cursor-pointer flex justify-center items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword && <VisibilityIcon />}
                {!showPassword && <VisibilityOffIcon />}
              </div>
            </div>
            <div className="error h-5 text-red-500">
              <p>{errors.password?.message}</p>
            </div>
          </div>
          <button
            disabled={loginMutation.isPending}
            className={classNames(
              'w-1/2 p-2 rounded border-none outline-none font-semibold text-xl bg-white text-black mt-5 cursor-pointer flex justify-center items-center',
              { 'opacity-80 cursor-not-allowed': loginMutation.isPending }
            )}
          >
            {!loginMutation.isPending && <p>Login</p>}
            {loginMutation.isPending && (
              <div className="text-black">
                <AnimatedSpinnerIcon />
              </div>
            )}
          </button>
        </form>
        {serverError && <div className="serverError text-red-500">{serverError}</div>}
        {showResendEmailVerificationEmail && <ResendEmailVerificationEmail userId={userId} />}
        <div className="forgotPassword flex flex-col justify-center items-center text-black">
          <Link to="/auth/forgotPassword">He olvidado mi contraseña</Link>
        </div>
        <div className="signup flex flex-col justify-center items-center text-black">
          <p>¿No tienes cuenta?</p>
          <Link to="/auth/signup">Regístrate</Link>
        </div>
      </div>
    </div>
  )
}
export default Login
