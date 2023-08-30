import type { Eip1193Provider } from "ethers";

interface MetaMaskProvider extends Eip1193Provider {
  chainId: string
  on (event: 'accountsChanged', handler: (value: string[]) => void): void
  on (event: 'chainChanged', handler: (chainId: string) => void): void
  removeAllListeners (): void
}

export {}
declare global {
  const ethereum: MetaMaskProvider
  interface Window {
    ethereum: MetaMaskProvider
  }
}
