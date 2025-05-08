import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import PromptForm from '../components/PromptForm';

export default function CreatePrompt() {
  const { currentUser, loading } = useAuth();
  const navigate = useNavigate();
  
  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !currentUser) {
      navigate('/login');
    }
  }, [currentUser, loading, navigate]);
  
  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }
  
  return (
    <div className="py-8">
      <PromptForm />
    </div>
  );
}