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

const defaultSchedule = {
  scheduleName: null as null | string,
  startTime: null as null | string,
  endTime: null as null | string,
  saleStartTime: null as null | string,
  saleEndTime: null as null | string,
  ticketCategories: [{ ...defaultTicketCategory }]
}

export const activityHandle = defineStore('activityHandle', {
  state: () => ({
    information: defaultInformation,
    HtmlContent: '',
    HtmlNotice: '',
    schedules: [
      {
        ...defaultSchedule,
        scheduleName: '場次1'
      }
    ]
  }),
  getters: {
    getDefaultTicketCategory() {
      return defaultTicketCategory
    },
    getDefaultSchedule() {
      return defaultSchedule
    },
    formatResult(state) {
      const { dateRange, ...infoResult } = state.information
      if (dateRange.length) {
        infoResult.startDate = dateRange[0].toISOString()
        infoResult.endDate = dateRange[1].toISOString()
      }
      return infoResult
    }
  }
})
