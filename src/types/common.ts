export type TransactionRequest = {
  type: null | number
  to: string
  data: string
  chainId: string // hex string e.g. 0x1
  gasLimit: string // hex string e.g. 0x2710
  gasPrice: string // hex string e.g. 0x2710
  maxFeePerGas: string | null // hex string e.g. 0x2710
  maxPriorityFeePerGas: string | null // hex string e.g. 0x2710
}
export type KycResults = 'matching' | 'mismatch'

export type ZkMeMessageBody = {
  id?: string
  method?: 'getUserAccounts' | 'delegateTransaction' | 'signMessage'
  params?: TransactionRequest
  kycResults?: KycResults
  verifiedAddress?: string
  event?: 'close' | 'finished'
}

export type DappMessageBody = {
  id?: string
  message?: 'ok' | string
  data?: any
}

export type KycStatus = 'unknown' | 'unauthorized' | 'valid' | 'invalid'

export type SbtData = [
  thresholdKey: string,
  expirationDate: BigInt,
  data: string,
  resultSet: string[],
]

export type UserCitizenship = {
  country: string
  gender: 'F' | 'M'
}

export type Cluster = {
  rpc: {
    url: string,
    blockExplorerUrl: string
    chainId: string,
    chainName: string
    currencyName: string
    symbol: string
    decimals: number
    denom?: string
    gasPrice?: string
    batchMaxCount?: number
  },
  zkmeConfContract: string
  zkmeVerifyContract: string
  zkbtContract: string
  zkmeStandardContract?: string
  prefix?: string
}
