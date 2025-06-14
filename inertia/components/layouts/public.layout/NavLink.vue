<script setup lang="ts">
const props = defineProps<{
  href: string
  text: string
}>()
const isActive = useIsRouteActive(props.href)
</script>

<template>
  <Link
    as="a"
    :href="props.href"
    class="transition-colors hover:text-foreground/80 text-foreground/60 font-semibold"
    :class="{ '!text-foreground': isActive }"
  >
    {{ props.text }}
  </Link>
</template>
