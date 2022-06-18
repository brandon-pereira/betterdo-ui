/// <reference types="vite/client" />

declare const __VERSION__: string;

declare const __SERVER_URL__: string;

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
