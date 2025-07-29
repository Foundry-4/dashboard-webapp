import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'

import type z from 'zod'

import { Button } from '@/components/ui/button'
import { FormInput } from '@/components/ui/custom/FormInput'
import { createCompanySchema } from '@/domain/schemas/company'
import { CompanyMutations } from '@/services/queries/company'

type CreateCompanyFormData = z.infer<typeof createCompanySchema>

export default function CreateCompany() {
  const createCompany = CompanyMutations.useCreateCompany()

  const methods = useForm<CreateCompanyFormData>({
    resolver: zodResolver(createCompanySchema),
    defaultValues: {
      corporateName: '',
      cnpj: '',
      nameFantasy: '',
      phone: '',
      email: '',
      whatsapp: '',
      logoUrl: '',
      workingHoursWeek: '',
      workingHoursSaturday: '',
      workingHoursSunday: ''
    }
  })
  const { register, handleSubmit, reset } = methods

  const onSubmit = async (data: CreateCompanyFormData) => {
    const response = await createCompany.mutateAsync(data)
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
          label="Razão Social"
          {...register('corporateName')}
        />
        <FormInput
          label="CNPJ"
          placeholder="00.000.000/0000-00"
          {...register('cnpj')}
        />
        <FormInput
          label="Nome Fantasia"
          {...register('nameFantasy')}
        />
        <FormInput
          label="Telefone"
          placeholder="(11) 99999-9999"
          {...register('phone')}
        />
        <FormInput
          label="Email"
          type="email"
          {...register('email')}
        />
        <FormInput
          label="WhatsApp (opcional)"
          placeholder="(11) 99999-9999"
          {...register('whatsapp')}
        />
        <FormInput
          label="URL do Logo (opcional)"
          placeholder="https://example.com/logo.png"
          {...register('logoUrl')}
        />
        <FormInput
          label="Horário de Funcionamento - Semana"
          placeholder="08:00 - 18:00"
          {...register('workingHoursWeek')}
        />
        <FormInput
          label="Horário de Funcionamento - Sábado"
          placeholder="08:00 - 12:00"
          {...register('workingHoursSaturday')}
        />
        <FormInput
          label="Horário de Funcionamento - Domingo"
          placeholder="Fechado"
          {...register('workingHoursSunday')}
        />
        <Button
          className="mt-4 w-full bg-gray-300 text-black hover:bg-gray-400"
          type="submit"
          disabled={createCompany.isPending}
        >
          Criar empresa
        </Button>
      </form>
    </FormProvider>
  )
}
