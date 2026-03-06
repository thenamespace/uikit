import { useState } from "react";
import { Rocket } from "lucide-react";
import { CodePanel } from "../components/CodePanel";
import { CopyButton } from "../components/CopyButton";

const WAGMI_SETUP_CODE = `import "@thenamespace/ens-components/styles";
import { WagmiProvider, createConfig, http } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});

const queryClient = new QueryClient();

export function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {/* ENS components go here */}
      </QueryClientProvider>
    </WagmiProvider>
  );
}`;

const INSTALL_CMD = "npm install @thenamespace/ens-components wagmi viem @tanstack/react-query";

export function QuickStartSection() {
  const [activeStep, setActiveStep] = useState<"01" | "02">("01");

  const steps = [
    {
      num: "01",
      dark: true,
      selectable: true,
      title: "Install the package",
      desc: "Add the library alongside its peer dependencies: wagmi and viem.",
    },
    {
      num: "02",
      dark: false,
      selectable: true,
      title: "Wrap with WagmiProvider",
      desc: "Configure wagmi once at your app root and add styles.",
    },
    {
      num: "03",
      dark: false,
      selectable: false,
      title: "Import and go live",
      desc: "Drop in any component with a few props.",
    },
  ];

  return (
    <section className="section" id="quickstart">
      <div className="section-icon-row">
        <div className="section-icon-badge">
          <Rocket size={20} strokeWidth={2.2} />
        </div>
        <span className="section-icon-name">Quick Start</span>
      </div>
      <div className="steps-grid">
        {steps.map((s) => (
          <div
            key={s.num}
            className={[
              "step-card",
              s.selectable ? "step-card-selectable" : "",
              s.selectable && activeStep === s.num ? "step-card-active" : "",
            ].filter(Boolean).join(" ")}
            onClick={s.selectable ? () => setActiveStep(s.num as "01" | "02") : undefined}
          >
            <div className={`step-num ${s.dark ? "step-num-dark" : "step-num-light"}`}>
              {s.num}
            </div>
            <h3 className="step-title">{s.title}</h3>
            <p className="step-desc">{s.desc}</p>
          </div>
        ))}
      </div>
      <div className="qs-code-blocks">
        {activeStep === "01" ? (
          <div className="install-block" style={{ position: "relative" }}>
            <span className="install-prompt">$</span>
            <code>{INSTALL_CMD}</code>
            <div style={{ position: "absolute", top: 10, right: 10 }}>
              <CopyButton text={INSTALL_CMD} />
            </div>
          </div>
        ) : (
          <CodePanel title="providers.tsx" code={WAGMI_SETUP_CODE} showCopy />
        )}
      </div>
    </section>
  );
}
