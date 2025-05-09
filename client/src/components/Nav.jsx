import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <nav className='bg-dark py-4 shadow-md'>
      <div className='max-w-6xl mx-auto px-4 flex justify-between items-center'> 
        <Link to='/' className='text-3xl font-bold neon-glow-pink'>NeonPrompt</Link>

        <div className='flex items-center space-x-4'>
          <Link to='/' className='neon-button'>Home</Link> 
          <Link to='/create' className='neon-button'>Create</Link>
          <Link to='/login' className='neon-button'>Login</Link>
        </div>
      </div>
    </nav>
  );
}