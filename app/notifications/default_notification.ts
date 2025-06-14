import Notification from '#notifications/models/notification.model'
import User from '#me/models/user.model'
import { DefaultValueInterface } from '#notifications/types/notification.type'
import { NotificationContract } from '#notifications/types/notification.contract'

export default class DefaultNotification implements NotificationContract {
  get via(): 'email' | 'database' {
    return 'database'
  }

  constructor(public notificationValue: DefaultValueInterface) {}

  async toDatabase(user: User) {
    await Notification.create({
      value: this.notificationValue,
      type: 'default',
      readAt: null,
      userId: user.id,
    })
  }
}
