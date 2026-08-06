import React from 'react';
import { Link } from 'react-router-dom';

const Logo = ({size = 'md', link = true, className = ''}) => {

  const logoContent = (
    <span className={`ts-logo ts-logo-${size} ${className}`}>TalentSphhere</span>
  );

  if(link){
    return(
      <Link to="/dashboard" className="ts-logo-link">
        {logoContent}
      </Link>
    );
  }

 return logoContent;
};
export default Logo;





