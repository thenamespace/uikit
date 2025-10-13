import "./SubnameProfileCard.css";
import Icon from "../atoms/icon/Icon";
import Text from "../atoms/text/Text";
import { Button } from "../atoms";

/**
 * Card for displaying ENS profile details.
 * @param {SubnameProfileCardProps} props
 */
export interface SubnameProfileCardProps {

}

export const SubnameProfileCard = ({

}: SubnameProfileCardProps) => {
    return (
        <>
            <div className="subname-profile-card">

                <img src="https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=1932&auto=format&fit=crop" alt="Abstract background image" className="subname-profile-card-banner" />

                <div className="subname-profile-card-content">
                    <Text size="lg" className="subname-profile-card-name">sdsada.oppunk.eth</Text>

                    <div className="subname-profile-card-socials">

                        <a href="#" className="subname-profile-card-social-link" aria-label="X Profile">
                            <Icon name="x" size={20} />
                        </a>

                        <a href="#" className="subname-profile-card-social-link" aria-label="Discord Profile">
                            <Icon name="discord" size={20} />
                        </a>

                        <a href="#" className="subname-profile-card-social-link" aria-label="Website">
                            <Icon name="github" size={20} />
                        </a>

                        <a href="#" className="subname-profile-card-social-link" aria-label="GitHub Profile">
                            <Icon name="globe" size={20} />
                        </a>
                    </div>

                    <div className="subname-profile-card-stats">
                        <strong>656</strong> Followers
                        <span className="subname-profile-card-separator">•</span>
                        <strong>62</strong> Following
                    </div>
                </div>
            </div>

        </>
    );
};
