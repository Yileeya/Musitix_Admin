import { defineStore } from 'pinia'
import _ from 'lodash'
import activityInfoFields from '@/formFields/activityInfoFields'
import dayjs from 'dayjs'

let defaultInformation: { [key: string]: any } = {}
_.forEach(activityInfoFields, (field) => {
  if (field.id === 'dateRange') return
  defaultInformation[field.id] = null
})

const defaultTicketCategory = {
  categoryName: null,
  price: null,
  totalQuantity: null,
  remainingQuantity: null
}

const defaultSchedule: {
  scheduleName: null | string
  startTime: null | string
  endTime: null | string
  saleStartTime: null | string
  saleEndTime: null | string
  ticketCategories: {
    categoryName: null | string
    price: null | number
    totalQuantity: null | number
    remainingQuantity: null | number
  }[]
} = {
  scheduleName: null,
  startTime: null,
  endTime: null,
  saleStartTime: null,
  saleEndTime: null,
  ticketCategories: [{ ...defaultTicketCategory }]
}

export const activityHandle = defineStore('activityHandle', {
  state: () => ({
    information: {},
    HtmlContent: '',
    HtmlNotice: '',
    schedules: [] as (typeof defaultSchedule)[]
  }),
  actions: {
    reset() {
      this.information = { ...defaultInformation, ...{ startDate: null, endDate: null } }
      this.HtmlContent = ''
      this.HtmlNotice = ''
      this.schedules = [
        {
          ...defaultSchedule,
          scheduleName: '場次1'
        }
      ]
    }
  },
  getters: {
    getDefaultTicketCategory() {
      return defaultTicketCategory
    },
    getDefaultSchedule() {
      return _.cloneDeep(defaultSchedule)
    },
    getSaleDateRange(state) {
      //計算場次的販售最早與最晚日期
      if (!state.schedules.length) return [null, null]

      let earliestDate: string | null = null
      let latestDate: string | null = null

      for (const schedule of state.schedules) {
        if (schedule.saleStartTime === null) {
          earliestDate = null
          latestDate = null
          break // 中斷
        }

        const startTime = dayjs(schedule.saleStartTime)
        const endTime = dayjs(schedule.saleEndTime)

        if (earliestDate === null || startTime.isBefore(earliestDate)) {
          earliestDate = startTime.toISOString()
        }

        if (latestDate === null || endTime.isAfter(latestDate)) {
          latestDate = endTime.toISOString()
        }
      }

      return [earliestDate, latestDate]
    }
  }
})
