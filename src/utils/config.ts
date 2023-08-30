import type { Cluster } from "@/types"

export const INFURA_KEY = import.meta.env.VITE_APP_INFURA_KEY

export const ETH_RPC = {
  url: `https://goerli.infura.io/v3/${INFURA_KEY}`,
  blockExplorerUrl: '',
  chainId: '0x5',
  chainName: "Goerli",
  currencyName: "ETH",
  symbol: "ETH",
  decimals: 18,
}

export const ZETA_TESTNET_RPC = {
  url: 'https://rpc.ankr.com/zetachain_evm_testnet',
  blockExplorerUrl: 'https://athens2.explorer.zetachain.com/',
  chainId: '0x1b59',
  chainName: "ZetaChain Athens2 Testnet",
  currencyName: "aZETA",
  symbol: "aZETA",
  decimals: 18,
}

export const POLYGON_RPC = {
  url: `https://rpc.ankr.com/polygon`,
  blockExplorerUrl: 'https://polygonscan.com',
  chainId: '0x89',
  chainName: "Polygon",
  currencyName: "MATIC",
  symbol: "MATIC",
  decimals: 18,
}

export const MUMBAI_RPC = {
  url: `https://polygon-mumbai-bor.publicnode.com`,
  blockExplorerUrl: 'https://mumbai.polygonscan.com/',
  chainId: '0x13881',
  chainName: "Mumbai",
  currencyName: "MATIC",
  symbol: "MATIC",
  decimals: 18,
}

export const SCROLL_RPC = {
  url: `https://alpha-rpc.scroll.io/l2`,
  blockExplorerUrl: 'https://blockscout.scroll.io',
  chainId: '0x82751',
  chainName: 'Scroll(testnet)',
  currencyName: 'ETH',
  symbol: 'ETH',
  decimals: 18,
}

export const BASE_RPC = {
  url: `https://developer-access-mainnet.base.org`,
  blockExplorerUrl: 'https://basescan.org',
  chainId: '0x2105',
  chainName: "Base",
  currencyName: "ETH",
  symbol: "ETH",
  decimals: 18,
}

export const MANTA_TESTNET_RPC = {
  url: `https://manta-testnet.calderachain.xyz/http`,
  blockExplorerUrl: 'https://pacific-explorer.manta.network/',
  chainId: '0x34816d',
  chainName: "Manta Testnet",
  currencyName: "ETH",
  symbol: "ETH",
  decimals: 18,
}

export const SEI_TESTNET_RPC = {
  url: 'https://rpc.wallet.atlantic-2.sei.io/',
  blockExplorerUrl: 'https://www.seiscan.app/atlantic-2/',
  chainId: 'atlantic-2',
  chainName: "Sei Testnet2",
  currencyName: "SEI",
  symbol: "SEI",
  decimals: 6,
}

export const ZKME_VERIFY_CONTRACT = '0xD231fF30102B34446035BA327ad4c596a5231cE3'

export const ZKME_VERIFY_CONTRACT_LITE = '0x342f8DdBe0016c2CAEA271BdcB22F5065adf4e0C'

export const ZKBT_CONTRACT = '0xc32d204404F33FF38Fee42394F7E671fd96314B3'

export const ZETA_TESTNET_VERIFY_CONTRACT = '0xA018F0593C1C3F62A68c3fc3B9D593961B207d96'

export const ZETA_TESTNET_VERIFY_CONTRACT_LITE = '0x49D4B960Ad11967624307Fd8C9EFC92E0a7703a3'

export const ZETA_TESTNET_ZKBT_CONTRACT = '0xf8E1973814E66BF03002862C325305A5EeF98cc1'

export const MUMBAI_ZKME_VERIFY_CONTRACT = '0xd1bB4Ac9a5864ebd521eCcCD8f459cfdF13e25b8'

export const MUMBAI_ZKME_VERIFY_CONTRACT_LITE = '0xD19e3baaD6f69dED7872f4610D2981479d2DCCE9'

export const MUMBAI_ZKBT_CONTRACT = '0xd1673ef638084042A14e45d7e63e2a47e9d14E10'

export const POLYGON_ZKME_VERIFY_CONTRACT = '0x78D247ff4543Ef08488A1127034c2cE54B12A926'

export const POLYGON_ZKME_VERIFY_CONTRACT_LITE = '0x3919BdCe285E82CDC6585979cfd71636b33A5582'

export const POLYGON_ZKBT_CONTRACT = '0x3b3364656BbB7A23133e3f26D7F6850acfaAc394'

export const SCROLL_ZKME_VERIFY_CONTRACT = '0xf8E1973814E66BF03002862C325305A5EeF98cc1'

export const SCROLL_ZKME_VERIFY_CONTRACT_LITE = '0xA018F0593C1C3F62A68c3fc3B9D593961B207d96'

export const SCROLL_ZKBT_CONTRACT = '0x270A49849E1400867a1343b4621c458d1F81190a'

export const BASE_ZKME_VERIFY_CONTRACT = '0x8c81bbc5cC9B6cdbb5c0e5DD8b9D5bfaF3575710'

export const BASE_ZKME_VERIFY_CONTRACT_LITE = '0xA5e5Ee8f388e001f4d44cCFa859CC2097Cb9fdCB'

export const BASE_ZKBT_CONTRACT = '0x5c2bfcf9c17CD53d55033769727196736CD188b3'

export const MANTA_TESTNET_ZKME_VERIFY_CONTRACT = '0xf8E1973814E66BF03002862C325305A5EeF98cc1'

export const MANTA_TESTNET_ZKME_VERIFY_CONTRACT_LITE = '0xA018F0593C1C3F62A68c3fc3B9D593961B207d96'

export const MANTA_TESTNET_ZKBT_CONTRACT = '0x270A49849E1400867a1343b4621c458d1F81190a'

export const SEI_TESTNET_ZKME_CONTRACT = 'sei1dmwr4e6k4n0dlwtkh598sxp2al3wvkvwew658r3cqx98648uqhcs7sd38d'

export const ZKME_POPUP_ORIGIN = import.meta.env.DEV
  ? 'https://localhost:5173'
  : 'https://widget.zk.me'

export const ZKME_API_URL = 'https://popupapi.zk.me'

export const NEST_API_URL = 'https://nest-api.zk.me'

export const CLUSTERS: Record<string, Cluster> = {
  '5': {
    rpc: ETH_RPC,
    zkmeConfContract: '0x2F4db08ADeE48Ce0572E31e87D9a287Ab07a7773',
    zkmeVerifyContract: ZKME_VERIFY_CONTRACT,
    zkmeVerifyContractLite: ZKME_VERIFY_CONTRACT_LITE,
    zkbtContract: ZKBT_CONTRACT,
  },
  '7001': {
    rpc: ZETA_TESTNET_RPC,
    zkmeConfContract: '0xF58De9599C57bBAD68Fea0F39b73913daFcf0976',
    zkmeVerifyContract: ZETA_TESTNET_VERIFY_CONTRACT,
    zkmeVerifyContractLite: ZETA_TESTNET_VERIFY_CONTRACT_LITE,
    zkbtContract: ZETA_TESTNET_ZKBT_CONTRACT,
  },
  '80001': {
    rpc: MUMBAI_RPC,
    zkmeConfContract: '0x287b49a2312b7AF249fF35940d73FcA90A06bAE5',
    zkmeVerifyContract: MUMBAI_ZKME_VERIFY_CONTRACT,
    zkmeVerifyContractLite: MUMBAI_ZKME_VERIFY_CONTRACT_LITE,
    zkbtContract: MUMBAI_ZKBT_CONTRACT,
  },
  '534353': {
    rpc: SCROLL_RPC,
    zkmeConfContract: '0x05551c18ecFc2c458C671F44759FE4E998a5B97b',
    zkmeVerifyContract: SCROLL_ZKME_VERIFY_CONTRACT,
    zkmeVerifyContractLite: SCROLL_ZKME_VERIFY_CONTRACT_LITE,
    zkbtContract: SCROLL_ZKBT_CONTRACT
  },
  '137' : {
    rpc: POLYGON_RPC,
    zkmeConfContract: '0x809f0FF56C0fF0C046869dEe8A4c6A943a9C6a1f',
    zkmeVerifyContract: POLYGON_ZKME_VERIFY_CONTRACT,
    zkmeVerifyContractLite: POLYGON_ZKME_VERIFY_CONTRACT_LITE,
    zkbtContract: POLYGON_ZKBT_CONTRACT,
  },
  '8453': {
    rpc: BASE_RPC,
    zkmeConfContract: '0x1E3D352CA8E843AC59FdE9AD605Ba1C57813Fa0b',
    zkmeVerifyContract: BASE_ZKME_VERIFY_CONTRACT,
    zkmeVerifyContractLite: BASE_ZKME_VERIFY_CONTRACT_LITE,
    zkbtContract: BASE_ZKBT_CONTRACT
  },
  '3441005': {
    rpc: MANTA_TESTNET_RPC,
    zkmeConfContract: '0x05551c18ecFc2c458C671F44759FE4E998a5B97b',
    zkmeVerifyContract: MANTA_TESTNET_ZKME_VERIFY_CONTRACT,
    zkmeVerifyContractLite: MANTA_TESTNET_ZKME_VERIFY_CONTRACT_LITE,
    zkbtContract: MANTA_TESTNET_ZKBT_CONTRACT
  },
  'atlantic-2': {
    rpc: SEI_TESTNET_RPC,
    zkmeConfContract: SEI_TESTNET_ZKME_CONTRACT,
    zkmeVerifyContract: SEI_TESTNET_ZKME_CONTRACT,
    zkmeVerifyContractLite: SEI_TESTNET_ZKME_CONTRACT,
    zkbtContract: SEI_TESTNET_ZKME_CONTRACT,
    type: 'cosmos'
  },
}