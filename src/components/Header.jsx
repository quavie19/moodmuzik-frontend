import React, { forwardRef } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const Header = forwardRef(({ lengthSectionRef }, ref) => {
  const handleScroll = () => {
    if (lengthSectionRef.current) {
      lengthSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className='bg--dark' ref={ref}>
      <DotLottieReact src='/title.json' loop autoplay />
      <div className='icon'>
        <button className='icon' onClick={handleScroll}>
          <i className='fa-solid fa-chevron-down fa-2xl'></i>
        </button>
      </div>
    </header>
  );
});

export default Header;
