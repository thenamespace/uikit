import type { Meta, StoryObj } from '@storybook/react';
import { PendingTransaction, TransactionState } from './PendingTransaction';

const meta: Meta<typeof PendingTransaction> = {
  title: 'Components/PendingTransaction',
  component: PendingTransaction,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A component that displays the status of a pending blockchain transaction with visual indicators, animations, and a link to the block explorer.',
      },
    },
  },
  argTypes: {
    state: {
      control: { type: 'select' },
      options: Object.values(TransactionState),
      description: 'The current state of the transaction',
      table: {
        type: { summary: 'TransactionState' },
        defaultValue: { summary: 'InProgress' },
      },
    },
    blockExplorerUrl: {
      control: { type: 'text' },
      description: 'URL to view the transaction on a block explorer',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'https://etherscan.io/tx/...' },
      },
    },
    transactionHash: {
      control: { type: 'text' },
      description: 'Optional transaction hash to display (truncated)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    className: {
      control: { type: 'text' },
      description: 'Additional CSS class names to apply to the component',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '""' },
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PendingTransaction>;

// Default story
export const Default: Story = {
  args: {
    state: TransactionState.InProgress,
    blockExplorerUrl: 'https://etherscan.io/tx/0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
    transactionHash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
  },
};

// In Progress state
export const InProgress: Story = {
  args: {
    state: TransactionState.InProgress,
    blockExplorerUrl: 'https://etherscan.io/tx/0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
    transactionHash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows a loading spinner and pulsing animation while the transaction is being processed.',
      },
    },
  },
};

// Completed state
export const Completed: Story = {
  args: {
    state: TransactionState.Completed,
    blockExplorerUrl: 'https://etherscan.io/tx/0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
    transactionHash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows a success checkmark with a bounce animation when the transaction is completed successfully.',
      },
    },
  },
};

// Failed state
export const Failed: Story = {
  args: {
    state: TransactionState.Failed,
    blockExplorerUrl: 'https://etherscan.io/tx/0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
    transactionHash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows an error icon with a shake animation when the transaction fails.',
      },
    },
  },
};

// Without transaction hash
export const WithoutHash: Story = {
  args: {
    state: TransactionState.InProgress,
    blockExplorerUrl: 'https://etherscan.io/tx/0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
  },
  parameters: {
    docs: {
      description: {
        story: 'Component without displaying the transaction hash.',
      },
    },
  },
};

// Different block explorers
export const PolygonExplorer: Story = {
  args: {
    state: TransactionState.Completed,
    blockExplorerUrl: 'https://polygonscan.com/tx/0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
    transactionHash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
  },
  parameters: {
    docs: {
      description: {
        story: 'Example with Polygon block explorer URL.',
      },
    },
  },
};

export const ArbitrumExplorer: Story = {
  args: {
    state: TransactionState.Failed,
    blockExplorerUrl: 'https://arbiscan.io/tx/0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
    transactionHash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
  },
  parameters: {
    docs: {
      description: {
        story: 'Example with Arbitrum block explorer URL.',
      },
    },
  },
};

// All states showcase
export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center' }}>
      <div>
        <h3 style={{ marginBottom: '12px', textAlign: 'center' }}>In Progress</h3>
        <PendingTransaction
          state={TransactionState.InProgress}
          blockExplorerUrl="https://etherscan.io/tx/0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"
          transactionHash="0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"
        />
      </div>
      <div>
        <h3 style={{ marginBottom: '12px', textAlign: 'center' }}>Completed</h3>
        <PendingTransaction
          state={TransactionState.Completed}
          blockExplorerUrl="https://etherscan.io/tx/0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"
          transactionHash="0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"
        />
      </div>
      <div>
        <h3 style={{ marginBottom: '12px', textAlign: 'center' }}>Failed</h3>
        <PendingTransaction
          state={TransactionState.Failed}
          blockExplorerUrl="https://etherscan.io/tx/0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"
          transactionHash="0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Showcase of all three transaction states side by side for comparison.',
      },
    },
  },
};

// Component Documentation
export const ComponentDocs: Story = {
  render: () => (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '24px' }}>
      <h2>Component Documentation</h2>
      
      <h3>Props</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '24px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f5f5f5' }}>
            <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>Prop</th>
            <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>Type</th>
            <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>Required</th>
            <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ padding: '12px', border: '1px solid #ddd' }}><code>state</code></td>
            <td style={{ padding: '12px', border: '1px solid #ddd' }}><code>TransactionState</code></td>
            <td style={{ padding: '12px', border: '1px solid #ddd' }}>Yes</td>
            <td style={{ padding: '12px', border: '1px solid #ddd' }}>The current state of the transaction (InProgress, Completed, Failed)</td>
          </tr>
          <tr>
            <td style={{ padding: '12px', border: '1px solid #ddd' }}><code>blockExplorerUrl</code></td>
            <td style={{ padding: '12px', border: '1px solid #ddd' }}><code>string</code></td>
            <td style={{ padding: '12px', border: '1px solid #ddd' }}>Yes</td>
            <td style={{ padding: '12px', border: '1px solid #ddd' }}>URL to view the transaction on a block explorer</td>
          </tr>
          <tr>
            <td style={{ padding: '12px', border: '1px solid #ddd' }}><code>transactionHash</code></td>
            <td style={{ padding: '12px', border: '1px solid #ddd' }}><code>string</code></td>
            <td style={{ padding: '12px', border: '1px solid #ddd' }}>No</td>
            <td style={{ padding: '12px', border: '1px solid #ddd' }}>Optional transaction hash to display (will be truncated)</td>
          </tr>
          <tr>
            <td style={{ padding: '12px', border: '1px solid #ddd' }}><code>className</code></td>
            <td style={{ padding: '12px', border: '1px solid #ddd' }}><code>string</code></td>
            <td style={{ padding: '12px', border: '1px solid #ddd' }}>No</td>
            <td style={{ padding: '12px', border: '1px solid #ddd' }}>Additional CSS class names to apply to the component</td>
          </tr>
        </tbody>
      </table>

      <h3>TransactionState Enum</h3>
      <ul>
        <li><code>TransactionState.InProgress</code> - Transaction is being processed</li>
        <li><code>TransactionState.Completed</code> - Transaction completed successfully</li>
        <li><code>TransactionState.Failed</code> - Transaction failed</li>
      </ul>

      <h3>Features</h3>
      <ul>
        <li><strong>Visual States:</strong> Different icons and colors for each transaction state</li>
        <li><strong>Animations:</strong> Loading spinner, success bounce, and error shake animations</li>
        <li><strong>Responsive Design:</strong> Adapts to different screen sizes</li>
        <li><strong>Dark Theme Support:</strong> Automatically adapts to dark/light themes</li>
        <li><strong>Accessibility:</strong> Proper ARIA labels and keyboard navigation</li>
        <li><strong>Block Explorer Integration:</strong> Direct link to view transaction details</li>
      </ul>

      <h3>Usage Example</h3>
      <pre style={{ backgroundColor: '#f5f5f5', padding: '16px', borderRadius: '8px', overflow: 'auto' }}>
{`import { PendingTransaction, TransactionState } from '@namespace/ui-components';

function MyComponent() {
  return (
    <PendingTransaction
      state={TransactionState.InProgress}
      blockExplorerUrl="https://etherscan.io/tx/0x123..."
      transactionHash="0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"
    />
  );
}`}
      </pre>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complete documentation for the PendingTransaction component including props, usage examples, and features.',
      },
    },
  },
};
