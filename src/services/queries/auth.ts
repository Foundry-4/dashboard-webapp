import type { AuthResponse } from '@/domain/interfaces/auth'
import type { AxiosError } from 'axios'

import { changePassword } from '@/services/requests/auth/change-password'
import { confirmAccount } from '@/services/requests/auth/confirm-account'
import { createUser } from '@/services/requests/auth/create-user'
import { forgotPassword } from '@/services/requests/auth/forgot-password'
import { login } from '@/services/requests/auth/login'
import { resetPassword } from '@/services/requests/auth/reset-password'
import { verify2FA } from '@/services/requests/auth/verify-2fa'
import { useMutation } from '@tanstack/react-query'

export const useCreateUser = () => {
  return useMutation({
    mutationFn: createUser,
    onError: () => {
      throw new Error('Falha no cadastro. Tente novamente.')
    }
  })
}

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
    onError: () => {
      throw new Error('Falha na autenticação. Verifique suas credenciais.')
    }
  })
}

export const useConfirmAccount = () => {
  return useMutation({
    mutationFn: confirmAccount,
    onError: (error: AxiosError<AuthResponse>) => {
      throw new Error(error.response?.data.message)
    }
  })
}

export const useVerify2FA = () => {
  return useMutation({
    mutationFn: verify2FA
  })
}

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: forgotPassword,
    onError: () => {
      throw new Error('Falha ao enviar email de recuperação.')
    }
  })
}

export const useResetPassword = () => {
  return useMutation({
    mutationFn: resetPassword,
    onError: () => {
      throw new Error('Falha ao resetar senha.')
    }
  })
}

export const useChangePassword = () => {
  return useMutation({
    mutationFn: changePassword,
    onError: () => {
      throw new Error('Falha ao alterar senha.')
    }
  })
}

export const AuthQueries = {
  useConfirmAccount,
  useVerify2FA
}

export const AuthMutations = {
  useCreateUser,
  useLogin,
  useForgotPassword,
  useConfirmAccount,
  useVerify2FA,
  useResetPassword,
  useChangePassword
}
