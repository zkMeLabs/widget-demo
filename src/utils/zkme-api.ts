import { useMchConf, useSearchParams } from '@/composables';
import { NEST_API_URL, ZKME_API_URL } from '@/utils/config';

export type ResultBody = {
  code: number
  msg: string
  data: any
  timestamp: number
}

const { appId, apiKey } = useMchConf()

export async function queryBindingDid (connectedAddress: string): Promise<boolean> {
  return fetch(ZKME_API_URL + '/appUserGrantMch/queryBindingDid', {
    method: 'POST',
    body: JSON.stringify({
      mchNo: appId.value,
      walletAddress: connectedAddress
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
        return result.data
      } else {
        return Promise.reject(result)
      }
    })
    .catch((error) => {
      throw error
    })
}

export async function getAccessToken () {
  const { result: lv } = useSearchParams('lv')

  return fetch(NEST_API_URL + '/api/token/get', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      appId: appId.value,
      apiKey: apiKey.value,
      lv: lv.value === '2' ? 2 : 1
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