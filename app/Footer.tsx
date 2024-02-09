import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <div className={`sticky bottom-0 z-10 p-3`}>
      <p className="text-sm text-center">&copy; {year} Service Signal</p>
    </div>
  );
};

export default Footer;
