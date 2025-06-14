import Notification from '#notifications/models/notification.model'
import '#notifications/events/notification.event'

declare module '@adonisjs/core/types' {
  interface EventsList {
    'new:notification': Notification
    'read:notification': Notification
    'delete:notification': Notification
  }
}
