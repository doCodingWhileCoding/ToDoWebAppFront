import '../../assets/scss/signup.scss'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signUpSchema } from '../../schemas/auth.schemas'
import { Link } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { signUp } from '../../api/authAPI'
import classNames from 'classnames'
import VisibilityIcon from '../../assets/icons/VisibilityIcon'
import VisibilityOffIcon from '../../assets/icons/VisibilityOffIcon'
import AnimatedSpinnerIcon from '../../assets/icons/AnimatedSpinnerIcon'

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false)
  const signUpMutation = useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {
      console.log(data)
    },
    onError: (error) => {
      console.log(error)
    },
  })
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(signUpSchema),
  })
  const onSubmit = async (formData) => {
    const data = {
      email: formData.email,
      password: formData.password,
    }
    signUpMutation.mutate(data)
    //reset()
  }
  return (
    <div className="SignUp">
      <div className="SignUp_Content">
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
          <div className="confirmPassword">
            <div className="input">
              <input
                {...register('confirmPassword')}
                type={showPassword ? 'text' : 'password'}
                placeholder="Confirmar Contraseña"
              ></input>
              <div className="visibility" onClick={() => setShowPassword(!showPassword)}>
                {showPassword && <VisibilityIcon />}
                {!showPassword && <VisibilityOffIcon />}
              </div>
            </div>
            <div className="error">
              <p>{errors.confirmPassword?.message}</p>
            </div>
          </div>
          <button
            disabled={signUpMutation.isPending}
            className={classNames({ isSubmitting: signUpMutation.isPending })}
          >
            {!signUpMutation.isPending && <p>Registrarse</p>}
            {signUpMutation.isPending && <AnimatedSpinnerIcon />}
          </button>
        </form>
        <div className="login">
          <p>Ya tienes cuenta?</p>
          <Link to="/auth/login">Inicia sesión</Link>
        </div>
      </div>
    </div>
  )
}
export default SignUp
