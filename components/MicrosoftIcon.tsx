import React from "react";

const MicrosoftIcon: React.FC<{ style?: React.CSSProperties }> = ({
  style,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    width="1em"
    height="1em"
    style={style}
  >
    <path
      fill="#F25022"
      d="M22 22H4V4h18v18z"
    />
    <path
      fill="#7FBA00"
      d="M44 22H26V4h18v18z"
    />
    <path
      fill="#00A4EF"
      d="M22 44H4V26h18v18z"
    />
    <path
      fill="#FFB900"
      d="M44 44H26V26h18v18z"
    />
  </svg>
);

export default MicrosoftIcon;
