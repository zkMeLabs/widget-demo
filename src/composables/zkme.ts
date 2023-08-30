import type { Ref, ShallowRef } from "vue"
import type { CosmosTransactionRequest, KycResults, ZkMeMessageBody } from "@/types"
import { ZKME_POPUP_ORIGIN } from "@/utils/config"
import type { JsonRpcSigner } from "ethers"
import { is } from '@/utils/common'
import type { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { useChain } from "."
// import { switchChain } from "@/utils/eth"

type FinishedHook = (verifiedAddress: string, kycResults?: KycResults) => void

export function useZkMe (
  connect: () => Promise<void>,
  connectedAddress: Ref<string>,
  signer: ShallowRef<JsonRpcSigner | undefined>,
  signingCosmWasmClient: ShallowRef<SigningCosmWasmClient | undefined>,
) {
  const showPopup = ref(false)
  const kycResults = ref<KycResults>()
  const verifiedAddress = ref('')
  const { cluster } = useChain()

  const finishedHooks: FinishedHook[] = []
  const onFinished = (hook: FinishedHook) => {
    finishedHooks.push(hook)
  }

  const messageListener = async (ev: MessageEvent<ZkMeMessageBody>) => {
    if (ev.origin !== ZKME_POPUP_ORIGIN) {
      return
    }
    const {
      id,
      method,
      params,
      kycResults: _kycResults,
      verifiedAddress: _verifiedAddress,
      event
    } = ev.data

    if (event === 'finished' && _verifiedAddress) {
      kycResults.value = _kycResults
      verifiedAddress.value = _verifiedAddress

      finishedHooks.forEach(hook => {
        hook(_verifiedAddress, _kycResults)
      })
    } else if (event === 'close') {
      showPopup.value = false
    }

    const source = ev.source as Window

    const handleApprove = (data: any) => {
      source.postMessage({
        id,
        message: 'ok',
        data
      }, ev.origin)
    }
    const handleReject = (message: string) => {
      source.postMessage({
        id,
        message
      }, ev.origin)
    }

    if (method === 'getUserAccounts') {
      if (connectedAddress.value) {
        handleApprove([connectedAddress.value])
        //
      } else {
        try {
          await connect()
          handleApprove([connectedAddress.value])
          //
        } catch (err: any) {
          handleReject(err.message)
        }
      }
      //
    } else if (method === 'delegateTransaction') {
      const hasSigner = cluster.value.type === 'cosmos'
        ? signingCosmWasmClient.value
        : signer.value
      if (hasSigner) {
        try {
          // await switchChain(params[0].chainId)
          const txHash = is<CosmosTransactionRequest>(params, 'senderAddress')
            ? (await signingCosmWasmClient.value!.execute(
              params.senderAddress,
              params.contractAddress,
              params.msg,
              'auto'
            )).transactionHash
            : (await signer.value!.sendTransaction(params!)).hash
          handleApprove(txHash)
          //
        } catch (err: any) {
          handleReject(err.message)
        }
      } else {
        handleReject('Unauthorized')
      }
    }
  }

  window.addEventListener('message', messageListener)

  onUnmounted(() => {
    window.removeEventListener('message', messageListener)
  })

  watchEffect(async () => {
    if (connectedAddress.value) {
      showPopup.value = false
    }
  })

  return {
    onFinished,
    showPopup,
    kycResults,
    verifiedAddress,
  }
}
