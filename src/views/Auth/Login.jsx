import '../../assets/scss/login.scss'
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
      console.log(data)
      setToken(data)
      navigate('/')
    },
    onError: (error) => {
      console.log(error)
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
    reset,
  } = useForm({
    resolver: zodResolver(loginSchema),
  })
  const onSubmit = async (formData) => {
    const data = {
      email: formData.email,
      password: formData.password,
    }
    loginMutation.mutate(data)
    //reset()
  }
  return (
    <div className="Login">
      <div className="Login_Content">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="email">
            <div className="input">
              <input {...register('email')} type="email" placeholder="Email" name="email" />
            </div>
            <div className="error">
              <p>{errors.email?.message}</p>
            </div>
          </div>
          <div className="password">
            <div className="input">
              <input
                {...register('password')}
                type={showPassword ? 'text' : 'password'}
                placeholder="Contraseña"
              ></input>
              <div className="visibility" onClick={() => setShowPassword(!showPassword)}>
                {showPassword && <VisibilityIcon />}
                {!showPassword && <VisibilityOffIcon />}
              </div>
            </div>
            <div className="error">
              <p>{errors.password?.message}</p>
            </div>
          </div>
          <button disabled={loginMutation.isPending} className={classNames({ isSubmitting: loginMutation.isPending })}>
            {!loginMutation.isPending && <p>Login</p>}
            {loginMutation.isPending && <AnimatedSpinnerIcon />}
          </button>
        </form>
        {serverError && <div className="serverError">{serverError}</div>}
        {showResendEmailVerificationEmail && <ResendEmailVerificationEmail userId={userId} />}
        <div className="signup">
          <p>¿No tienes cuenta?</p>
          <Link to="/auth/signup">Regístrate</Link>
        </div>
      </div>
    </div>
  )
}
export default Login
