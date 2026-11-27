# VenaLabs Frontend SDK Demo

Demo React + Vite application showcasing the integration of [`@venalabs/stellar-sdk`](https://github.com/VenaLabs-Officiel/Stellar-SDK) 2.1.0, a React component library for VenaLabs courses with Stellar wallet support.

## Prerequisites

- Node.js 20+
- npm or yarn
- Backend running on port 8081 (see [Stellar-SDK-backend-demo](https://github.com/VenaLabs-Officiel/Stellar-SDK-backend-demo))
- An API key from the [VenaLabs dashboard](https://venalabs.com/en/saas/admin/sdk-integration)

## Setup

1. Install dependencies:

```bash
npm install
# or
yarn install
```

2. Replace the placeholder `<API-KEY>` in `src/App.tsx` with your actual API key.

## Scripts

| Command           | Description                               |
| ----------------- | ----------------------------------------- |
| `npm run dev`     | Start dev server on http://localhost:5173 |
| `npm run build`   | TypeScript check + production build       |
| `npm run preview` | Preview the production build locally      |

## Project Structure

```
src/
├── main.tsx        # React entry point
├── App.tsx         # Main component with SDK integration
└── index.css       # Global styles & SDK theme overrides
```

## SDK Integration

### Basic Usage

```tsx
import VenalabsStellarSDK from "@venalabs/stellar-sdk";
import "@venalabs/stellar-sdk/style.css";

<VenalabsStellarSDK
  apiKey="your-api-key"
  getAccessToken={async () => {
    const res = await fetch("/api/venalabs-token", { credentials: "include" });
    const data = await res.json();
    return data.token;
  }}
  lang="fr"
  stellarNetwork="TESTNET"
  baseUrl="https://api.venalabs.com"
  minHeight="100%"
/>;
```

### Component Props

| Prop                | Type                    | Required | Description                                 |
| ------------------- | ----------------------- | -------- | ------------------------------------------- |
| `apiKey`            | `string`                | Yes      | API key from the VenaLabs dashboard         |
| `getAccessToken`    | `() => Promise<string>` | Yes      | Async function that returns an access token |
| `lang`              | `'fr' \| 'en'`          | No       | UI language (default: `'en'`)               |
| `stellarNetwork`    | `'TESTNET' \| 'PUBLIC'` | No       | Stellar network to use                      |
| `baseUrl`           | `string`                | No       | Venalabs API base URL                       |
| `minHeight`         | `string \| number`      | No       | Minimum height of the SDK container         |
| `className`         | `string`                | No       | Additional CSS class for the container      |
| `externalWalletKit` | `StellarWalletsKit`     | No       | Pre-configured Stellar wallet kit instance  |
| `sorobanRpcUrl`     | `string`                | No       | Soroban RPC URL used for NFT minting        |
| `userKey`           | `string`                | No       | Signed-in user id; changing it resets the session |

The full reference is in the [SDK README](https://github.com/VenaLabs-Officiel/Stellar-SDK#props).

## Authentication Flow

```
1. SDK component mounts
   └─> calls getAccessToken()

2. Frontend fetches /api/venalabs-token
   └─> includes session cookies (credentials: 'include')

3. Vite proxy forwards to http://localhost:8081
   └─> Backend authenticates user & calls VenaLabs API with API secret

4. Backend returns { token: "..." }
   └─> SDK uses token for authenticated API requests
```

The API secret is **never exposed on the client**. The backend handles all secret-based authentication and returns a user access token, valid for 24 hours.

## Theme Customization

Override CSS custom properties in `src/index.css` to match your brand. Values use RGB triplets (without `rgb()`):

```css
:root {
  /* Primary */
  --venalabs-primary: 168 85 247;
  --venalabs-primary-hover: 147 51 234;

  /* Status */
  --venalabs-success: 34 197 94;
  --venalabs-warning: 234 179 8;
  --venalabs-error: 239 68 68;
  --venalabs-info: 59 130 246;

  /* Text */
  --venalabs-text: 255 255 255;
  --venalabs-text-muted: 156 163 175;

  /* Background */
  --venalabs-background: 17 24 39;
  --venalabs-background-card: 31 41 55;
}
```

## Proxy Configuration

The Vite dev server proxies `/api/*` requests to the backend:

```ts
// vite.config.ts
server: {
  port: 5173,
  proxy: {
    '/api': {
      target: 'http://localhost:8081',
      changeOrigin: true,
    },
  },
}
```

In production, configure your reverse proxy (Nginx, Caddy, etc.) to route `/api/*` to the backend.

## Tech Stack

- **React** 18 + **TypeScript** 5.4
- **Vite** 5.2 (dev server & build)
- **@venalabs/stellar-sdk** ^2.1.0

## License

MIT, see [LICENSE](./LICENSE).
