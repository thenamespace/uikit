import type { Meta, StoryObj } from "@storybook/react";
import { SelectRecordsForm } from "./SelectRecordsForm";

const meta: Meta<typeof SelectRecordsForm> = {
  title: "Components/SelectRecordsForm",
  component: SelectRecordsForm,
  args: {
    records: {
        texts: [],
        addresses: []
    },

  },
};
export default meta;

type Story = StoryObj<typeof SelectRecordsForm>;

export const Default: Story = {};

export const DifferentSizes: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
      <SelectRecordsForm onRecordsUpdated={() => {}} records={{
        texts: [],
        addresses: []
      }}/>
    </div>
  ),
};
