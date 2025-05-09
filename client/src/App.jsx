import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import CreatePrompt from './pages/CreatePrompt';
import NotFound from './pages/NotFound';
import './index.css';

function App() {
  return (
    <Router>
      <div className='min-h-screen flex flex-col'>
        <Nav />
        <main className='flex-grow container mx-auto px-4 py-4'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/create' element={<CreatePrompt />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

