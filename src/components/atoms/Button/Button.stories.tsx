import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";
import { Icon } from "../icon/Icon";

const meta: Meta<typeof Button> = {
  title: "Atoms/Button",
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile button component with support for icons, loading states, and multiple variants.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['solid', 'outline', 'ghost'],
      description: 'Visual style variant of the button',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Size of the button',
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Whether the button is in a loading state',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the button is disabled',
    },
    prefix: {
      control: false,
      description: 'Icon or component to display before the button text',
    },
  },
  args: {
    children: "Button",
  },
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Solid: Story = {
  args: {
    variant: "solid",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

export const Loading: Story = {
  args: {
    loading: true,
    children: "Loading...",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Disabled",
  },
};

// Prefix examples
export const WithPrefix: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
      <Button prefix={<Icon name="check-circle" />}>
        Success
      </Button>
      <Button prefix={<Icon name="x-circle" />} variant="outline">
        Error
      </Button>
      <Button prefix={<Icon name="alert-triangle" />} variant="ghost">
        Warning
      </Button>
      <Button prefix={<Icon name="info" />} size="sm">
        Info
      </Button>
      <Button prefix={<Icon name="globe" />} size="lg">
        Large
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Buttons with different icons as prefix elements.',
      },
    },
  },
};

export const IconOnly: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Button prefix={<Icon name="search" />} size="sm" />
      <Button prefix={<Icon name="x" />} size="md" />
      <Button prefix={<Icon name="check-circle" />} size="lg" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Icon-only buttons using only the prefix prop.',
      },
    },
  },
};

export const PrefixWithLoading: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Button prefix={<Icon name="search" />} loading>
        Loading
      </Button>
      <Button prefix={<Icon name="check-circle" />} loading variant="outline">
        Processing
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Buttons with prefix icons in loading state. The prefix is hidden during loading.',
      },
    },
  },
};

export const AllVariantsWithPrefix: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
      <Button prefix={<Icon name="globe" />} variant="solid">
        Solid
      </Button>
      <Button prefix={<Icon name="globe" />} variant="outline">
        Outline
      </Button>
      <Button prefix={<Icon name="globe" />} variant="ghost">
        Ghost
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All button variants with prefix icons.',
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
            <td style={{ padding: '12px', border: '1px solid #ddd' }}><code>children</code></td>
            <td style={{ padding: '12px', border: '1px solid #ddd' }}><code>ReactNode</code></td>
            <td style={{ padding: '12px', border: '1px solid #ddd' }}>Yes</td>
            <td style={{ padding: '12px', border: '1px solid #ddd' }}>Button text content</td>
          </tr>
          <tr>
            <td style={{ padding: '12px', border: '1px solid #ddd' }}><code>variant</code></td>
            <td style={{ padding: '12px', border: '1px solid #ddd' }}><code>'solid' | 'outline' | 'ghost'</code></td>
            <td style={{ padding: '12px', border: '1px solid #ddd' }}>No</td>
            <td style={{ padding: '12px', border: '1px solid #ddd' }}>Visual style variant (default: 'solid')</td>
          </tr>
          <tr>
            <td style={{ padding: '12px', border: '1px solid #ddd' }}><code>size</code></td>
            <td style={{ padding: '12px', border: '1px solid #ddd' }}><code>'sm' | 'md' | 'lg'</code></td>
            <td style={{ padding: '12px', border: '1px solid #ddd' }}>No</td>
            <td style={{ padding: '12px', border: '1px solid #ddd' }}>Button size (default: 'md')</td>
          </tr>
          <tr>
            <td style={{ padding: '12px', border: '1px solid #ddd' }}><code>loading</code></td>
            <td style={{ padding: '12px', border: '1px solid #ddd' }}><code>boolean</code></td>
            <td style={{ padding: '12px', border: '1px solid #ddd' }}>No</td>
            <td style={{ padding: '12px', border: '1px solid #ddd' }}>Whether the button is in loading state (default: false)</td>
          </tr>
          <tr>
            <td style={{ padding: '12px', border: '1px solid #ddd' }}><code>disabled</code></td>
            <td style={{ padding: '12px', border: '1px solid #ddd' }}><code>boolean</code></td>
            <td style={{ padding: '12px', border: '1px solid #ddd' }}>No</td>
            <td style={{ padding: '12px', border: '1px solid #ddd' }}>Whether the button is disabled</td>
          </tr>
          <tr>
            <td style={{ padding: '12px', border: '1px solid #ddd' }}><code>prefix</code></td>
            <td style={{ padding: '12px', border: '1px solid #ddd' }}><code>ReactNode</code></td>
            <td style={{ padding: '12px', border: '1px solid #ddd' }}>No</td>
            <td style={{ padding: '12px', border: '1px solid #ddd' }}>Icon or component to display before the button text</td>
          </tr>
        </tbody>
      </table>

      <h3>Features</h3>
      <ul>
        <li><strong>Icon Support:</strong> Add icons or any React component as prefix</li>
        <li><strong>Loading State:</strong> Built-in loading spinner with proper accessibility</li>
        <li><strong>Multiple Variants:</strong> Solid, outline, and ghost styles</li>
        <li><strong>Size Options:</strong> Small, medium, and large sizes</li>
        <li><strong>Accessibility:</strong> Proper ARIA attributes and keyboard navigation</li>
        <li><strong>Responsive:</strong> Adapts to different screen sizes</li>
        <li><strong>TypeScript:</strong> Full type safety and IntelliSense support</li>
      </ul>

      <h3>Usage Examples</h3>
      <pre style={{ backgroundColor: '#f5f5f5', padding: '16px', borderRadius: '8px', overflow: 'auto' }}>
{`import { Button } from '@namespace/ui-components';
import { Icon } from '@namespace/ui-components';

// Basic button
<Button>Click me</Button>

// Button with icon
<Button prefix={<Icon name="check-circle" />}>
  Success
</Button>

// Icon-only button
<Button prefix={<Icon name="search" />} />

// Loading button
<Button loading>Processing...</Button>

// Different variants
<Button variant="outline" prefix={<Icon name="info" />}>
  Info
</Button>

<Button variant="ghost" prefix={<Icon name="x" />}>
  Cancel
</Button>`}
      </pre>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complete documentation for the Button component including props, usage examples, and features.',
      },
    },
  },
};
