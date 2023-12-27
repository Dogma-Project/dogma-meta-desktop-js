export const API_PATH = import.meta.env.DEV
  ? `http://localhost:${import.meta.env.VITE_SERVER_PORT}`
  : "";

declare global {
  interface Window {
    api: WebSocket;
  }
}
