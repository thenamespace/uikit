import React from "react";
import "./NavbarProfileCard.css";
import Icon from "../atoms/icon/Icon";
import { Text } from "../atoms";

interface NavbarProfileCardProps {
  imageUrl: string;
  name: string;
  address: string;
  onLogout?: () => void;
}

export const NavbarProfileCard: React.FC<NavbarProfileCardProps> = ({
  imageUrl,
  name,
  address,
  onLogout,
}) => {
  return (
    <div className="ns-navbar-profile">
      <img src={imageUrl} alt={name} className="ns-navbar-profile-avatar" />
      <div className="ns-navbar-profile-info">
        <Text color="primary" size="md">
          {name}
        </Text>
        <Text color="grey" size="sm">
          {address}
        </Text>
      </div>
      <button className="ns-navbar-profile-action" onClick={onLogout}>
        <Icon name="logout" size={18} />
      </button>
    </div>
  );
};
