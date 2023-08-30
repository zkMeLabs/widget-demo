/**
 * @param time Required waiting time
 */
export function sleep (time: number): Promise<boolean> {
  return new Promise(resolve => {
    window.setTimeout(() => {
      resolve(true)
    }, time)
  })
}

/**
 * Let the completion of an asynchronous task be timed not to finish before the given time, but at least until the end of the given time
 * @param anyway Waiting time (milliseconds) in any case
 */
export async function extendFetch<T extends unknown> (task: T, anyway = 1000) {
  const rp = await Promise.allSettled([
    task,
    sleep(anyway)
  ])
  if (rp[0].status === 'rejected') {
    throw rp[0].reason
  }
  return rp[0].value
}

export const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`)

export function escapeRegExp (string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
}

export function is<T> (obj: any, key: string): obj is T {
  return key in obj
}
