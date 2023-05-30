<script setup lang="ts">
import { toRef } from 'vue'
import { useField } from 'vee-validate'

const props = defineProps({
  type: {
    type: String,
    default: 'text'
  },
  value: {
    type: [String, Number],
    default: ''
  },
  name: {
    type: String,
    required: true
  },
  label: {
    type: String,
    default: ''
  },
  successMessage: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  }
})

const name = toRef(props, 'name')

const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
  meta
} = useField(name, undefined, {
  initialValue: props.value
})
</script>

<template>
  <div :class="{ 'has-error': !!errorMessage, success: meta.valid }">
    <label v-if="label" :for="name">{{ label }}</label>
    <input
      class="form-control"
      :class="[{ 'error-input': !!errorMessage }]"
      :name="name"
      :id="name"
      :type="type"
      :value="inputValue"
      :placeholder="placeholder"
      @input="handleChange"
      @blur="handleBlur"
    />
    <p class="text-danger" v-if="errorMessage || (meta.valid && successMessage)">
      {{ errorMessage || successMessage }}
    </p>
  </div>
</template>

<style scoped lang="scss">
.has-error {
  .error-input {
    border-color: var(--danger-color);
  }

  .text-danger {
    font-size: 16px;
    margin: 0;
  }
}

.form-control {
  &:focus {
    border-color: var(--primary-color);
  }
}
</style>
