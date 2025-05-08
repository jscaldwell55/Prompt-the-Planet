import { useState, useEffect } from 'react';
import PromptCard from '../components/PromptCard';
import SearchBar from '../components/SearchBar';
import { getPrompts, searchPrompts } from '../services/promptService';

export default function Home() {
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchActive, setSearchActive] = useState(false);
  
  // Fetch prompts on page load
  useEffect(() => {
    fetchPrompts();
  }, []);
  
  const fetchPrompts = async () => {
    setLoading(true);
    try {
      const data = await getPrompts();
      setPrompts(data);
      setSearchActive(false);
    } catch (err) {
      console.error('Error fetching prompts:', err);
      setError('Failed to load prompts. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleSearch = async (query, tags) => {
    setLoading(true);
    try {
      const results = await searchPrompts(query, tags);
      setPrompts(results);
      setSearchActive(true);
    } catch (err) {
      console.error('Search error:', err);
      setError('Search failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleVote = (promptId, voteData) => {
    // Update prompts with new vote data
    setPrompts(prevPrompts => 
      prevPrompts.map(prompt => 
        prompt._id === promptId
          ? { ...prompt, upvotes: voteData.upvotes, downvotes: voteData.downvotes }
          : prompt
      )
    );
  };
  
  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Discover Powerful AI Prompts
      </h1>
      
      <SearchBar onSearch={handleSearch} />
      
      {searchActive && (
        <div className="mb-6 flex justify-between items-center">
          <p className="text-gray-600">
            Found {prompts.length} result{prompts.length !== 1 ? 's' : ''}
          </p>
          <button
            onClick={fetchPrompts}
            className="text-blue-600 hover:text-blue-800"
          >
            Clear search
          </button>
        </div>
      )}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}
      
      {loading ? (
        <div className="text-center py-10">Loading prompts...</div>
      ) : prompts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {prompts.map(prompt => (
            <PromptCard 
              key={prompt._id} 
              prompt={prompt}
              onVote={handleVote}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-gray-500">
          No prompts found. Be the first to create one!
        </div>
      )}
    </div>
  );
}