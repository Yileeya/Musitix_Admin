import { defineStore } from 'pinia'
import _ from 'lodash'
import activityInfoFields from '@/formFields/activityInfoFields'

let defaultInformation: { [key: string]: any } = {}
_.forEach(activityInfoFields, (field) => {
  defaultInformation[field.id] = field.id === 'dateRange' ? [] : null
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
      return defaultSchedule
    }
  }
})
