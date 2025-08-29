import type { Meta, StoryObj } from "@storybook/react";
import { Icon } from "./Icon";

const meta: Meta<typeof Icon> = {
  title: "Atoms/Icon",
  component: Icon,
  args: {
    name: "person",
    size: 24,
    color: "currentColor",
  },
};
export default meta;

type Story = StoryObj<typeof Icon>;

export const Default: Story = {};

export const DifferentSizes: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
      <Icon name="person" size={16} />
    </div>
  ),
};

export const DifferentColors: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
      <Icon name="person" size={16} />
    </div>
  ),
};

export const CommonIcons: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
      <Icon name="person" size={16} />
    </div>
  ),
};
