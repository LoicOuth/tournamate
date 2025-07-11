<script setup lang="ts">
import { BellIcon, BellOffIcon, TrashIcon } from 'lucide-vue-next'
import { Transmit } from '@adonisjs/transmit-client'
import { type NotificationPresenter } from '#notifications/presenters/notification.presenter'
import { toast } from 'vue-sonner'

type NotificationEvent =
  | { notifications: NotificationPresenter[] }
  | { readNotification: NotificationPresenter }
  | { deleteNotification: number }
  | { notification: NotificationPresenter }

const { t } = useI18n()
const { user } = useUser()

const notifications = ref<NotificationPresenter[]>([])
const showActions = ref<number | null>(null)

const unreadNotifications = computed(
  () => notifications.value.filter((notif) => !notif.readAt).length
)

const markAsRead = (notificationId: number) => {
  router.patch(`/notifications/${notificationId}`)
}
const handleDelete = (notificationId: number) => {
  router.delete(`/notifications/${notificationId}`)
}

onMounted(async () => {
  const transmit = new Transmit({
    baseUrl: 'http://localhost:3333',
  })
  const subscription = transmit.subscription(`users/${user.value?.id}/notifications`)

  await subscription.create()

  subscription.onMessage((message: NotificationEvent) => {
    if ('notifications' in message) {
      notifications.value = user.value ? [...message.notifications] : []
    } else if ('readNotification' in message) {
      const index = notifications.value.findIndex(
        (notification) => notification.id === message.readNotification.id
      )

      notifications.value[index] = message.readNotification
    } else if ('deleteNotification' in message) {
      const index = notifications.value.findIndex(
        (notification) => notification.id === message.deleteNotification
      )
      notifications.value.splice(index, 1)
    } else {
      notifications.value.push({
        ...message.notification,
        readAt: null,
      })

      toast(message.notification.value.title, {
        description: message.notification.value.content,
        id: message.notification.id,
        duration: 3000,
        icon: BellIcon,
      })
    }
  })
})
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger>
      <Button variant="ghost" size="icon" class="relative">
        <BellIcon class="size-6" />
        <div
          v-if="unreadNotifications > 0"
          class="absolute size-5 bg-red-500 text rounded-full top-0 right-0 text-white"
        >
          {{ unreadNotifications }}
        </div>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="min-w-80 max-h-52 overflow-y-auto overflow-x-hidden">
      <div v-if="notifications.length" class="flex flex-col">
        <template v-for="(notif, index) in notifications" :key="notif.id">
          <div
            class="p-2 flex items-center"
            :class="{ 'border-b': index !== notifications.length - 1 }"
            @mouseover="showActions = notif.id"
            @mouseleave="showActions = null"
          >
            <div class="flex-1">
              <div class="text-lg flex items-center gap-1">
                <span v-if="!notif.readAt" class="size-2 bg-primary rounded-full block" />
                {{ notif.value.title }}
              </div>
              <div class="text-foreground/60 text-sm">{{ notif.value.content }}</div>
              <div class="text-foreground/60 text-sm">
                {{ new Date(notif.createdAt).toLocaleString() }}
              </div>
            </div>
            <Transition name="slide">
              <div v-if="showActions === notif.id" class="ml-3 flex flex-col">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Button variant="ghost" size="icon" @click="markAsRead(notif.id)">
                        <BellOffIcon />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent> {{ t('notifications.markAsRead') }} </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Button variant="ghost" size="icon" @click="handleDelete(notif.id)">
                        <TrashIcon class="text-red-500" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent> {{ t('notifications.delete') }} </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </Transition>
          </div>
        </template>
      </div>
      <div v-else class="p-5">{{ t('notifications.noNotifications') }}</div>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
</style>
