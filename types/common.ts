import type * as icons from 'lucide-vue-next'

export interface SvgProps {
  height?: number
  width?: number
  class?: string
}

export interface BreadcrumbItem {
  href: string
  label: string
}

export const AuthProviderNamesArray = ['google'] as const
export type AuthProviderNames = (typeof AuthProviderNamesArray)[number]

export type IconName = keyof typeof icons
