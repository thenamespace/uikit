import "./ProfileCard.css";
import Icon from "../atoms/icon/Icon";
import Text from "../atoms/text/Text";

interface ProfileCardProps {
  bannerUrl: string;
  avatarUrl: string;
  name: string;
  username: string;
  bio: string;
  address: string;
  followers: number;
  following: number;
  ownedBy: string;
  expires: string;
  records: string[];
  website?: string;
  subnames: number;
  profit: number;
  volume: number;
}

export const ProfileCard = ({
  bannerUrl,
  avatarUrl,
  name,
  username,
  bio,
  address,
  followers,
  following,
  ownedBy,
  expires,
  records,
  website,
  subnames,
  profit,
  volume,
}: ProfileCardProps) => {
  return (
    <div className="ns-profile-card">
      <div className="ns-profile-banner">
        <img src={bannerUrl} alt="banner" />
        <div className="ns-profile-avatar">
          <img src={avatarUrl} alt={name} />

          <div className="ns-avatar-badge">
            <img
              src="https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png"
              alt="chain icon"
              className="ns-avatar-badge-icon"
            />
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="ns-profile-body">
        <Text>Cap</Text>

        <div className="ns-username-container">
          <Text size="lg">{username}</Text>
          <button className="ns-edit-btn">
            <Icon name="edit" size={16} />
          </button>
        </div>

        <Text className="ns-profile-bio">{bio}</Text>

        {/* Social / Copy actions */}
        <div className="ns-profile-socials">
          <button className="ns-copy-btn">
            <Icon name="check-circle" size={16} />
          </button>
          <button className="ns-copy-btn">
            <Icon name="x" size={16} />
          </button>
          <button className="ns-social-btn">
            <Icon name="twitter" size={16} />
          </button>
          <button className="ns-social-btn">
            <Icon name="telegram" size={16} />
          </button>
          <button className="ns-social-btn">
            <Icon name="globe" size={16} />
          </button>
        </div>

        <div className="ns-profile-stats">
          <div className="ns-stats-row">
            <Text size="sm">{followers} Followers</Text>
            <Text>•</Text>
            <Text size="sm">{following} Following</Text>
            <button className="ns-follow-btn">Follow</button>
          </div>
        </div>

        {/* Extra Info */}
        <div className="ns-profile-extra">
          <div className="ns-extra-item">
            <Text size="sm">Owned by {ownedBy}</Text>
            <button className="ns-extra-btn">
              <Icon name="check-circle" size={16} />
            </button>
          </div>

          <div className="ns-extra-item">
            <Text size="sm">Expires {expires}</Text>
            <Icon name="info" size={16} />
          </div>

          <div className="ns-extra-item">
            <Text size="sm">{address}</Text>
            <Icon name="map-pin" size={16} />
          </div>

          {website && (
            <div className="ns-extra-item">
              <Text size="sm">{website}</Text>
              <a href={website} target="_blank" rel="noreferrer">
                <Icon name="globe" size={16} />
              </a>
            </div>
          )}
        </div>

        <div className="ns-profile-footer">
          <div className="ns-footer-item">
            <Text className="ns-footer-label">{subnames}</Text>
            <Text className="ns-footer-text">Subnames</Text>
          </div>

          <Text className="ns-footer-dot">•</Text>

          <div className="ns-footer-item">
            <Text className="ns-footer-label">{profit}</Text>
            <Text className="ns-footer-text">Profit</Text>
          </div>

          <Text className="ns-footer-dot">•</Text>

          <div className="ns-footer-item">
            <Text className="ns-footer-label">{volume}</Text>
            <Text className="ns-footer-text">Volume</Text>
          </div>
        </div>
      </div>
    </div>
  );
};
