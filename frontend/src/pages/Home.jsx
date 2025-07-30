import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="p-8 text-center">
      <h1 className="text-3xl font-bold mb-4">Senior-Junior Connect</h1>
      <p className="mb-8">Find and connect with students from colleges across India.</p>
      <Link to="/colleges" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Browse Colleges</Link>
    </div>
  );
}

export default Home; 