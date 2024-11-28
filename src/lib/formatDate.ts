import { format, isValid, parse } from 'date-fns'

export function formatDate(dateString: string, weekday = false) {
  const date = parse(dateString, 'yyyy-MM-dd', new Date())

  if (!isValid(date)) {
    return 'Invalid Date'
  }

  const formatString = weekday ? 'EEEE, MMMM d, yyyy' : 'MMMM d, yyyy'

  return format(date, formatString)
}
