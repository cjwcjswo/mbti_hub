/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  readonly VITE_ADS_ENABLED: string
  readonly VITE_ADSENSE_CLIENT_ID: string
  readonly VITE_COUPANG_ACCESS_KEY: string
  readonly VITE_COUPANG_SECRET_KEY: string
  readonly VITE_COUPANG_TAG_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare global {
  interface Window {
    adsbygoogle: any[]
  }
  
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test'
      VITE_API_BASE_URL: string
      VITE_ADS_ENABLED: string
      VITE_ADSENSE_CLIENT_ID: string
      VITE_COUPANG_ACCESS_KEY: string
      VITE_COUPANG_SECRET_KEY: string
      VITE_COUPANG_TAG_ID: string
    }
  }
  
  var process: {
    env: NodeJS.ProcessEnv
  }
}