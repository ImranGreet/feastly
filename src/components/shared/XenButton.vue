<script setup lang="ts">
import useButton from './scripts/useButton';
const { computedButtonClass, handleClick, isDisabled, props } = useButton();
</script>

<template>
  <button
    :class="computedButtonClass"
    :type="props.buttonType"
    :disabled="isDisabled"
    @click="handleClick"
  >
    <span v-if="props.loading">Loading...</span>
    <template v-else>
      <span v-if="props.buttonIcon">{{ props.buttonIcon }}</span>
      {{ props.buttonTitle }}
    </template>
  </button>
</template>
