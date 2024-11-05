import { Contract } from "ethers"
import zkMeVerifyAbi from '@/utils/abi/zkmeverify.abi.json'
import { useChain } from "./wallet"

export function useContract () {
  const { cluster, provider } = useChain()
  const contract = new Contract(
    cluster.value.zkmeVerifyContract,
    zkMeVerifyAbi,
    provider.value
  )

  return {
    contract
  }
}
