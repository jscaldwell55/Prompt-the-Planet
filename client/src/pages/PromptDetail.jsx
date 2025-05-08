import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getPromptById, votePrompt, deletePrompt } from '../services/promptService';
import { useAuth } from '../contexts/AuthContext';
import CopyButton from '../components/CopyButton';

export default function PromptDetail() {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [voting, setVoting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  
  // Fetch prompt details
  useEffect(() => {
    const fetchPrompt = async () => {
      setLoading(true);
      try {
        const data = await getPromptById(id);
        setPrompt(data);
      } catch (err) {
        console.error('Error fetching prompt:', err);
        setError('Failed to load prompt. It may have been removed or does not exist.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchPrompt();
  }, [id]);
  
  const handleVote = async (voteType) => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    
    if (voting) return;
    
    setVoting(true);
    try {
      const result = await votePrompt(id, voteType);
      setPrompt(prev => ({
        ...prev,
        upvotes: Array(result.upvotes).fill(null).map((_, i) => i.toString()),
        downvotes: Array(result.downvotes).fill(null).map((_, i) => i.toString())
      }));
    } catch (err) {
      console.error('Vote error:', err);
    } finally {
      setVoting(false);
    }
  };
  
  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this prompt?')) {
      return;
    }
    
    setDeleting(true);
    try {
      await deletePrompt(id);
      navigate('/');
    } catch (err) {
      console.error('Delete error:', err);
      setError('Failed to delete prompt.');
    } finally {
      setDeleting(false);
    }
  };
  
  if (loading) {
    return <div className="text-center py-10">Loading prompt...</div>;
  }
  
  if (error) {
    return (
      <div className="max-w-3xl mx-auto py-10">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
        <Link to="/" className="text-blue-600 hover:text-blue-800">
          &larr; Back to Home
        </Link>
      </div>
    );
  }
  
  if (!prompt) {
    return <div className="text-center py-10">Prompt not found</div>;
  }
  
  const isOwner = currentUser && prompt.user && currentUser._id === prompt.user._id;
  
  return (
    <div className="max-w-3xl mx-auto py-8">
      <Link to="/" className="text-blue-600 hover:text-blue-800 mb-6 inline-block">
        &larr; Back to Home
      </Link>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-2xl font-bold">{prompt.title}</h1>
          
          <div className="flex space-x-2">
            <CopyButton text={prompt.content} />
            
            {isOwner && (
              <div className="flex space-x-2">
                <Link 
                  to={`/edit/${prompt._id}`}
                  className="bg-blue-100 text-blue-800 hover:bg-blue-200 rounded-md px-3 py-1 text-sm"
                >
                  Edit
                </Link>
                <button
                  onClick={handleDelete}
                  className="bg-red-100 text-red-800 hover:bg-red-200 rounded-md px-3 py-1 text-sm"
                  disabled={deleting}
                >
                  {deleting ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            )}
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-md font-mono text-sm mb-6 overflow-auto">
          {prompt.content}
        </div>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {prompt.tags.map((tag, index) => (
            <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex justify-between items-center text-sm text-gray-500 border-t pt-4">
          <div>
            Posted by {prompt.user?.name || 'Anonymous'} • 
            {new Date(prompt.createdAt).toLocaleDateString()}
          </div>
          
          <div className="flex items-center space-x-2">
            <button 
              className={`p-1 ${prompt.upvotes?.includes(currentUser?._id) ? 'text-blue-600' : ''}`}
              onClick={() => handleVote('up')}
              disabled={voting}
            >
              ▲
            </button>
            
            <span className="font-bold">
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
    </div>
  );
}