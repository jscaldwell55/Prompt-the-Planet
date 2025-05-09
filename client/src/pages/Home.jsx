import { useState } from 'react';
import SearchBar from '../components/SearchBar';

export default function Home() {
  const [searchResults, setSearchResults] = useState(null);
  
  const handleSearch = (query, tags) => {
    console.log('Searching for:', query, 'with tags:', tags);
    // This will be connected to the API later
    setSearchResults({ query, tags });
  };
  
  return (
    <div className='py-8 max-w-4xl mx-auto px-4'>
      <h1 className='text-3xl font-bold mb-8 text-center'>
        Discover Powerful AI Prompts
      </h1>
      
      <p className='text-center text-gray-600 mb-8'>
        Find, share, and create high-performing prompts for AI
      </p>
      
      <SearchBar onSearch={handleSearch} />
      
      {searchResults && (
        <div className='mt-4 p-4 bg-blue-50 rounded-md'>
          <p>Search Query: {searchResults.query || 'None'}</p>
          <p>Tags: {searchResults.tags || 'None'}</p>
          <p className='mt-2 text-gray-500'>API connection coming soon!</p>
        </div>
      )}
      
      <div className='mt-12 text-center'>
        <p className='text-gray-500 mb-4'>No prompts found yet.</p>
        <a 
          href='/create' 
          className='inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
        >
          Create Your First Prompt
        </a>
      </div>
    </div>
  );
}
