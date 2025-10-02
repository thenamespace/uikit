import type { Meta, StoryObj } from "@storybook/react";
import { ProfileCard } from "./ProfileCard";

export default {
  title: "Components/ProfileCard",
  component: ProfileCard,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
# ProfileCard

A user profile card component for displaying ENS profile information, including avatar, banner, username, bio, address, stats, and social links.

## Features
- Banner and avatar
- Username, bio, and address
- Social and copy actions
- Stats and extra info
- Responsive layout
        `,
      },
    },
  },
  argTypes: {
    bannerUrl: { control: "text", description: "Banner image URL" },
    avatarUrl: { control: "text", description: "Avatar image URL" },
    name: { control: "text", description: "Full name" },
    username: { control: "text", description: "Username" },
    bio: { control: "text", description: "Profile bio" },
    address: { control: "text", description: "Wallet address" },
    followers: { control: "number", description: "Number of followers" },
    following: { control: "number", description: "Number of following" },
    ownedBy: { control: "text", description: "Owner address or name" },
    expires: { control: "text", description: "Expiry date" },
    records: { control: "object", description: "ENS records" },
    website: { control: "text", description: "Website URL" },
    subnames: { control: "number", description: "Subnames count" },
    profit: { control: "number", description: "Profit value" },
    volume: { control: "number", description: "Volume value" },
  },
} as Meta<typeof ProfileCard>;

const Template = (args: any) => <ProfileCard {...args} />;

export const Default: StoryObj<typeof ProfileCard> = {
  render: Template,
  args: {
    bannerUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    avatarUrl: "https://avatars.githubusercontent.com/u/123456?v=4",
    name: "Artii",
    username: "artii.eth",
    bio: "Web3 builder, ENS enthusiast, and open source contributor.",
    address: "0x1234567890123456789012345678901234567890",
    followers: 1200,
    following: 300,
    ownedBy: "artii.eth",
    expires: "2026-12-31",
    records: ["description", "url", "avatar"],
    website: "https://artii.eth.limo",
    subnames: 5,
    profit: 2.5,
    volume: 100,
  },
  parameters: {
    docs: {
      description: {
        story: "Default ProfileCard with sample data.",
      },
    },
  },
};

export const WithCustomData: StoryObj<typeof ProfileCard> = {
  render: Template,
  args: {
    bannerUrl: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca",
    avatarUrl: "https://avatars.githubusercontent.com/u/789012?v=4",
    name: "Jane Doe",
    username: "jane.eth",
    bio: "Decentralized identity explorer.",
    address: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd",
    followers: 800,
    following: 150,
    ownedBy: "jane.eth",
    expires: "2027-05-20",
    records: ["description", "avatar"],
    website: "https://jane.eth.limo",
    subnames: 2,
    profit: 1.2,
    volume: 50,
  },
  parameters: {
    docs: {
      description: {
        story: "ProfileCard with custom user data.",
      },
    },
  },
};
