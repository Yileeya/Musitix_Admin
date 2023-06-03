import { defineStore } from 'pinia'
import { pageLoadingStore } from '@/stores/pageLoading'
import checkInFields from '@/formFields/checkInFields'
import _ from 'lodash'
import dayjs from 'dayjs'

const pageLoading = pageLoadingStore()

export const qrcodeCheckInStore = defineStore('qrcodeCheckInStore', {
  state: () => ({
    ticketId: '' as string,
    orderInfo: '' as any
  }),
  actions: {
    setTicketId(value: string) {
      this.ticketId = value
    },
    setOrderInfo(value: any) {
      this.orderInfo = value
    }
  },
  getters: {
    isFetching: () => {
      return pageLoading.loading
    },
    getOrderInfoResult(state) {
      if (!state.orderInfo) return ''

      let orderInfoResult: any = {}
      _.forEach(checkInFields, (field) => {
        let result: any = ''
        if (field.id === 'ticketNumber') result = state.ticketId
        else if (field.id === 'activityTitle') result = state.orderInfo.activityInfo.title
        else if (field.id === 'ticketCategoryName')
          result = state.orderInfo.ticketList[0].categoryName
        else if (field.id === 'price') result = state.orderInfo.ticketList[0].price
        else if (field.id === 'checkInTime') result = dayjs().format('YYYY-MM-DD HH:mm:ss')
        else result = state.orderInfo[field.id as keyof typeof state.orderInfo]
        orderInfoResult[field.id] = result
      })
      return orderInfoResult
    }
  }
})
