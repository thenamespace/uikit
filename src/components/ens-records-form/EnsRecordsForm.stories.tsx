import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { ContenthashProtocol, EnsContenthashRecord, EnsRecords } from "@/types";
import { WalletConnect } from "@/wallet-connect";
import { EnsRecordsForm } from "./EnsRecordsForm";
import { Button, Input, Text } from "../atoms";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Address, zeroAddress } from "viem";
import axios from "axios";
import { Alert } from "../molecules";

interface ApiEnsRecords {
  texts: { key: string; value: string }[];
  addresses: { address: string; coin: number; name: string }[];
  contenthash: string;
  resolver: Address;
}

const globalResolver = "https://staging.global-resolver.namespace.ninja";

const fetchProfileForName = (name: string) => {
  return axios
    .get<ApiEnsRecords>(
      `${globalResolver}/api/v1/resolve/ens/name/${name}/profile?noCache=true`
    )
    .then(res => res.data);
};

let records: EnsRecords = {
  texts: [],
  addresses: [],
};

const updateRecords = (_records: EnsRecords) => {
  records = _records;
};

const meta: Meta<typeof EnsRecordsForm> = {
  title: "Components/EnsRecordsForm",
  component: EnsRecordsForm,
  args: {
    name: "artii.eth",
  },
};
export default meta;

type Story = StoryObj<typeof EnsRecordsForm>;

export const Default: Story = {
  render: args => {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <WalletConnect>
          <StoryComponent />
        </WalletConnect>
      </div>
    );
  },
};

const StoryComponent = () => {
  const { address, isConnected } = useAccount();
  const [initalRecords, setInitialRecords] = useState<EnsRecords>();
  const [resolver, setResolver] = useState<string>(zeroAddress);
  const [selectedName, setSelectedName] = useState<string>("");
  const [showForm, setShowForm] = useState(false);
  const [apiError, setApiError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!address) {
    return (
      <div style={{ 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center", 
        gap: "32px",
        padding: "48px 24px",
        maxWidth: "480px",
        margin: "0 auto",
        textAlign: "center",
        backgroundColor: "var(--ns-color-bg)",
        border: "1px solid var(--ns-color-border)",
        borderRadius: "var(--ns-radius-lg)",
        boxShadow: "var(--ns-shadow)"
      }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{
            width: "64px",
            height: "64px",
            backgroundColor: "var(--ns-color-bg-accent)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 16px",
            fontSize: "24px"
          }}>
            ��
          </div>
          <Text style={{ 
            fontSize: "24px", 
            fontWeight: "700", 
            marginBottom: "8px",
            color: "var(--ns-color-fg)"
          }}>
            Connect Your Wallet
          </Text>
          <Text style={{ 
            color: "var(--ns-color-muted)", 
            fontSize: "16px",
            lineHeight: "1.5",
            maxWidth: "320px"
          }}>
            Connect your wallet to manage ENS records and update your profile information
          </Text>
        </div>
        
        <div style={{ 
          width: "100%",
          maxWidth: "280px"
        }}>
          <ConnectButton />
        </div>
        
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          padding: "16px",
          backgroundColor: "var(--ns-color-bg-accent)",
          borderRadius: "var(--ns-radius-md)",
          border: "1px solid var(--ns-color-border)",
          width: "100%"
        }}>
          <Text style={{ 
            fontSize: "14px", 
            fontWeight: "600",
            color: "var(--ns-color-fg)"
          }}>
            What you can do:
          </Text>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ 
                width: "4px", 
                height: "4px", 
                backgroundColor: "var(--ns-color-primary)",
                borderRadius: "50%"
              }} />
              <Text style={{ fontSize: "13px", color: "var(--ns-color-muted)" }}>
                Update text records (description, website, etc.)
              </Text>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ 
                width: "4px", 
                height: "4px", 
                backgroundColor: "var(--ns-color-primary)",
                borderRadius: "50%"
              }} />
              <Text style={{ fontSize: "13px", color: "var(--ns-color-muted)" }}>
                Manage address records (ETH, BTC, etc.)
              </Text>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ 
                width: "4px", 
                height: "4px", 
                backgroundColor: "var(--ns-color-primary)",
                borderRadius: "50%"
              }} />
              <Text style={{ fontSize: "13px", color: "var(--ns-color-muted)" }}>
                Set content hash for decentralized websites
              </Text>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const onNameSelected = async () => {
    setIsLoading(true);
    setApiError(false);
    
    try {
      const data = await fetchProfileForName(selectedName);
      let contenthash: EnsContenthashRecord | undefined = undefined;

      if (data.contenthash && data.contenthash.length > 0) {
        const split = data.contenthash.split("://");
        if (split.length === 2) {
          const protocol = split[0] as ContenthashProtocol;
          const value = split[1];
          contenthash = {
            protocol,
            value,
          };
        }
      }

      const existingRecords: EnsRecords = {
        texts: data.texts,
        addresses: data.addresses.map(addr => {
          return { coinType: addr.coin, value: addr.address };
        }),
        contenthash,
      };
      setResolver(data.resolver);
      setInitialRecords(existingRecords);
      setShowForm(true);
    } catch (err) {
      setApiError(true);
    } finally {
      setIsLoading(false);
    }
  };

  if (!showForm) {
    return (
      <div style={{ 
        display: "flex", 
        flexDirection: "column", 
        gap: "24px",
        padding: "40px",
        maxWidth: "560px",
        margin: "0 auto",
        backgroundColor: "var(--ns-color-bg)",
        border: "1px solid var(--ns-color-border)",
        borderRadius: "var(--ns-radius-lg)",
        boxShadow: "var(--ns-shadow)"
      }}>
        <div style={{ textAlign: "center", marginBottom: "8px" }}>
          <div style={{
            width: "72px",
            height: "72px",
            backgroundColor: "var(--ns-color-bg-accent)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 20px",
            fontSize: "28px"
          }}>
            📝
          </div>
          <Text style={{ 
            fontSize: "28px", 
            fontWeight: "700", 
            marginBottom: "12px",
            color: "var(--ns-color-fg)"
          }}>
            Manage ENS Records
          </Text>
          <Text style={{ 
            color: "var(--ns-color-muted)", 
            fontSize: "16px",
            lineHeight: "1.5"
          }}>
            Enter your ENS name to view and update your profile records
          </Text>
        </div>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <Text style={{ 
              fontSize: "14px", 
              fontWeight: "600", 
              color: "var(--ns-color-fg)"
            }}>
              ENS Name
            </Text>
            <Input
              value={selectedName}
              onChange={e => setSelectedName(e.target.value)}
              placeholder="Enter your ENS name (e.g., myname.eth)"
              style={{ 
                width: "100%",
                height: "48px",
                fontSize: "16px",
                padding: "0 16px"
              }}
            />
            <Text style={{ 
              fontSize: "12px", 
              color: "var(--ns-color-muted)",
              marginTop: "4px"
            }}>
              Make sure you own this ENS name and have the correct resolver set
            </Text>
          </div>
          
          <Button
            disabled={selectedName.length < 3 || isLoading}
            onClick={() => onNameSelected()}
            style={{ 
              width: "100%",
              height: "48px",
              fontSize: "16px",
              fontWeight: "600",
              borderRadius: "var(--ns-radius-md)"
            }}
          >
            {isLoading ? "Loading Records..." : "Load Records"}
          </Button>
        </div>
        
        {apiError && (
          <Alert title="Error" variant="error">
            Failed to fetch records for name: {selectedName}. Please check the name and try again.
          </Alert>
        )}
        
        {selectedName.length > 0 && selectedName.length < 3 && (
          <Alert variant="warning">
            ENS name must be at least 3 characters long
          </Alert>
        )}
        
        {selectedName.length >= 3 && !apiError && !isLoading && (
          <Alert variant="info">
            Ready to load records for: {selectedName}
          </Alert>
        )}
      </div>
    );
  }

  return (
    <div className="row">
      <EnsRecordsForm
        name={selectedName}
        resolverAddress={resolver as Address}
        initialRecords={initalRecords}
        onCancel={() => {
          setSelectedName("");
          setShowForm(false);
          setApiError(false);
        }}
      ></EnsRecordsForm>
    </div>
  );
};
