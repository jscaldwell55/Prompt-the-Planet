import { useState } from 'react';

export default function CreatePrompt() {
  const [form, setForm] = useState({
    title: '',
    content: '',
    tags: ''
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
    <div className='max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6 my-8'>
      <h1 className='text-2xl font-bold mb-6'>Create a New Prompt</h1>
      
      <form onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='title'>
            Title
          </label>
          <input
            id='title'
            name='title'
            type='text'
            placeholder='A descriptive title for your prompt'
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='content'>
            Prompt Content
          </label>
          <textarea
            id='content'
            name='content'
            rows='6'
            placeholder='Enter your AI prompt here...'
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono'
            value={form.content}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className='mb-6'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='tags'>
            Tags (comma separated)
          </label>
          <input
            id='tags'
            name='tags'
            type='text'
            placeholder='coding, writing, beginner, etc.'
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            value={form.tags}
            onChange={handleChange}
          />
        </div>
        
        <div className='flex justify-end'>
          <button
            type='submit'
            className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
          >
            Create Prompt
          </button>
        </div>
      </form>
    </div>
  );
}
