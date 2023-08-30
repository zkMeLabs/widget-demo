export function useSearchParams (key: string) {
  const result = computed(() => {
    let val = ''
    const query = useRoute()?.query

    if (query && query[key]) {
      val = query[key] as string
    } else {
      const url = new URL(location.href)
      val = url.searchParams.get(key) || ''
    }

    return val
  })

  return {
    result
  }
}
