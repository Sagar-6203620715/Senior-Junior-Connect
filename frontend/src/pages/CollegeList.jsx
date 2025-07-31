import { useState, useEffect } from 'react';
import {
  FaRupeeSign,
  FaChalkboardTeacher,
  FaComments,
  FaSearch,
  FaGraduationCap,
} from 'react-icons/fa';

const fallbackImage =
  'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80';

const colleges = [
  {
    id: 2,
    name: 'IIT Delhi',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
    avgPackage: '₹21 LPA',
    branches: [
      { name: 'CSE', opening: 3, closing: 100 },
      { name: 'EE', opening: 101, closing: 400 },
      { name: 'CE', opening: 401, closing: 900 },
    ],
  },
  {
    id: 3,
    name: 'BITS Pilani',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    avgPackage: '₹18 LPA',
    branches: [
      { name: 'CSE', opening: 120, closing: 350 },
      { name: 'EEE', opening: 351, closing: 700 },
      { name: 'ME', opening: 701, closing: 1200 },
    ],
  },
  {
    id: 4,
    name: 'IIT Kanpur',
    image: 'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=400&q=80',
    avgPackage: '₹20 LPA',
    branches: [
      { name: 'CSE', opening: 10, closing: 80 },
      { name: 'EE', opening: 81, closing: 350 },
      { name: 'AE', opening: 351, closing: 900 },
    ],
  },
  {
    id: 5,
    name: 'IIT Kharagpur',
    image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3fd8?auto=format&fit=crop&w=400&q=80',
    avgPackage: '₹19 LPA',
    branches: [
      { name: 'CSE', opening: 15, closing: 90 },
      { name: 'EE', opening: 91, closing: 400 },
      { name: 'ME', opening: 401, closing: 950 },
    ],
  },
  {
    id: 6,
    name: 'IIT Madras',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
    avgPackage: '₹20 LPA',
    branches: [
      { name: 'CSE', opening: 5, closing: 70 },
      { name: 'EE', opening: 71, closing: 320 },
      { name: 'CE', opening: 321, closing: 800 },
    ],
  },
  {
    id: 7,
    name: 'IIT Roorkee',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    avgPackage: '₹17 LPA',
    branches: [
      { name: 'CSE', opening: 30, closing: 120 },
      { name: 'EE', opening: 121, closing: 500 },
      { name: 'ME', opening: 501, closing: 1100 },
    ],
  },
  {
    id: 8,
    name: 'IIT Guwahati',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    avgPackage: '₹16 LPA',
    branches: [
      { name: 'CSE', opening: 40, closing: 150 },
      { name: 'EE', opening: 151, closing: 600 },
      { name: 'ME', opening: 601, closing: 1200 },
    ],
  },
  {
    id: 9,
    name: 'NIT Trichy',
    image: 'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=400&q=80',
    avgPackage: '₹14 LPA',
    branches: [
      { name: 'CSE', opening: 100, closing: 400 },
      { name: 'EEE', opening: 401, closing: 900 },
      { name: 'ME', opening: 901, closing: 1500 },
    ],
  },
  {
    id: 10,
    name: 'NIT Surathkal',
    image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3fd8?auto=format&fit=crop&w=400&q=80',
    avgPackage: '₹13 LPA',
    branches: [
      { name: 'CSE', opening: 120, closing: 450 },
      { name: 'EEE', opening: 451, closing: 950 },
      { name: 'ME', opening: 951, closing: 1600 },
    ],
  },
  {
    id: 11,
    name: 'NIT Warangal',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
    avgPackage: '₹13 LPA',
    branches: [
      { name: 'CSE', opening: 130, closing: 470 },
      { name: 'EEE', opening: 471, closing: 970 },
      { name: 'ME', opening: 971, closing: 1700 },
    ],
  },
  {
    id: 12,
    name: 'NIT Calicut',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    avgPackage: '₹12 LPA',
    branches: [
      { name: 'CSE', opening: 140, closing: 490 },
      { name: 'EEE', opening: 491, closing: 990 },
      { name: 'ME', opening: 991, closing: 1800 },
    ],
  },
  {
    id: 13,
    name: 'NIT Rourkela',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    avgPackage: '₹12 LPA',
    branches: [
      { name: 'CSE', opening: 150, closing: 510 },
      { name: 'EEE', opening: 511, closing: 1010 },
      { name: 'ME', opening: 1011, closing: 1900 },
    ],
  },
  {
    id: 14,
    name: 'IIIT Hyderabad',
    image: 'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=400&q=80',
    avgPackage: '₹24 LPA',
    branches: [
      { name: 'CSE', opening: 20, closing: 150 },
      { name: 'ECE', opening: 151, closing: 400 },
    ],
  },
  {
    id: 15,
    name: 'IIIT Delhi',
    image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3fd8?auto=format&fit=crop&w=400&q=80',
    avgPackage: '₹18 LPA',
    branches: [
      { name: 'CSE', opening: 60, closing: 300 },
      { name: 'ECE', opening: 301, closing: 700 },
    ],
  },
  {
    id: 16,
    name: 'VIT Vellore',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
    avgPackage: '₹10 LPA',
    branches: [
      { name: 'CSE', opening: 200, closing: 800 },
      { name: 'IT', opening: 801, closing: 1500 },
      { name: 'ECE', opening: 1501, closing: 2000 },
    ],
  },
  {
    id: 17,
    name: 'SRM University',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    avgPackage: '₹8 LPA',
    branches: [
      { name: 'CSE', opening: 300, closing: 1200 },
      { name: 'IT', opening: 1201, closing: 2000 },
      { name: 'ECE', opening: 2001, closing: 2500 },
    ],
  },
  {
    id: 18,
    name: 'Manipal Institute of Technology',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    avgPackage: '₹7 LPA',
    branches: [
      { name: 'CSE', opening: 400, closing: 1500 },
      { name: 'IT', opening: 1501, closing: 2500 },
      { name: 'ECE', opening: 2501, closing: 3000 },
    ],
  },
  {
    id: 19,
    name: 'Thapar University',
    image: 'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=400&q=80',
    avgPackage: '₹6 LPA',
    branches: [
      { name: 'CSE', opening: 500, closing: 1800 },
      { name: 'IT', opening: 1801, closing: 2800 },
      { name: 'ECE', opening: 2801, closing: 3500 },
    ],
  },
  {
    id: 20,
    name: 'BITS Goa',
    image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3fd8?auto=format&fit=crop&w=400&q=80',
    avgPackage: '₹15 LPA',
    branches: [
      { name: 'CSE', opening: 220, closing: 600 },
      { name: 'EEE', opening: 601, closing: 1200 },
      { name: 'ME', opening: 1201, closing: 2000 },
    ],
  },
];

function CollegeList() {
  const [search, setSearch] = useState('');
  const [imgError, setImgError] = useState({});
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  // Track screen size for debugging
  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const filteredColleges = colleges.filter((college) =>
    college.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-10 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Debug Info - Remove this in production */}
        <div className="mb-4 p-2 bg-yellow-100 border border-yellow-300 rounded text-xs">
          <strong>Debug Info:</strong> Screen: {screenSize.width}x{screenSize.height}px | 
          Grid: {screenSize.width < 640 ? '1 col' : screenSize.width < 1024 ? '2 cols' : '3 cols'} | 
          Colleges: {filteredColleges.length}
        </div>

        {/* Header */}
        <header className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-3">
            <FaGraduationCap className="text-4xl text-indigo-700" />
            <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">
              Top Engineering Colleges
            </h1>
          </div>
          <p className="text-lg text-slate-600 max-w-xl mx-auto">
            Explore top-rated engineering institutes with details on branches, cutoffs,
            and placement statistics.
          </p>
        </header>

        {/* Search Bar */}
        <div className="flex justify-center mb-10">
          <div className="relative w-full max-w-lg">
            <FaSearch className="absolute left-3 top-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by college name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-2xl shadow focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white text-slate-800 placeholder-slate-500"
            />
          </div>
        </div>

        {/* College Count */}
        <p className="text-center text-sm text-slate-500 mb-6">
          Showing <span className="font-semibold text-indigo-600">{filteredColleges.length}</span> result(s)
        </p>

        {/* College Grid - Using explicit CSS Grid with !important */}
        <div className="college-grid">
          {filteredColleges.length === 0 ? (
            <div className="col-span-full text-center py-10">
              <FaSearch className="text-4xl text-slate-300 mb-4 mx-auto" />
              <p className="text-lg font-medium text-slate-700">No results found</p>
              <p className="text-sm text-slate-500">
                Try using a different search term.
              </p>
            </div>
          ) : (
            filteredColleges.map((college) => (
              <div
                key={college.id}
                className="bg-white rounded-2xl shadow-md border border-slate-200 hover:shadow-xl hover:border-indigo-300 transition-all overflow-hidden"
              >
                {/* College Image */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={imgError[college.id] ? fallbackImage : college.image}
                    alt={college.name}
                    onError={() =>
                      setImgError((prev) => ({ ...prev, [college.id]: true }))
                    }
                    className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                    <h2 className="text-white text-lg font-semibold tracking-wide">
                      {college.name}
                    </h2>
                  </div>
                </div>

                {/* Info Section */}
                <div className="p-4 space-y-4">
                  {/* Average Package */}
                  <div className="flex items-center bg-emerald-50 border border-emerald-100 rounded-lg px-3 py-2">
                    <FaRupeeSign className="text-emerald-600 mr-2 text-sm" />
                    <div className="text-sm text-emerald-800 font-medium">
                      Avg Package: <span className="font-bold">{college.avgPackage}</span>
                    </div>
                  </div>

                  {/* Branch List */}
                  <div>
                    <h4 className="text-xs font-semibold text-slate-700 mb-2 flex items-center gap-1">
                      <FaChalkboardTeacher className="text-indigo-500" /> Branches
                    </h4>
                    <div className="space-y-1.5">
                      {college.branches.slice(0, 2).map((branch) => (
                        <div
                          key={branch.name}
                          className="flex justify-between items-center px-3 py-1.5 bg-indigo-50 border border-indigo-100 rounded-md"
                        >
                          <span className="text-sm text-indigo-900 font-medium">{branch.name}</span>
                          <span className="text-xs bg-indigo-100 text-indigo-700 font-semibold px-2 py-0.5 rounded-full">
                            {branch.opening}-{branch.closing}
                          </span>
                        </div>
                      ))}
                      {college.branches.length > 2 && (
                        <div className="text-center">
                          <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                            +{college.branches.length - 2} more
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button className="flex-1 py-2 text-xs font-semibold rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow hover:shadow-lg transform hover:scale-[1.02]">
                      Know More
                    </button>
                    <button className="flex-1 py-2 text-xs font-semibold rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700 shadow hover:shadow-lg transform hover:scale-[1.02] flex items-center justify-center gap-1">
                      <FaComments className="text-xs" /> Chat
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default CollegeList;