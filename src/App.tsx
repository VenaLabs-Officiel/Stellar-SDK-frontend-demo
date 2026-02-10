import { useCallback } from "react";
import VenalabsStellarSDK from "@venalabs/stellar-sdk";
import "@venalabs/stellar-sdk/style.css";

function App() {
  /**
   * Token provider function called by the SDK.
   * This calls our backend endpoint which securely handles the API secret.
   */
  const getAccessToken = useCallback(async (): Promise<string> => {
    const response = await fetch("/api/venalabs-token", {
      credentials: "include", // Include cookies for session auth
    });

    if (!response.ok) {
      throw new Error(`Failed to get access token: ${response.status}`);
    }

    const data = await response.json();
    return data.accessToken;
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <header
        style={{
          padding: "16px 24px",
          borderBottom: "1px solid #333",
          backgroundColor: "#111",
          flexShrink: 0,
        }}
      >
        <h1 style={{ fontSize: "20px", fontWeight: 600 }}>
          Venalabs Stellar SDK Demo
        </h1>
        <p style={{ fontSize: "14px", color: "#888", marginTop: "4px" }}>
          Testing integration with @venalabs/stellar-sdk
        </p>
      </header>

      <main
        style={{
          flex: 1,
          padding: "24px",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <VenalabsStellarSDK
          apiKey="<API-KEY>"
          getAccessToken={getAccessToken}
          lang="fr"
          stellarNetwork="TESTNET"
          baseUrl="https://api.venalabs.com"
          minHeight="100%"
          className="flex-1"
        />
      </main>
    </div>
  );
}

export default App;
