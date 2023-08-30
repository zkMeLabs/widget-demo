import type { ShallowRef } from "vue"
import { BrowserProvider, formatEther, JsonRpcSigner } from "ethers"
import { CLUSTERS, ZKME_POPUP_ORIGIN } from "@/utils/config"
import { getSigner } from "@/utils/eth"
import { getSigningCosmWasmClient } from "@sei-js/core"
import type { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { GasPrice } from '@cosmjs/stargate'
import { getOfflineSigner } from "@/utils/cosmos"

let isFirstListen = true

const connectedAddress = ref('')
const signer = shallowRef<JsonRpcSigner>()
const signingCosmWasmClient = shallowRef<SigningCosmWasmClient>()

export function useWallet (popup?: ShallowRef<HTMLIFrameElement | undefined>) {
  const connecting = ref(false)
  const balance = ref('0')

  const connBtnTxt = computed(() => {
    if (!connectedAddress.value) {
      return 'Connect to a wallet'
    }
    return connectedAddress.value.substring(0, 5) + '...' + connectedAddress.value.substring(38)
  })
  const { cluster } = useChain()

  const connect = async () => {
    if (connecting.value || connectedAddress.value) return
    connecting.value = true

    try {
      if (cluster.value.type === 'cosmos') {
        const { address, offlineSigner } = await getOfflineSigner()
  
        const _signingCosmWasmClient = await getSigningCosmWasmClient(cluster.value.rpc.url, offlineSigner, {
          gasPrice: GasPrice.fromString('0.25usei')
        })
  
        connectedAddress.value = address
        signingCosmWasmClient.value = _signingCosmWasmClient
      } else {
        // EVM
        const _signer = await getSigner()
        connectedAddress.value = _signer.address.toLowerCase()
        signer.value = _signer
      }
    } finally {
      connecting.value = false
    }
  }

  if (window.ethereum) {
    isFirstListen && window.ethereum.on('accountsChanged', (accounts) => {
      if (cluster.value.type === 'cosmos') {
        return
      }
      accounts = accounts.map(acc => acc.toLowerCase())

      popup?.value?.contentWindow?.postMessage({
        event: 'accountsChanged',
        data: accounts
      }, ZKME_POPUP_ORIGIN)
  
      connectedAddress.value = accounts[0] || ''
  
      if (connectedAddress.value) {
        signer.value = new JsonRpcSigner(new BrowserProvider(window.ethereum), connectedAddress.value)
      } else {
        signer.value = undefined
      }
    })

    isFirstListen && window.ethereum.on('chainChanged', (e) => {
      if (cluster.value.type === 'cosmos') {
        return
      }
      if (e !== cluster.value.rpc.chainId) {
        window.location.reload()
      } else if (connectedAddress.value) {
        signer.value = new JsonRpcSigner(new BrowserProvider(window.ethereum), connectedAddress.value)
      }
    })

    isFirstListen = false
  }

  watchEffect(async () => {
    if (cluster.value.type === 'cosmos') {
      if (signingCosmWasmClient.value) {
        const { amount } = await signingCosmWasmClient.value.getBalance(connectedAddress.value, 'usei')
        balance.value = (Number(amount) / Math.pow(10, 6)).toString()
      }
    } else if (signer.value) {
      try {
        const rp = await signer.value.provider.getBalance(connectedAddress.value)
        balance.value = formatEther(rp)
      } catch {
        //
      }
    }
  })

  // onUnmounted(() => {
  //   window.ethereum?.removeAllListeners()
  // })

  return {
    connect,
    connecting,
    connectedAddress,
    signer,
    signingCosmWasmClient,
    balance,
    connBtnTxt
  }
}

export function useChain () {
  const chainId = computed(() => {
    let cid: string
    const query = useRoute()?.query

    if (query) {
      cid = query.chainId as string
    } else {
      const url = new URL(location.href)
      cid = url.searchParams.get('chainId') || ''
    }

    !cid && (cid = '0x5')
    return cid.toLowerCase()
  })

  const chainIdAsDec = computed(() => {
    const c = parseInt(chainId.value).toString()
    if (c === 'NaN') {
      return chainId.value
    }
    return c
  })

  const cluster = computed(() => {
    return CLUSTERS[chainIdAsDec.value] || CLUSTERS['5']
  })

  return {
    chainId,
    chainIdAsDec,
    cluster
  }
}
