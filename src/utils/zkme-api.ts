import { useMchConf } from '@/composables';
import { NEST_API_URL } from '@/utils/config';
import { verifyKycWithZkMeServices } from '@zkmelabs/widget';

export type ResultBody = {
  code: number
  msg: string
  data: any
  timestamp: number
}

const { appId, apiKey } = useMchConf()

export async function getAccessToken (): Promise<string> {
  const options: Record<string, number> = {
    apiModePermission: 0,
    lv: 1
  }

  return fetch(NEST_API_URL + '/api/token/get', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      appId: appId.value,
      apiKey: apiKey.value,
      ...options
    })
  })
    .then(res => {
      if (res.ok) return res.json()
      else {
        throw new Error(`${res.status} ${res.statusText}`)
      }
    })
    .then((result: ResultBody) => {
      if (result.code === 80000000) {
        return result.data.accessToken
      } else {
        return Promise.reject(result)
      }
    })
    .catch((error) => {
      throw error
    })
}

export async function verifyKYCWithApi (appId: string, userAccount: string, programNo?: string): Promise<boolean> {
  const { isGrant } = await verifyKycWithZkMeServices(appId, userAccount, {
    programNo,
    endpoint: NEST_API_URL
  })
  return isGrant
}
