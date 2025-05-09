import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <nav className='bg-white shadow-sm py-4'>
      <div className='max-w-6xl mx-auto px-4 flex justify-between items-center'> 
        <Link to='/' className='font-bold text-xl text-blue-600'>Leeb_Code</Link>

        <div className='flex items-center space-x-4'>
          <Link to='/' className='text-gray-600 hover:text-gray-900'>Home</Link> 
          <Link to='/create' className='text-gray-600 hover:text-gray-900'>Create</Link>
          <Link to='/login' className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'>Login</Link>
        </div>
      </div>
    </nav>
  );
}
