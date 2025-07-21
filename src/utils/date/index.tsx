import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export const formatDate = (
  date: Date | string,
  formatString: string = "dd 'de' MMM, yyyy"
) => {
  const dateToFormat = typeof date === 'string' ? new Date(date) : date

  try {
    return format(dateToFormat, formatString, {
      locale: ptBR
    })
  } catch {
    return date
  }
}
