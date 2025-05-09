import { useState } from 'react';

export default function CreatePrompt() {
  const [form, setForm] = useState({
    title: '',
    content: '',
    tags: '',
    complexity: '3'
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting prompt:', form);
    // This will be connected to the API later
    alert('Prompt creation will be connected to the API soon!');
  };
  
  return (
    <div className='min-h-screen flex items-center justify-center bg-background-default'>
      <div className='prompt-card p-8 w-full max-w-2xl'>
        <h1 className='text-4xl font-bold neon-glow mb-6'>Create a New Prompt</h1>
        
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div>
            <label className='block text-gray-500 text-sm font-bold mb-2' htmlFor='title'>
              Title
            </label>
            <input
              id='title'
              name='title'
              type='text'
              placeholder='A descriptive title for your prompt'
              className='w-full px-3 py-2 border border-teal-500 rounded-none focus:outline-none focus:ring-2 focus:ring-teal-500'
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>
          
          <div>
            <label className='block text-gray-500 text-sm font-bold mb-2' htmlFor='content'>
              Prompt Content
            </label>
            <textarea
              id='content'
              name='content'
              rows='8'
              placeholder='Write your prompt here...'
              className='w-full px-3 py-2 border border-teal-500 rounded-none focus:outline-none focus:ring-2 focus:ring-teal-500'
              value={form.content}
              onChange={handleChange}
              required
            />
          </div>
          
          <div>
            <label className='block text-gray-500 text-sm font-bold mb-2' htmlFor='tags'>
              Tags (comma-separated)
            </label>
            <input
              id='tags'
              name='tags'
              type='text'
              placeholder='writing, image, code, chat'
              className='w-full px-3 py-2 border border-teal-500 rounded-none focus:outline-none focus:ring-2 focus:ring-teal-500'
              value={form.tags}
              onChange={handleChange}
            />
          </div>
          
          <div>
            <label className='block text-gray-500 text-sm font-bold mb-2' htmlFor='complexity'>
              Complexity (1-5)
            </label>
            <select
              id='complexity'
              name='complexity'
              className='w-full px-3 py-2 border border-teal-500 rounded-none focus:outline-none focus:ring-2 focus:ring-teal-500'
              value={form.complexity}
              onChange={handleChange}
            >
              <option value='1'>Beginner</option>
              <option value='2'>Intermediate</option>
              <option value='3'>Advanced</option>
              <option value='4'>Expert</option>
              <option value='5'>Master</option>
            </select>
          </div>
          
          <div className='flex justify-end'>
            <button
              type='submit'
              className='neon-button px-6 py-2'
            >
              Create Prompt
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
