import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import PromptCard from '../components/PromptCard';

export default function Profile() {
  const { currentUser, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [userPrompts, setUserPrompts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !currentUser) {
      navigate('/login');
    }
  }, [currentUser, authLoading, navigate]);
  
  // Fetch user's prompts
  useEffect(() => {
    const fetchUserPrompts = async () => {
      if (!currentUser) return;
      
      setLoading(true);
      try {
        const response = await api.get(`/prompts?user=${currentUser._id}`);
        setUserPrompts(response.data);
      } catch (err) {
        console.error('Error fetching user prompts:', err);
        setError('Failed to load your prompts.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserPrompts();
  }, [currentUser]);
  
  const handleVote = (promptId, voteData) => {
    // Update prompts with new vote data
    setUserPrompts(prevPrompts => 
      prevPrompts.map(prompt => 
        prompt._id === promptId
          ? { ...prompt, upvotes: voteData.upvotes, downvotes: voteData.downvotes }
          : prompt
      )
    );
  };
  
  if (authLoading || !currentUser) {
    return <div className="text-center py-10">Loading profile...</div>;
  }
  
  return (
    <div className="py-8">
      <div className="mb-8 flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200">
          {currentUser.avatar ? (
            <img 
              src={currentUser.avatar} 
              alt={currentUser.name} 
              className="w-full h-full object-cover" 
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-2xl text-gray-500">
              {currentUser.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        
        <div>
          <h1 className="text-2xl font-bold">{currentUser.name}</h1>
          <p className="text-gray-600">{currentUser.email}</p>
          
          <div className="mt-4">
            <Link 
              to="/create" 
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Create New Prompt
            </Link>
          </div>
        </div>
      </div>
      
      <div className="border-b mb-6"></div>
      
      <h2 className="text-xl font-bold mb-6">Your Prompts</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}
      
      {loading ? (
        <div className="text-center py-10">Loading your prompts...</div>
      ) : userPrompts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {userPrompts.map(prompt => (
            <PromptCard 
              key={prompt._id} 
              prompt={prompt}
              onVote={handleVote}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-gray-600 mb-4">You haven't created any prompts yet.</p>
          <Link 
            to="/create" 
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Create Your First Prompt
          </Link>
        </div>
      )}
    </div>
  );
}