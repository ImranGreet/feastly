<script lang="ts" setup>
const badgeTitle: string = 'Active';
import useBadge from './scripts/useBadge';
const { badgeBg } = useBadge();
</script>

<template>
  <span :class="badgeBg">
    {{ badgeTitle }}
  </span>
</template>
