import User from '#me/models/user.model'

export interface NotificationContract {
  via: 'email' | 'database'
  toDatabase?: (user: User) => Promise<void>
  toEmail?: (user: User) => Promise<void>
}
