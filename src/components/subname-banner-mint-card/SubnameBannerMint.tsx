import React from 'react'
import { Icon, Text } from '../atoms';
import "./SubnameBannerMint.css";
const HandIllustration = ({ mirrored }) => {
    return (
        <div className={`subname-banner-mint-hand-illustration-container ${mirrored ? 'mirrored' : ''}`}>
            <svg width="140" height="140" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="dot-pattern" width="4.5" height="4.5" patternUnits="userSpaceOnUse">
                        <circle cx="2" cy="2" r="0.9" fill="#111827" />
                    </pattern>
                </defs>
                <path d="M140 140C140 84.7715 95.2285 40 40 40H0V140H140Z" fill="#111827" />
                <g>
                    <path d="M91.5 44C91.5 20.25 71.25 0 47.5 0H20.5C15.25 0 11 4.25 11 9.5V30.5C11 35.75 15.25 40 20.5 40H69" stroke="#111827" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="white" />
                    <path d="M47.5 0C50.5 -7 44.5 -7 47.5 0" stroke="#111827" strokeWidth="5" strokeLinecap="round" />
                    <path d="M35.5 0C38.5 -7 32.5 -7 35.5 0" stroke="#111827" strokeWidth="5" strokeLinecap="round" />
                    <path d="M23.5 0C26.5 -7 20.5 -7 23.5 0" stroke="#111827" strokeWidth="5" strokeLinecap="round" />
                    <path d="M69 40C77 37 77 47 69 44" stroke="#111827" strokeWidth="5" strokeLinecap="round" />
                </g>
                <rect x="20" y="12" width="22" height="18" fill="url(#dot-pattern)" />
            </svg>
        </div>
    );
};
export interface SubnameBannerMintProps {
}

export const SubnameBannerMint: React.FC<SubnameBannerMintProps> = (props) => {
    return (
        <div className="subname-banner-mint-page-container">
            <div className="subname-banner-mint-card">
                <Text className="subname-banner-mint-card-title">
                    Find Your <br/> Perfect Subname!
                </Text>
                <div className="subname-banner-mint-content-container">
                    <HandIllustration mirrored={false} />
                    <div className="subname-banner-mint-search-bar-wrapper">
                        <div className="subname-banner-mint-search-bar">
                            <Icon name="search" size={20} className="subname-banner-mint-search-icon" />
                            <input
                                type="text"
                                placeholder="your.subname"
                                className="subname-banner-mint-search-input"
                            />
                            <Text size="sm" className="subname-banner-mint-domain-text">nikku.eth</Text>
                            <button className="subname-banner-mint-button">
                                Mint
                            </button>
                        </div>
                    </div>
                    <HandIllustration mirrored={true} />
                </div>
            </div>
        </div>
    );
}