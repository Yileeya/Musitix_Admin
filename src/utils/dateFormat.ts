import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import weekday from 'dayjs/plugin/weekday'
import 'dayjs/locale/zh-tw'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(weekday)
dayjs.locale('zh-tw')

export function dateFormatUTC(utc: string, formatStr: string): string {
  return dayjs.utc(utc).tz('Asia/Taipei').format(formatStr)
}
