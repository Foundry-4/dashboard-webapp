import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'

import type z from 'zod'

import { Button } from '@/components/ui/button'
import { FormInput } from '@/components/ui/custom/FormInput'
import { FormSelect } from '@/components/ui/custom/FormSelect'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { createUserSchema } from '@/domain/schemas/auth'
import { RoleQueries } from '@/services/queries/roles'
import { UserMutations } from '@/services/queries/user'

type CreateUserFormData = z.infer<typeof createUserSchema>

export default function CreateUser() {
  const roles = RoleQueries.useGetRoles()
  const createUser = UserMutations.useCreateUser()

  const methods = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      name: '',
      email: '',
      confirmEmail: '',
      password: '',
      roleId: '',
      twoFactorEnabled: true
    }
  })
  const { register, handleSubmit, control, reset } = methods

  const roleOptions = useMemo(
    () =>
      roles?.data?.data?.data?.map(role => ({
        value: role.roleId,
        label: role.name
      })) ?? [],
    [roles]
  )

  const onSubmit = async (data: CreateUserFormData) => {
    const response = await createUser.mutateAsync({
      ...data,
      roleId:
        roleOptions.find(option => option.label === data.roleId)?.value ?? 0
    })
    if (response.status) {
      reset()
    }
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto max-w-md space-y-4 rounded-lg px-0 py-8 sm:px-8"
      >
        <FormInput
          label="Nome completo"
          {...register('name')}
        />
        <FormInput
          label="Email"
          type="email"
          {...register('email')}
        />
        <FormInput
          label="Confirmar email"
          type="confirmEmail"
          {...register('confirmEmail')}
        />
        <FormInput
          label="Senha"
          type="password"
          {...register('password')}
        />
        <FormSelect
          name="roleId"
          label="Permissão"
          options={roleOptions}
          disabled={roles.isFetching}
        />
        <Controller
          control={control}
          name="twoFactorEnabled"
          render={({ field }) => (
            <div className="flex flex-row items-center gap-4 pt-2">
              <Switch
                aria-label="Habilitar autenticação de dois fatores"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
              <Label className="text-sm font-medium text-gray-900">
                Autenticação de dois fatores
              </Label>
            </div>
          )}
        />
        <Button
          className="mt-4 w-full bg-gray-300 text-black hover:bg-gray-400"
          type="submit"
          disabled={createUser.isPending}
        >
          Criar usuário
        </Button>
      </form>
    </FormProvider>
  )
}
