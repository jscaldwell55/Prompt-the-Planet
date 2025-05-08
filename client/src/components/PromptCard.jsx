import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { votePrompt } from '../services/promptService';

export default function PromptCard({ prompt, onVote }) {
  const { currentUser } = useAuth();
  const [voting, setVoting] = useState(false);
  
  const handleVote = async (voteType) => {
    if (!currentUser) {
      // Redirect to login if not authenticated
      window.location.href = '/login';
      return;
    }
    
    if (voting) return;
    
    setVoting(true);
    try {
      const result = await votePrompt(prompt._id, voteType);
      
      // Call parent component callback with updated vote data
      if (onVote) {
        onVote(prompt._id, result);
      }
    } catch (err) {
      console.error('Vote error:', err);
    } finally {
      setVoting(false);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <Link to={`/prompt/${prompt._id}`}>
        <h2 className="text-xl font-semibold mb-2">{prompt.title}</h2>
      </Link>
      
      <div className="bg-gray-50 p-4 rounded-md font-mono text-sm mb-3 overflow-auto">
        {prompt.content}
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {prompt.tags.map((tag, index) => (
          <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
            {tag}
          </span>
        ))}
      </div>
      
      <div className="flex justify-between items-center text-sm text-gray-500">
        <div>
          Posted by {prompt.user?.name || 'Anonymous'}
        </div>
        
        <div className="flex items-center space-x-2">
          <button 
            className={`p-1 ${prompt.upvotes?.includes(currentUser?._id) ? 'text-blue-600' : ''}`}
            onClick={() => handleVote('up')}
            disabled={voting}
          >
            ▲
          </button>
          
          <span>
            {(prompt.upvotes?.length || 0) - (prompt.downvotes?.length || 0)}
          </span>
          
          <button 
            className={`p-1 ${prompt.downvotes?.includes(currentUser?._id) ? 'text-red-600' : ''}`}
            onClick={() => handleVote('down')}
            disabled={voting}
          >
            ▼
          </button>
        </div>
      </div>
    </div>
  );
}