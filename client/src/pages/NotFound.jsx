import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className='py-16 text-center'>
      <h1 className='text-6xl font-bold text-gray-900 mb-4'>404</h1>
      <p className='text-xl text-gray-600 mb-8'>Page not found</p>
      <Link to='/' className='bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700'>
        Back to Home
      </Link>
    </div>
  );
}
