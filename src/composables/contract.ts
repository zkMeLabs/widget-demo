import { Contract, JsonRpcProvider } from "ethers"
import zkMeVerifyAbi from '@/utils/abi/zkmeverify.abi.json'
import { useChain } from "./wallet"

export function useContract () {
  const { cluster } = useChain()
  const rpcProvider = new JsonRpcProvider(cluster.value.rpc.url)
  const contract = new Contract(
    cluster.value.zkmeVerifyContract,
    zkMeVerifyAbi,
    rpcProvider
  )

  return {
    contract
  }
}
