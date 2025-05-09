export default function Footer() {
  return (
    <footer className='bg-background-default py-6 mt-auto'>
      <div className='container mx-auto px-4 text-center text-gray-500'>
        <p>© {new Date().getFullYear()} NeonPrompt - AI Prompt Engineering Platform</p>
      </div>
    </footer>
  );
}
