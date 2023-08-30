import { BrowserProvider, Contract, JsonRpcProvider, Wallet } from "ethers";
import { useChain } from "@/composables";
import confAbi from '@/utils/abi/zkmeconf.abi.json'
import verifyAbi from '@/utils/abi/zkmeverify.abi.json'

/**
 * @param checkMetaMask Whether to check if MetaMask is installed or not, default true
 */
export async function getSigner (checkMetaMask = true) {
  if (checkMetaMask && !window.ethereum) {
    window.open('https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn')
    throw new Error('MetaMask is not installed.')
  }
  const bp = new BrowserProvider(window.ethereum)
  return bp.getSigner()
}

export async function switchChain () {
  const { cluster } = useChain()
  const {
    rpc: { url, blockExplorerUrl, chainId, chainName, currencyName, symbol, decimals }
  } = cluster.value

  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{
        chainId
      }]
    })
  } catch (error: any) {
    // This error code indicates that the chain does not yet exist, and must be added
    if (error.code === 4902 || error.code === -32603) {
      await ethereum.request({
        method: "wallet_addEthereumChain",
        params: [{
          chainId,
          chainName,
          nativeCurrency: {
            name: currencyName,
            symbol,
            decimals,
          },
          rpcUrls: [url],
          blockExplorerUrls: [blockExplorerUrl]
        }],
      })
    } else {
      throw error
    }
  }
}

export async function setQuestions (privateKey: string, dappAccount: string, questions: string[]) {
  const { cluster } = useChain()
  const wallet = new Wallet(
    privateKey,
    new JsonRpcProvider(cluster.value.rpc.url)
  )
  const contract = new Contract(
    cluster.value.zkmeConfContract,
    confAbi,
    wallet
  )
  const rp = await contract.setQuestions(dappAccount, questions)
  console.log(rp)
  rp.wait().then((r: any) => console.log('done', r))
}

export async function grantCooperator (privateKey: string, dappAccount: string) {
  const { cluster } = useChain()
  const wallet = new Wallet(
    privateKey,
    new JsonRpcProvider(cluster.value.rpc.url)
  )
  const contract = new Contract(
    cluster.value.zkmeVerifyContract,
    verifyAbi,
    wallet
  )
  const rp = await contract.grantCooperator(dappAccount)
  console.log(rp)
  rp.wait().then((r: any) => console.log('done', r))
}

export async function getQuestions (dappAccount: string) {
  const { cluster } = useChain()
  const contract = new Contract(
    cluster.value.zkmeConfContract,
    confAbi,
    new JsonRpcProvider(cluster.value.rpc.url)
  )
  const rp = await contract.getQuestions(dappAccount)
  console.log(rp)
}
