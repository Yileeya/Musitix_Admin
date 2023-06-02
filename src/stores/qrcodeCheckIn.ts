import { defineStore } from 'pinia'
import { pageLoadingStore } from '@/stores/pageLoading'

const pageLoading = pageLoadingStore()

export const qrcodeCheckInStore = defineStore('qrcodeCheckInStore', {
  state: () => ({
    ticketId: '',
    orderInfo: ''
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
    }
  }
})
