import type { Meta, StoryObj } from '@storybook/react';
import { ChainIcon } from './ChainIcon';

const meta: Meta<typeof ChainIcon> = {
  title: 'Atoms/Icons/ChainIcon',
  component: ChainIcon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    chain: {
      control: { type: 'select' },
      options: ['eth', 'arb', 'base', 'bitcoin', 'matic', 'op', 'sol', 'zora'],
    },
    size: {
      control: { type: 'number', min: 16, max: 64, step: 4 },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    chain: 'eth',
    size: 24,
  },
};

export const AllChains: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', padding: '20px' }}>
      {(['eth', 'arb', 'base', 'bitcoin', 'matic', 'op', 'sol', 'zora'] as const).map((chain) => (
        <div key={chain} style={{ textAlign: 'center' }}>
          <ChainIcon chain={chain} size={32} />
          <div style={{ marginTop: '8px', fontSize: '12px', textTransform: 'capitalize' }}>{chain}</div>
        </div>
      ))}
    </div>
  ),
};

export const Large: Story = {
  args: {
    chain: 'eth',
    size: 48,
  },
};

export const Small: Story = {
  args: {
    chain: 'eth',
    size: 16,
  },
}; 