import type { Ref, ShallowRef } from "vue"
import type { JsonRpcSigner } from "ethers"
import { useChain, useMchConf } from "."
import { ZkMeWidget, type Provider } from '@zkmelabs/widget'
import { getAccessToken } from "@/utils/zkme-api"

export function useZkMe (
  connect: () => Promise<void>,
  connectedAddress: Ref<string>,
  signer: ShallowRef<JsonRpcSigner | undefined>,
  searchParams?: URLSearchParams
) {
  const showPopup = ref(false)
  const { chainId } = useChain()
  const { appId, programNo, theme } = useMchConf()

  const provider: Provider = {
    getAccessToken() {
      return getAccessToken()
    },
    async getUserAccounts() {
      await connect()
      return [connectedAddress.value]
    },
    async delegateTransaction(tx) {
      return (await signer.value!.sendTransaction(tx)).hash
    },
    async signMessage(message) {
      return signer.value!.signMessage(message)
    },
  }
  const widget = shallowRef(new ZkMeWidget(
    appId.value,
    'zkMeSdkDemo',
    chainId.value,
    provider,
    {
      programNo: programNo.value,
      lv: 'zkKYC',
      searchParams,
      theme: theme.value as any
    }
  ))

  watchEffect(async () => {
    if (connectedAddress.value) {
      showPopup.value = false
    }
  })

  return {
    widget
  }
}
