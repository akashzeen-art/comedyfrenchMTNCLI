/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE?: string;
  readonly VITE_PRODUCT_CODE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
