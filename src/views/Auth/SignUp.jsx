import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signUpSchema } from '../../schemas/auth.schemas'
import { Link } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { signUp } from '../../api/authAPI'
import classNames from 'classnames'
import VisibilityIcon from '../../assets/icons/VisibilityIcon'
import VisibilityOffIcon from '../../assets/icons/VisibilityOffIcon'
import AnimatedSpinnerIcon from '../../assets/icons/AnimatedSpinnerIcon'
import errorMessages from '../../constants/error_messages'

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [serverError, setServerError] = useState('')
  const signUpMutation = useMutation({
    mutationFn: signUp,
    onError: (error) => {
      if (error.response.data?.errMsg === errorMessages.EMAIL_EXISTS) {
        setServerError('Ya existe una cuenta con ese email')
      } else {
        setServerError('Algo no ha ido bien')
      }
    },
  })
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
  })
  const onSubmit = async (formData) => {
    const data = {
      email: formData.email,
      password: formData.password,
    }
    signUpMutation.mutate(data)
  }
  return (
    <div className="SignUp w-full h-full flex justify-center items-center bg-white">
      <div className="SignUp_Content w-1/3 rounded-3xl p-10 flex flex-col justify-center items-center gap-5 bg-gray-300">
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
          <div className="confirmPassword w-full flex flex-col gap-2">
            <div className="input flex flex-row items-center bg-white p-2 rounded">
              <input
                className="border-none outline-none text-xl font-semibold w-full bg-transparent text-black autofill:shadow-[0_0px_0px_1000px_rgba(255,255,255)_inset] caret-black"
                {...register('confirmPassword')}
                type={showPassword ? 'text' : 'password'}
                placeholder="Confirmar Contraseña"
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
              <p>{errors.confirmPassword?.message}</p>
            </div>
          </div>
          {signUpMutation.isError && (
            <div className="serverError text-red-500">
              <p>{serverError}</p>
            </div>
          )}
          <button
            disabled={signUpMutation.isPending}
            className={classNames(
              'w-1/2 p-2 rounded border-none outline-none font-semibold text-xl bg-white text-black mt-5 cursor-pointer flex justify-center items-center',
              { 'opacity-80 cursor-not-allowed': signUpMutation.isPending }
            )}
          >
            {!signUpMutation.isPending && <p>Registrarse</p>}
            {signUpMutation.isPending && (
              <div className="text-black">
                <AnimatedSpinnerIcon />
              </div>
            )}
          </button>
        </form>
        <div className="login flex flex-col justify-center items-center text-black">
          <p>Ya tienes cuenta?</p>
          <Link to="/auth/login">Inicia sesión</Link>
        </div>
      </div>
    </div>
  )
}
export default SignUp
