import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import CollegeList from './pages/CollegeList';
import Chat from './pages/Chat';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/colleges" element={<CollegeList />} />
          <Route path="/chat/:collegeId" element={<Chat />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
