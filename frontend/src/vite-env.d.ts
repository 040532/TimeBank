/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  // add more custom vars here if needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
