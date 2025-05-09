import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='footer bg-gray-900 text-white py-6 mt-12'>
      <div className='max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center'>
        <p className='text-sm mb-2 sm:mb-0'>
          © {new Date().getFullYear()} Mood Muzik. All rights reserved.
        </p>
        <div className='flex space-x-4'>
          <Link to='/terms' className='text-sm hover:underline'>
            Terms of Service
          </Link>
          <Link to='/privacy' className='text-sm hover:underline'>
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
