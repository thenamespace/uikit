import type { Meta, StoryObj } from "@storybook/react";
import { ContenthashIcon } from "./ContenthashIcon";
import { ContenthashProtocol } from "@/types";

const meta: Meta<typeof ContenthashIcon> = {
  title: "Molecules/ContenthashIcon",
  component: ContenthashIcon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    protocol: {
      control: { type: "select" },
      options: Object.values(ContenthashProtocol),
    },
    size: {
      control: { type: "number", min: 16, max: 64, step: 4 },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    protocol: ContenthashProtocol.Ipfs,
    size: 24,
  },
};

export const AllProtocols: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "16px",
        padding: "20px",
      }}
    >
      {Object.values(ContenthashProtocol).map(protocol => (
        <div key={protocol} style={{ textAlign: "center" }}>
          <ContenthashIcon protocol={protocol} size={32} />
          <div
            style={{
              marginTop: "8px",
              fontSize: "12px",
              textTransform: "capitalize",
            }}
          >
            {protocol}
          </div>
        </div>
      ))}
    </div>
  ),
};

export const Large: Story = {
  args: {
    protocol: ContenthashProtocol.Ipfs,
    size: 48,
  },
};

export const Small: Story = {
  args: {
    protocol: ContenthashProtocol.Ipfs,
    size: 16,
  },
};

export const Sizes: Story = {
  args: {
    protocol: "airwave",
    size: 20,
  },

  render: () => (
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      <div style={{ textAlign: "center" }}>
        <ContenthashIcon protocol={ContenthashProtocol.Ipfs} size={16} />
        <div style={{ marginTop: "4px", fontSize: "10px" }}>16px</div>
      </div>
      <div style={{ textAlign: "center" }}>
        <ContenthashIcon protocol={ContenthashProtocol.Ipfs} size={24} />
        <div style={{ marginTop: "4px", fontSize: "10px" }}>24px</div>
      </div>
      <div style={{ textAlign: "center" }}>
        <ContenthashIcon protocol={ContenthashProtocol.Ipfs} size={32} />
        <div style={{ marginTop: "4px", fontSize: "10px" }}>32px</div>
      </div>
      <div style={{ textAlign: "center" }}>
        <ContenthashIcon protocol={ContenthashProtocol.Ipfs} size={48} />
        <div style={{ marginTop: "4px", fontSize: "10px" }}>48px</div>
      </div>
    </div>
  ),
};
