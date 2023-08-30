/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_INFURA_KEY: string
  readonly VITE_APP_APP_ID: string
  readonly VITE_APP_API_KEY: string
  readonly VITE_APP_DAPP_ACCOUNT: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
