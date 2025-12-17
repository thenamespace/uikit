import { createRoot } from "react-dom/client";
import "./styles/index.css";
import "@rainbow-me/rainbowkit/styles.css";
import { SelectRecordsForm, ENSNameRegistrationForm } from "./components";
import { WalletConnectProvider } from "./web3/wallet-connect";

function TestApp() {
  // This is a test app. Its not bundled as component library!!

  return (
    <div>
      <WalletConnectProvider>
        <SelectRecordsForm
        records={{ addresses: [], texts: [] }}
        onRecordsUpdated={() => {}}
      />
      <ENSNameRegistrationForm/>
      </WalletConnectProvider>

    </div>
  );
}

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(<TestApp />);
}
