import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Nav from './components/Nav';
import Footer from './components/Footer';
import { AuthProvider } from './contexts/AuthContext';
import Login from './pages/Login';

// Other page components to be created
function Home() { return <div className="py-8">Home Page</div>; }
function CreatePrompt() { return <div className="py-8">Create Prompt Page</div>; }
function PromptDetail() { return <div className="py-8">Prompt Detail Page</div>; }
function Profile() { return <div className="py-8">Profile Page</div>; }
function AuthSuccess() { return <div className="py-8">Processing login...</div>; }

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Nav />
          <main className="flex-grow container mx-auto px-4 py-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/auth-success" element={<AuthSuccess />} />
              <Route path="/create" element={<CreatePrompt />} />
              <Route path="/prompt/:id" element={<PromptDetail />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;