<template>
  <section>
    <h3>訂單內容</h3>
    <div class="form-group">
      <div class="form-input" v-for="field in checkInFields" :key="field.id">
        <label>{{ field.name }}</label>
        <span v-if="field.id === 'ticketNumber' && !qrcodeCheckIn.orderInfo">
          {{ qrcodeCheckIn.ticketId || '-' }}
        </span>
        <span v-else>
          {{ qrcodeCheckIn.getOrderInfoResult?.[field.id] || '-' }}
        </span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import checkInFields from '@/formFields/checkInFields'
import { qrcodeCheckInStore } from '@/stores/qrcodeCheckIn'

const qrcodeCheckIn = qrcodeCheckInStore()
</script>

<style scoped lang="scss">
.order-information {
  h3 {
    color: var(--primary-color);
    font-weight: bold;
    padding: 0 1em;
    border: 2px solid;
    width: max-content;
    border-bottom: none;
    border-top: none;
    margin-bottom: 15px;
  }

  .form-group {
    .form-input {
      margin: 15px 0;

      label {
        width: 140px;
        position: relative;

        &:after {
          content: '｜';
          position: absolute;
          right: 10px;
        }
      }

      span {
        display: inline-block;
      }
    }

    @media (max-width: 768px) {
      label {
        font-weight: bold;

        &:after {
          display: none;
        }
      }
    }
  }
}
</style>
