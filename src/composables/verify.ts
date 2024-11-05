import type { Ref } from "vue"
import { extendFetch } from "@/utils/common"
import type { KycStatus } from "@/types"
import { verifyKYCWithApi } from "@/utils/zkme-api"
import { useSearchParams } from "./common"
import { useContract } from "."
import { DAPP_CONF } from "@/utils/config"

export function useMchConf () {
  const { result: _appId } = useSearchParams('appId')
  const { result: _apiKey } = useSearchParams('apiKey')
  const { result: _dappAccount } = useSearchParams('dappAccount')
  const { result: _programNo } = useSearchParams('programNo')
  const { result: _verify } = useSearchParams('verify')
  const { result: _theme } = useSearchParams('theme')

  const appId = computed(() => {
    return _appId.value || DAPP_CONF.appId
  })

  const apiKey = computed(() => {
    return _apiKey.value || DAPP_CONF.apiKey
  })

  const dappAccount = computed(() => {
    return _dappAccount.value || DAPP_CONF.dappAccount
  })

  const programNo = computed(() => {
    return _programNo.value || ''
  })

  const verify = computed(() => {
    return _verify.value || 'contract'
  })

  const theme = computed(() => {
    if (['light', 'dark', 'auto'].includes(_theme.value)) {
      return _theme.value
    }
    return 'auto'
  })

  return {
    appId,
    apiKey,
    dappAccount,
    programNo,
    verify,
    theme,
  }
}

export function useVerify (connectedAddress: Ref<string>) {
  const kycStatus = ref<KycStatus>('unknown')
  const checkingApproval = ref(false)

  const needKyc = computed(() => {
    return Boolean(connectedAddress.value && kycStatus.value === 'unauthorized')
  })
  const { appId, dappAccount, verify: verifyMethod, programNo } = useMchConf()

  const verify = async (address: string) => {
    kycStatus.value = 'unknown'
    checkingApproval.value = true

    try {
      let isApproved: boolean

      if (verifyMethod.value === 'api') {
        isApproved = await extendFetch(verifyKYCWithApi(appId.value, address, programNo.value))
      } else {
        const { contract } = useContract()
        isApproved = await contract.hasApproved(
          dappAccount.value,
          address
        )
      }

      kycStatus.value = isApproved ? 'valid' : 'unauthorized'
    } catch (err) {
      console.log(err)
    }

    checkingApproval.value = false
  }

  watchEffect(async () => {
    if (connectedAddress.value) {
      verify(connectedAddress.value)
    }
  })

  return {
    verify,
    kycStatus,
    checkingApproval,
    needKyc,
  }
}
