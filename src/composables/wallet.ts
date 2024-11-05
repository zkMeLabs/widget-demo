import { BrowserProvider, formatEther, JsonRpcProvider, JsonRpcSigner } from "ethers"
import { CLUSTERS } from "@/utils/config"
import { getSigner } from "@/utils/eth"

let isFirstListen = true

const connectedAddress = ref('')
const signer = shallowRef<JsonRpcSigner>()

export function useWallet () {
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
      const _signer = await getSigner()
      connectedAddress.value = _signer.address.toLowerCase()
      signer.value = _signer
    } finally {
      connecting.value = false
    }
  }

  if (window.ethereum) {
    isFirstListen && ethereum.on('accountsChanged', (accounts) => {
      accounts = accounts.map(acc => acc.toLowerCase())

      connectedAddress.value = accounts[0] || ''
  
      if (connectedAddress.value) {
        signer.value = new JsonRpcSigner(new BrowserProvider(window.ethereum), connectedAddress.value)
      } else {
        signer.value = undefined
      }
    })

    isFirstListen && ethereum.on('chainChanged', (e) => {
      if (e !== cluster.value.rpc.chainId) {
        window.location.reload()
      } else if (connectedAddress.value) {
        signer.value = new JsonRpcSigner(new BrowserProvider(window.ethereum), connectedAddress.value)
      }
    })

    isFirstListen = false
  }

  watchEffect(async () => {
    if (signer.value) {
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

    !cid && (cid = '0x89')
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
    return CLUSTERS[chainIdAsDec.value] || CLUSTERS['7001']
  })

  const provider = computed(() => {
    return markRaw(new JsonRpcProvider(
      cluster.value!.rpc.url,
      Number(cluster.value.rpc.chainId),
      {
        staticNetwork: true,
        ...(
          cluster.value.rpc.batchMaxCount
            ? { batchMaxCount: cluster.value.rpc.batchMaxCount }
            : {}
        )
      }
    ))
  })

  return {
    chainId,
    chainIdAsDec,
    cluster,
    provider,
  }
}
