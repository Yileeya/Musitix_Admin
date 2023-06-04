import { defineStore } from 'pinia'
import _ from 'lodash'
import activityInfoFields from '@/formFields/activityInfoFields'

let defaultInformation: { [key: string]: any } = {}
_.forEach(activityInfoFields, (field) => {
  defaultInformation[field.id] = field.id === 'dateRange' ? [] : null
})

export const activityHandle = defineStore('activityHandle', {
  state: () => ({
    information: defaultInformation
  }),
  actions: {
    setInformation(value: any) {
      this.information = value
    }
  },
  getters: {
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
