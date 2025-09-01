import React from 'react';

interface GithubIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export const GithubIcon: React.FC<GithubIconProps> = ({ size = 24, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M9 19C4 20.5 4 16.5 2 16M16 22V18C16.15 17.14 16.07 16.28 15.75 15.5C15.43 14.72 14.88 14.05 14.15 13.55C17.55 13.25 21 11.5 21 7C21 5.9 20.6 4.85 19.9 4.05C20.1 3.05 20.1 2 19.9 1C19.9 1 18.9 1.5 16 3.5C13.5 2.5 10.5 2.5 8 3.5C5.1 1.5 4.1 1 4.1 1C3.9 2 3.9 3.05 4.1 4.05C3.4 4.85 3 5.9 3 7C3 11.5 6.45 13.25 9.85 13.55C9.12 14.05 8.57 14.72 8.25 15.5C7.93 16.28 7.85 17.14 8 18V22"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
); 