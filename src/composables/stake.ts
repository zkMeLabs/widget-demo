import type { Ref, ShallowRef } from "vue"
import { parseEther } from 'ethers'
import type { JsonRpcSigner } from "ethers"
import type { KycStatus } from "@/types"
import { sleep } from "@/utils/common"
import { useChain } from "./wallet"

export function useStake (
  connect: () => Promise<void>,
  signer: ShallowRef<JsonRpcSigner | undefined>,
  connecting: Ref<boolean>,
  checkingApproval: Ref<boolean>,
  kycStatus: Ref<KycStatus>,
) {
  const staking = ref(false)
  const showAnimation = ref(false)
  const amount = ref('')
  const ME_STAKE_CONTRACT = '0x58c89B858b9196FF745443B19E3D2786e00d3357'

  const { cluster } = useChain()

  const stakeBtnTxt = computed(() => {
    if (!signer.value) {
      return 'Connect to a wallet'
    } else {
      return `Stake ${cluster.value.rpc.symbol}`
    }
  })

  const stake = async () => {
    if (staking.value) return
    if (!signer.value) {
      connect()
      return
    }

    if (connecting.value || checkingApproval.value || kycStatus.value === 'unknown') {
      return
    }

    if (['unauthorized', 'invalid'].includes(kycStatus.value)) {
      showAnimation.value = true
      await sleep(1000)
      showAnimation.value = false
      return
    }

    staking.value = true
    try {
      // await switchChain(cluster.value.rpc.chainId)
      const tx = await signer.value.sendTransaction({
        to: ME_STAKE_CONTRACT,
        value: parseEther(amount.value)
      })
      const txResults = await tx.wait()
      if (txResults?.status === 1) {
        console.log('success')
      }
    } finally {
      staking.value = false
    }
  }

  return {
    stake,
    staking,
    showAnimation,
    amount,
    stakeBtnTxt
  }
}
