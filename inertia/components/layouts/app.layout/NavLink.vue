<script setup lang="ts">
import type { IconName } from '#types/common'
import DynamicIcon from '~/components/shared/DynamicIcon.vue'

const props = defineProps<{
  href: string
  params?: any
  text: string
  icon: IconName
}>()

const isActive = useIsRouteActive(props.href)
</script>
<template>
  <SidebarMenuItem>
    <SidebarMenuButton asChild :tooltip="props.text" :class="{ 'bg-sidebar-accent': isActive }">
      <Link as="a" :href="href" class="cursor-pointer">
        <DynamicIcon :name="props.icon" class="mr-2 size-6" />
        <span>{{ props.text }}</span>
      </Link>
    </SidebarMenuButton>
  </SidebarMenuItem>
</template>
