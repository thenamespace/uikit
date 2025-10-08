import "./SubnameProfileCard.css";
import Icon from "../atoms/icon/Icon";
import Text from "../atoms/text/Text";


/**
 * Card for displaying ENS profile details.
 * @param {SubnameProfileCardProps} props
 */
export interface SubnameProfileCardProps {
    bannerUrl: string;
    name: string;
    socials?: {
        x?: string;
        discord?: string;
        github?: string;
        website?: string;
    };
    followers?: number;
    following?: number;
}


export const SubnameProfileCard = ({
    bannerUrl,
    name,
    socials = {},
    followers = 0,
    following = 0,
}: SubnameProfileCardProps) => {
    return (
        <div className="subname-profile-card">
            <img src={bannerUrl} alt="Profile banner" className="subname-profile-card-banner" />
            <div className="subname-profile-card-content">
                <Text size="lg" className="subname-profile-card-name">{name}</Text>
                <div className="subname-profile-card-socials">
                    {socials.x && (
                        <a href={socials.x} className="subname-profile-card-social-link" aria-label="X Profile" target="_blank" rel="noopener noreferrer">
                            <Icon name="x" size={20} />
                        </a>
                    )}
                    {socials.discord && (
                        <a href={socials.discord} className="subname-profile-card-social-link" aria-label="Discord Profile" target="_blank" rel="noopener noreferrer">
                            <Icon name="discord" size={20} />
                        </a>
                    )}
                    {socials.github && (
                        <a href={socials.github} className="subname-profile-card-social-link" aria-label="GitHub Profile" target="_blank" rel="noopener noreferrer">
                            <Icon name="github" size={20} />
                        </a>
                    )}
                    {socials.website && (
                        <a href={socials.website} className="subname-profile-card-social-link" aria-label="Website" target="_blank" rel="noopener noreferrer">
                            <Icon name="twitter" size={20} />
                        </a>
                    )}
                </div>
                <div className="subname-profile-card-stats">
                    <strong>{followers}</strong> Followers
                    <span className="subname-profile-card-separator">•</span>
                    <strong>{following}</strong> Following
                </div>
            </div>
        </div>
    );
};
