<script setup lang="ts">
import type { IconName } from '#types/common'
import DynamicIcon from '~/components/shared/DynamicIcon.vue'

const props = defineProps<{
  href: string
  text: string
  icon: IconName
}>()

const isActive = useIsRouteActive(props.href)
</script>
<template>
  <Button
    variant="ghost"
    as-child
    class="w-full text-left justify-start"
    :class="{ 'bg-muted hover:bg-muted': isActive }"
  >
    <Link as="a" :href="props.href" class="cursor-pointer">
      <DynamicIcon :name="props.icon" class="mr-2 size-6" />
      <span>{{ props.text }}</span>
    </Link>
  </Button>
</template>
