import { useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import { EnsAddressRecord, EnsRecords, EnsTextRecord } from "@/types";
import { zeroAddress } from "viem";
import { EnsRecordsForm } from "./components/ens-records-form/EnsRecordsForm";
import { WalletConnect } from "./wallet-connect";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { mainnet } from "viem/chains";
import { SelectRecordsForm } from "./components/select-records-form/SelectRecordsForm";
import { ENSNameCard } from "./components";
import { ProfileCard } from "./components";

export const dummyENSNames = [
  {
    name: "neeraj.eth",
    imageUrl: "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg",
    expires: "2025-12-31",
    chainId: 1, // Ethereum Mainnet
  },
  {
    name: "nikku.eth",
    imageUrl: "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg",
    expires: "2026-03-15",
    chainId: 1, // Goerli Testnet
  },
  {
    name: "buzzify.eth",
    imageUrl: "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg",
    expires: "2025-11-10",
    chainId: 1, // Polygon
  },
  {
    name: "cryptoqueen.eth",
    imageUrl: "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg",
    expires: "2026-01-20",
    chainId: 1, // BSC
  },
  {
    name: "web3dev.eth",
    imageUrl: "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg",
    expires: "2025-10-05",
    chainId: 1, // Avalanche
  },
];

const _texts: EnsTextRecord[] = [
  {
    key: "name",
    value: "test",
  },
  {
    key: "description",
    value: "hello",
  },
];

const _addrs: EnsAddressRecord[] = [
  {
    coinType: 60,
    value: zeroAddress,
  },
];

const SEPOLIA_PUB_RES = "0x0dcD506D1Be162E50A2b434028A9a148F2686444";
const ENS_NAME = "artii.eth";
const NAME_CHAIN_ID = mainnet.id;


function TestApp() {
  const [records, setRecords] = useState<EnsRecords>({
    texts: [..._texts],
    addresses: [..._addrs],
  });

  const handleRecordsUpdated = (newRecords: EnsRecords) => {
    setRecords(newRecords);
  };

  return (
    <div>
      <WalletConnect>
        {/* <SelectRecordsForm records={records} onRecordsUpdated={(e) => setRecords(e)} />
        <EnsRecordsForm initialRecords={records} resolverAddress={SEPOLIA_PUB_RES} name={ENS_NAME} /> */}

        {/* <ENSNameCard
          name={ENS_NAME}
          imageUrl="https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE="
          expires="26/07/28"
          chainId={1}
        />

        <ENSNameCard
          name={ENS_NAME}
          imageUrl="https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE="
          expires="25/11/29"
          chainId={137}
        /> */}
        <div className="ns-page">
    
          <aside className="ns-left">
            <ProfileCard
              bannerUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoFRQjM-wM_nXMA03AGDXgJK3VeX7vtD3ctA&s"
              avatarUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoFRQjM-wM_nXMA03AGDXgJK3VeX7vtD3ctA&s"
              name="thecap.eth"
              username="thecap"
              bio="Builder, thinker, investor, optimist"
              address="0x035eB...24117D3"
              followers={1200}
              following={340}
              ownedBy="thecap.eth"
              expires="26/07/28"
              records={["0,0,0,0"]}
              website="https://thecap.eth.limo"
              subnames={3}
              profit={6}
              volume={0}
            // onFollowClick={() => console.log("Follow clicked")}
            />
          </aside>

          {/* Right ENS Section */}
          <main className="ns-right">
            <div className="ns-header">
              <div className="ns-tabs">
                <span className="active">ENS Names <span className="count">45</span></span>
                <span>Subnames <span className="count">31</span></span>
                <span>Wizard</span>
              </div>
              <div className="ns-search">
                <input type="text" placeholder="Search" />
                <button>🔲</button>
                <button>☰</button>
              </div>
            </div>

            <div className="ns-ens-grid">
              {dummyENSNames.map((ens, idx) => (
                <ENSNameCard
                  name={ens.name}
                  imageUrl={ens.imageUrl}
                  expires={ens.expires}
                  chainId={ens.chainId}
                />
              ))}
            </div>
          </main>
        </div>




        {/* <EnsRecordsForm
          name={ENS_NAME}
          resolverAddress={SEPOLIA_PUB_RES}
          chainId={NAME_CHAIN_ID}
          initialRecords={{
            texts: [{ key: "avatar", value: "testvalue" }],
            addresses: [
              {
                coinType: 60,
                value: "0x0dcD506D1Be162E50A2b434028A9a148F2686444",
              },
            ],
          }}
        />
        <ConnectButton /> */}
      </WalletConnect>
    </div>
  );
}

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(<TestApp />);
}
