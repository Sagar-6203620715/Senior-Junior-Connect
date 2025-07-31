import { useState } from 'react';
import { FaRupeeSign, FaChalkboardTeacher, FaComments, FaSearch, FaGraduationCap } from 'react-icons/fa';

const fallbackImage = 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80';

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

  const filteredColleges = colleges.filter(college =>
    college.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <FaGraduationCap className="text-3xl text-indigo-600 mr-3" />
            <h1 className="text-3xl font-bold text-slate-800">Engineering Colleges</h1>
          </div>
          <p className="text-base text-slate-600 max-w-2xl mx-auto">
            Discover top engineering colleges with detailed information about branches, cutoffs, and placement packages
          </p>
        </div>

        {/* Search Section */}
        <div className="flex justify-center mb-8">
          <div className="relative w-full max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search for a college..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              aria-label="Search for a college"
              className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-slate-900 placeholder-slate-500 transition-all duration-200"
            />
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 text-center">
          <p className="text-sm text-slate-600">
            Showing <span className="font-semibold text-indigo-600">{filteredColleges.length}</span> colleges
          </p>
        </div>

        {/* Colleges Container */}
        <div className="flex flex-wrap -mx-3">
          {filteredColleges.length === 0 ? (
            <div className="w-full text-center py-12">
              <div className="max-w-md mx-auto">
                <FaSearch className="mx-auto h-12 w-12 text-slate-400 mb-4" />
                <h3 className="text-lg font-medium text-slate-900 mb-2">No colleges found</h3>
                <p className="text-slate-500">Try adjusting your search terms to find what you're looking for.</p>
              </div>
            </div>
          ) : (
            filteredColleges.map(college => (
              <div
                key={college.id}
                className="w-full sm:w-1/2 lg:w-1/3 px-3 mb-6"
              >
                <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group border border-slate-200 hover:border-indigo-300 transform hover:-translate-y-1 h-full">
                  {/* College Image */}
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={imgError[college.id] ? fallbackImage : college.image}
                      alt={college.name}
                      onError={() => setImgError(prev => ({ ...prev, [college.id]: true }))}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent"></div>
                    {/* College Name Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                      <h3 className="text-base font-bold text-white group-hover:text-indigo-200 transition-colors duration-200">
                        {college.name}
                      </h3>
                    </div>
                  </div>

                  {/* College Content */}
                  <div className="p-4">
                    {/* Average Package */}
                    <div className="flex items-center mb-3 p-2 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg border border-emerald-100">
                      <FaRupeeSign className="text-emerald-600 text-sm mr-2" />
                      <div>
                        <p className="text-xs text-emerald-700 font-medium">Avg Package</p>
                        <p className="text-sm font-bold text-emerald-800">{college.avgPackage}</p>
                      </div>
                    </div>

                    {/* Branches */}
                    <div className="mb-4">
                      <h4 className="text-xs font-semibold text-slate-700 mb-2 flex items-center">
                        <FaChalkboardTeacher className="mr-1.5 text-indigo-500 text-xs" />
                        Branches
                      </h4>
                      <div className="space-y-1.5">
                        {college.branches.slice(0, 2).map(branch => (
                          <div key={branch.name} className="flex justify-between items-center p-2 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-md border border-indigo-100 hover:border-indigo-200 transition-colors duration-200">
                            <span className="font-medium text-indigo-900 text-xs">{branch.name}</span>
                            <span className="text-xs text-indigo-700 font-semibold bg-indigo-100 px-2 py-0.5 rounded-full">
                              {branch.opening}-{branch.closing}
                            </span>
                          </div>
                        ))}
                        {college.branches.length > 2 && (
                          <div className="text-center py-1">
                            <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                              +{college.branches.length - 2} more
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button
                        className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 px-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 transition-all duration-200 font-semibold text-xs shadow-md hover:shadow-lg transform hover:scale-105"
                        tabIndex={0}
                        aria-label={`Know more about ${college.name}`}
                      >
                        Know More
                      </button>
                      <button
                        className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-2 px-3 rounded-lg hover:from-emerald-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1 transition-all duration-200 font-semibold text-xs shadow-md hover:shadow-lg transform hover:scale-105 flex items-center justify-center gap-1"
                        tabIndex={0}
                        aria-label={`Chat about ${college.name}`}
                      >
                        <FaComments className="text-xs" />
                        Chat
                      </button>
                    </div>
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