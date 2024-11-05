import type { Cluster } from "@/types"

export const DAPP_CONF = {
  appId: import.meta.env.VITE_APP_APP_ID,
  apiKey: import.meta.env.VITE_APP_API_KEY,
  dappAccount: import.meta.env.VITE_APP_DAPP_ACCOUNT
}

export const ZKME_POPUP_ORIGIN = 'https://widget.zk.me'

export const ZKME_API_URL = 'https://popupapi.zk.me'

export const NEST_API_URL = 'https://nest-api.zk.me'

export const ZETA_TESTNET_RPC = {
  url: 'https://zetachain-athens-evm.blockpi.network/v1/rpc/public',
  blockExplorerUrl: 'https://athens3.explorer.zetachain.com',
  chainId: '0x1b59',
  chainName: "ZetaChain Athens3 Testnet",
  currencyName: "aZETA",
  symbol: "aZETA",
  decimals: 18,
}

export const POLYGON_RPC = {
  url: `https://polygon-mainnet.g.alchemy.com/v2/b4TSOgCf04YG76ABSe-DSV083MmXPieF`,
  blockExplorerUrl: 'https://polygonscan.com',
  chainId: '0x89',
  chainName: "Polygon",
  currencyName: "MATIC",
  symbol: "MATIC",
  decimals: 18,
}

export const SCROLL_RPC = {
  url: `https://sepolia-rpc.scroll.io`,
  blockExplorerUrl: 'https://sepolia-blockscout.scroll.io',
  chainId: '0x8274f',
  chainName: "Scroll Sepolia Testnet",
  currencyName: "ETH",
  symbol: "ETH",
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

export const SEI_TESTNET_RPC = {
  url: 'https://rpc.atlantic-2.seinetwork.io/',
  blockExplorerUrl: 'https://www.seiscan.app/atlantic-2/',
  chainId: 'atlantic-2',
  chainName: "Sei Testnet2",
  currencyName: "SEI",
  symbol: "SEI",
  decimals: 6,
  denom: 'usei',
  gasPrice: '0.25usei'
}

export const MANTA_RPC = {
  url: `https://pacific-rpc.manta.network/http`,
  blockExplorerUrl: 'https://pacific-explorer.manta.network',
  chainId: '0xa9',
  chainName: "Manta",
  currencyName: "ETH",
  symbol: "ETH",
  decimals: 18,
}

// export const APTOS_TESTNET_RPC = {
//   url: 'https://fullnode.testnet.aptoslabs.com/v1',
//   blockExplorerUrl: 'https://explorer.aptoslabs.com/?network=testnet',
//   chainId: 'aptos-2',
//   chainName: "Aptos Testnet",
//   currencyName: "APT",
//   symbol: "APT",
//   decimals: 8,
// }

export const NEUTRON_MAINNET_RPC = {
  url: 'https://rpc-kralum.neutron-1.neutron.org',
  blockExplorerUrl: 'https://neutron.celat.one/neutron-1',
  chainId: 'neutron-1',
  chainName: "Neutron",
  currencyName: "NTRN",
  symbol: "NTRN",
  decimals: 6,
  denom: 'untrn',
  gasPrice: '0.5untrn'
}

export const ZKFAIR_TESTNET_RPC = {
  url: 'https://testnet-rpc.zkfair.io/',
  blockExplorerUrl: 'https://testnet-scan.zkfair.io/',
  chainId: '0xab4b',
  chainName: "ZKFair Testnet",
  currencyName: "USDC",
  symbol: "USDC",
  decimals: 18,
}

export const APTOS_MAINNET_RPC = {
  url: 'https://fullnode.mainnet.aptoslabs.com/v1',
  blockExplorerUrl: 'https://explorer.aptoslabs.com/?network=mainnet',
  chainId: 'aptos-1',
  chainName: "Aptos Mainnet",
  currencyName: "APT",
  symbol: "APT",
  decimals: 8,
}

export const ETHEREUM_MAINNET_RPC = {
  url: 'https://mainnet.infura.io/v3/' + import.meta.env.VITE_APP_INFURA_KEY,
  blockExplorerUrl: 'https://etherscan.io/',
  chainId: '0x1',
  chainName: "Ethereum",
  currencyName: "ETH",
  symbol: "ETH",
  decimals: 18,
}

export const BNB_MAINNET_RPC = {
  url: `https://bsc-dataseed.bnbchain.org`,
  blockExplorerUrl: 'https://bscscan.com/',
  chainId: '0x38',
  chainName: "BNB Smart Chain",
  currencyName: "BNB",
  symbol: "BNB",
  decimals: 18,
}

export const ARBITRUM_MAINNET_RPC = {
  url: `https://arb1.arbitrum.io/rpc`,
  blockExplorerUrl: 'https://arbiscan.io',
  chainId: '0xa4b1',
  chainName: "Arbitrum",
  currencyName: "ETH",
  symbol: "ETH",
  decimals: 18,
}

export const RONIN_MAINNET_RPC = {
  url: `https://api.roninchain.com/rpc`,
  blockExplorerUrl: 'https://app.roninchain.com/',
  chainId: '0x7e4',
  chainName: "Ronin",
  currencyName: "RON",
  symbol: "RON",
  decimals: 18,
}

export const XLAYER_MAINNET_RPC = {
  url: `https://xlayerrpc.okx.com`,
  blockExplorerUrl: 'https://www.okx.com/web3/explorer/xlayer',
  chainId: '0xc4',
  chainName: "X Layer",
  currencyName: "OKB",
  symbol: "OKB",
  decimals: 18,
}

export const BOUNCEBIT_MAINNET_RPC = {
  url: 'https://fullnode-mainnet.bouncebitapi.com/',
  blockExplorerUrl: 'https://bbscan.io/',
  chainId: '0x1771',
  chainName: "BounceBit",
  currencyName: "BB",
  symbol: "BB",
  decimals: 18,
  batchMaxCount: 1
}

export const PLUME_TESTNET_RPC = {
  url: 'https://test-rpc.plumenetwork.xyz/',
  blockExplorerUrl: 'https://test-explorer.plumenetwork.xyz/',
  chainId: '0x18230',
  chainName: "Plume Testnet",
  currencyName: "ETH",
  symbol: "ETH",
  decimals: 18,
}

export const CLUSTERS: Record<string, Cluster> = {
  '7001': {
    rpc: ZETA_TESTNET_RPC,
    zkmeConfContract: '0x0a5D2102FfE7e6e4950b60D75C640f4Aa2C8F776',
    zkmeVerifyContract: '0xCBBc8A347DC5916D056c0D14dD91F4c2E0480E4D',
    zkbtContract: '0xA96a3a23E30cEcbf97766a9D1d008a2C48C0ECaF'
  },
  '534351': {
    rpc: SCROLL_RPC,
    zkmeConfContract: '0x05551c18ecFc2c458C671F44759FE4E998a5B97b',
    zkmeVerifyContract: '0xf8E1973814E66BF03002862C325305A5EeF98cc1',
    zkbtContract: '0x270A49849E1400867a1343b4621c458d1F81190a'
  },
  '137' : {
    rpc: POLYGON_RPC,
    zkmeConfContract: '0x809f0FF56C0fF0C046869dEe8A4c6A943a9C6a1f',
    zkmeVerifyContract: '0x78D247ff4543Ef08488A1127034c2cE54B12A926',
    zkbtContract: '0x3b3364656BbB7A23133e3f26D7F6850acfaAc394'
  },
  '8453': {
    rpc: BASE_RPC,
    zkmeConfContract: '0x1E3D352CA8E843AC59FdE9AD605Ba1C57813Fa0b',
    zkmeVerifyContract: '0x8c81bbc5cC9B6cdbb5c0e5DD8b9D5bfaF3575710',
    zkbtContract: '0x5c2bfcf9c17CD53d55033769727196736CD188b3'
  },
  '169': {
    rpc: MANTA_RPC,
    zkmeConfContract: '0x809f0FF56C0fF0C046869dEe8A4c6A943a9C6a1f',
    zkmeVerifyContract: '0x3919BdCe285E82CDC6585979cfd71636b33A5582',
    zkbtContract: '0x5c2bfcf9c17CD53d55033769727196736CD188b3'
  },
  '1': {
    rpc: ETHEREUM_MAINNET_RPC,
    zkmeConfContract: '0x809f0FF56C0fF0C046869dEe8A4c6A943a9C6a1f',
    zkmeVerifyContract: '0x3919BdCe285E82CDC6585979cfd71636b33A5582',
    zkbtContract: '0x5c2bfcf9c17CD53d55033769727196736CD188b3',
    zkmeStandardContract: '0x399488687fc3618FFaf1f5d0f61397c8E0360c02'
  },
  '56': {
    rpc: BNB_MAINNET_RPC,
    zkmeConfContract: '0x809f0FF56C0fF0C046869dEe8A4c6A943a9C6a1f',
    zkmeVerifyContract: '0x3919BdCe285E82CDC6585979cfd71636b33A5582',
    zkbtContract: '0x5c2bfcf9c17CD53d55033769727196736CD188b3'
  },
  '42161': {
    rpc: ARBITRUM_MAINNET_RPC,
    zkmeConfContract: '0x3919BdCe285E82CDC6585979cfd71636b33A5582',
    zkmeVerifyContract: '0x399488687fc3618FFaf1f5d0f61397c8E0360c02',
    zkbtContract: '0x1E3D352CA8E843AC59FdE9AD605Ba1C57813Fa0b',
    zkmeStandardContract: '0x8c81bbc5cC9B6cdbb5c0e5DD8b9D5bfaF3575710'
  },
  '2020': {
    rpc: RONIN_MAINNET_RPC,
    zkmeConfContract: '0x809f0FF56C0fF0C046869dEe8A4c6A943a9C6a1f',
    zkmeVerifyContract: '0x3919BdCe285E82CDC6585979cfd71636b33A5582',
    zkbtContract: '0x5c2bfcf9c17CD53d55033769727196736CD188b3'
  },
  '196': {
    rpc: XLAYER_MAINNET_RPC,
    zkmeConfContract: '0x3919BdCe285E82CDC6585979cfd71636b33A5582',
    zkmeVerifyContract: '0x399488687fc3618FFaf1f5d0f61397c8E0360c02',
    zkbtContract: '0x1E3D352CA8E843AC59FdE9AD605Ba1C57813Fa0b',
    zkmeStandardContract: '0x68De1d2aDB7f4D7118dAc4BDF068C9FA32291d6c'
  },
  '6001': {
    rpc: BOUNCEBIT_MAINNET_RPC,
    zkmeConfContract: '0x809f0FF56C0fF0C046869dEe8A4c6A943a9C6a1f',
    zkmeVerifyContract: '0x3919BdCe285E82CDC6585979cfd71636b33A5582',
    zkbtContract: '0x5c2bfcf9c17CD53d55033769727196736CD188b3',
    zkmeStandardContract: '0x399488687fc3618FFaf1f5d0f61397c8E0360c02'
  },
  '98864': {
    rpc: PLUME_TESTNET_RPC,
    zkmeConfContract: '0x4DbA6d390d7b629397b22dd183ecaebd2aADb3a2',
    zkmeVerifyContract: '0xF58De9599C57bBAD68Fea0F39b73913daFcf0976',
    zkbtContract: '0x270A49849E1400867a1343b4621c458d1F81190a',
    zkmeStandardContract: '0xAB70E932a1Ae54193a1370Bf194625B9c2f4d98d'
  },
}
