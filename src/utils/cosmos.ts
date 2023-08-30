import { COMPASS_WALLET, getCosmWasmClient } from '@sei-js/core'
import { useChain } from "@/composables"

export async function getCosmosQueryClient () {
  const { cluster } = useChain()
  return getCosmWasmClient(cluster.value.rpc.url)
}

export async function getOfflineSigner () {
  const { cluster } = useChain()

  const accounts = await COMPASS_WALLET.getAccounts(cluster.value.rpc.chainId)
  if (accounts.length === 0) {
    window.open('https://chrome.google.com/webstore/detail/compass-wallet-for-sei/anokgmphncpekkhclmingpimjmcooifb')
    throw new Error('COMPASS_WALLET is not installed.')
  }

  const offlineSigner = await COMPASS_WALLET.getOfflineSigner(cluster.value.rpc.chainId)
  if (!offlineSigner) {
    throw new Error('Failed to get offline signer.')
  }
  return {
    address: accounts[0].address,
    offlineSigner
  }
}

export async function hasApproved (dappAccount: string, user: string): Promise<boolean> {
  const { cluster } = useChain()

  const client = await getCosmosQueryClient()
  const { has_approved } = await client.queryContractSmart(
    cluster.value.zkmeVerifyContract,
    {
      has_approved: {
        cooperator: dappAccount,
        user
      }
    }
  )

  return has_approved
}
