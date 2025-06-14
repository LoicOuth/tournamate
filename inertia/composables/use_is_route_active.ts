export const useIsRouteActive = (url: string) => {
  return computed(() => usePage().url === url)
}
