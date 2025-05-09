import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-background-default'>
      <div className='text-center'>
        <h1 className='text-8xl font-bold neon-glow mb-6'>404</h1>
        <p className='text-2xl text-gray-500 mb-8'>Page not found</p>
        <Link to='/' className='neon-button px-6 py-3'>
          Back to Home
        </Link>
      </div>
    </div>
  );
}
