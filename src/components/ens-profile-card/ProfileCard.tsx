import React from "react";
import "./ProfileCard.css";

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


            <div className="ns-profile-body">
                <span className="ns-profile-tag">Cap</span>
                <div className="ns-username-container">
                    <h2 className="ns-profile-username">{username}</h2>
                    <button className="ns-edit-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /><path d="m15 5 4 4" /></svg>
                    </button>
                </div>

                <p className="ns-profile-bio">{bio}</p>


                <div className="ns-profile-socials">
                    <button className="ns-copy-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-copy"><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></svg>
                    </button>
                    <button className="ns-copy-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                    </button>
                    <button className="ns-social-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.14 2.52 7.697 6.075 9.172l.068-.052v-2.012c-2.434.536-3.805-1.127-3.95-2.09-.14-.954-.23-1.92-.12-2.736.21-.775.98-1.554 1.76-1.966.697-.367 1.488-.52 2.38-.47-.193-.655-.386-1.583.056-2.227.674-.993 1.954-1.353 3.255-1.25.17-.008.34-.012.51-.012 1.48 0 2.87.525 3.96 1.48.91.802 1.428 2.05 1.575 3.498 1.41.053 2.68.742 3.86 1.91.31-.077.62-.163.93-.243.6-.157 1.18-.32 1.75-.5l.06-.017v-.03c-2.88-2.618-6.685-4.228-10.825-4.228z" /></svg>
                    </button>
                    <button className="ns-social-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zM15 15.5l-3.5-3.5v-4.5h1.5v4l3 3V15.5z" /></svg>
                    </button>
                    <button className="ns-social-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm3.5 13.5v-3.5h-1v2.5h-1.5v-2.5h-1v-1h3.5v1h-1v1.5h1.5v-1h1V15.5z" /></svg>
                    </button>
                </div>


                <div className="ns-profile-stats">
                    <span>{followers} Followers</span>
                    <span>•</span>
                    <span>{following} Following</span>
                    <button className="ns-follow-btn">Follow</button>
                </div>

                


                <div className="ns-profile-extra">
                    <div className="ns-extra-item">
                        <span>Owned by {ownedBy}</span>
                        <button className="ns-copy-btn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-copy"><rect width="14" height="14" x="8" y="8" rx="2" ry2 /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></svg>
                        </button>
                    </div>
                    <div className="ns-extra-item">
                        <span>Expires {expires}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                    </div>
                    <div className="ns-extra-item">
                        <span>{address}</span>
                        <a href={website} target="_blank" rel="noreferrer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><path d="M15 3h6v6" /><path d="M10 14 21 3" /></svg>
                        </a>
                    </div>
                </div>


                <div className="ns-profile-footer">
                    <div>
                        <span>{subnames} Subnames</span>
                    </div>
                    <span className="ns-footer-divider"></span>
                    <div>
                        <span>{profit} Profit</span>
                    </div>
                    <span className="ns-footer-divider"></span>
                    <div>
                        <span>{volume} Volume</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
