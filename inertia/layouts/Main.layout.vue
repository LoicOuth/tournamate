<script setup lang="ts">
import { type SharedProps } from '@adonisjs/inertia/types'
import { ConfigProvider } from 'radix-vue'
import { useId } from 'vue'
import { toast } from 'vue-sonner'

const useIdFunction = () => useId() || ''

const sharedProps = computed(() => usePage<SharedProps>().props)

watch(
  sharedProps,
  () => {
    triggerToast()
  },
  {
    deep: true,
  }
)

onMounted(() => {
  triggerToast()
})

const triggerToast = () => {
  if (sharedProps.value.toastSuccess) {
    toast.success(sharedProps.value.toastSuccess)
  }

  if (sharedProps.value.toastError) {
    toast.error(sharedProps.value.toastError)
  }
}
</script>

<template>
  <ConfigProvider :use-id="useIdFunction">
    <Sonner richColors :theme="sharedProps.theme" position="top-right" />
    <slot />
  </ConfigProvider>
</template>
