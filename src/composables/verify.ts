import type { Ref } from "vue"
import { extendFetch } from "@/utils/common"
import type { KycStatus } from "@/types"
import { useContract } from "./contract"
import { getAccessToken, queryBindingDid } from "@/utils/zkme-api"
import { useSearchParams } from "./common"
import { useChain } from "./wallet"
import { hasApproved } from '@/utils/cosmos'

export function useMchConf () {
  const { result: _appId } = useSearchParams('appId')
  const { result: _apiKey } = useSearchParams('apiKey')
  const { result: _dappAccount } = useSearchParams('dappAccount')

  const appId = computed(() => {
    return _appId.value || import.meta.env.VITE_APP_APP_ID
  })

  const apiKey = computed(() => {
    return _apiKey.value || import.meta.env.VITE_APP_API_KEY
  })

  const dappAccount = computed(() => {
    return _dappAccount.value || import.meta.env.VITE_APP_DAPP_ACCOUNT
  })

  return {
    appId,
    apiKey,
    dappAccount
  }
}

export function useVerify (connectedAddress: Ref<string>, lv?: Ref<string>) {
  const kycStatus = ref<KycStatus>('unknown')
  const checkingApproval = ref(false)
  const accessToken = ref('')

  const needKyc = computed(() => {
    return Boolean(connectedAddress.value && kycStatus.value === 'unauthorized')
  })
  const { dappAccount } = useMchConf()

  const verify = async (address: string, kycType?: Ref<string>) => {
    kycStatus.value = 'unknown'
    checkingApproval.value = true

    if (kycType && kycType.value === '2') {
      const isBound = await extendFetch(queryBindingDid(address))
      kycStatus.value = isBound ? 'valid' : 'unauthorized'
    } else {
      try {
        let isApproved: boolean
        const { cluster } = useChain()

        if (cluster.value.type === 'cosmos') {
          isApproved = await hasApproved(dappAccount.value, address)
        } else {
          const { contract } = useContract()
          isApproved = await contract.hasApproved(dappAccount.value, address)
        }
        kycStatus.value = isApproved ? 'valid' : 'unauthorized'
      } catch (err) {
        console.log(err)
      }
    }

    if (kycStatus.value !== 'valid' && !accessToken.value) {
      accessToken.value = await getAccessToken()
    }
    checkingApproval.value = false
  }

  watchEffect(async () => {
    if (connectedAddress.value) {
      verify(connectedAddress.value, lv)
    }
  })

  return {
    verify,
    kycStatus,
    checkingApproval,
    needKyc,
    accessToken,
  }
}
