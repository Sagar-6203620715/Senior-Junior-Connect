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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center mb-2">
            <FaGraduationCap className="text-2xl text-blue-600 mr-2" />
            <h1 className="text-2xl font-bold text-gray-900">Engineering Colleges</h1>
          </div>
          <p className="text-sm text-gray-600 max-w-2xl mx-auto">
            Discover top engineering colleges with detailed information about branches, cutoffs, and placement packages
          </p>
        </div>

        {/* Search Section */}
        <div className="flex justify-center mb-6">
          <div className="relative w-full max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search for a college..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              aria-label="Search for a college"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-500 transition-all duration-200"
            />
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4 text-center">
          <p className="text-sm text-gray-600">
            Showing <span className="font-semibold text-blue-600">{filteredColleges.length}</span> colleges
          </p>
        </div>

        {/* Colleges Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {filteredColleges.length === 0 ? (
            <div className="col-span-full text-center py-8">
              <div className="max-w-md mx-auto">
                <FaSearch className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                <h3 className="text-base font-medium text-gray-900 mb-1">No colleges found</h3>
                <p className="text-sm text-gray-500">Try adjusting your search terms to find what you're looking for.</p>
              </div>
            </div>
          ) : (
            filteredColleges.map(college => (
              <div
                key={college.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group border border-gray-100 hover:border-blue-200"
                tabIndex={0}
                aria-label={`College card for ${college.name}`}
              >
                {/* College Image */}
                <div className="relative h-20 overflow-hidden">
                  <img
                    src={imgError[college.id] ? fallbackImage : college.image}
                    alt={college.name}
                    onError={() => setImgError(prev => ({ ...prev, [college.id]: true }))}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>

                {/* College Content */}
                <div className="p-2">
                  {/* College Name */}
                  <h3 className="text-sm font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors duration-200 line-clamp-1">
                    {college.name}
                  </h3>

                  {/* Average Package */}
                  <div className="flex items-center mb-2 p-1 bg-green-50 rounded border border-green-100">
                    <FaRupeeSign className="text-green-600 text-xs mr-1" />
                    <div>
                      <p className="text-xs text-green-700 font-medium">Avg</p>
                      <p className="text-xs font-bold text-green-800">{college.avgPackage}</p>
                    </div>
                  </div>

                  {/* Branches */}
                  <div className="mb-2">
                    <h4 className="text-xs font-semibold text-gray-700 mb-1 flex items-center">
                      <FaChalkboardTeacher className="mr-1 text-blue-500 text-xs" />
                      Branches
                    </h4>
                    <div className="space-y-0.5">
                      {college.branches.slice(0, 1).map(branch => (
                        <div key={branch.name} className="flex justify-between items-center p-1 bg-blue-50 rounded border border-blue-100">
                          <span className="font-medium text-blue-900 text-xs">{branch.name}</span>
                          <span className="text-xs text-blue-700 font-semibold">
                            {branch.opening}-{branch.closing}
                          </span>
                        </div>
                      ))}
                      {college.branches.length > 1 && (
                        <div className="text-xs text-gray-500 text-center py-0.5">
                          +{college.branches.length - 1} more
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-1">
                    <button
                      className="flex-1 bg-blue-600 text-white py-1 px-2 rounded text-xs hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all duration-200 font-semibold shadow-sm hover:shadow-md"
                      tabIndex={0}
                      aria-label={`Know more about ${college.name}`}
                    >
                      More
                    </button>
                    <button
                      className="flex-1 bg-green-600 text-white py-1 px-2 rounded text-xs hover:bg-green-700 focus:outline-none focus:ring-1 focus:ring-green-500 transition-all duration-200 font-semibold shadow-sm hover:shadow-md flex items-center justify-center"
                      tabIndex={0}
                      aria-label={`Chat about ${college.name}`}
                    >
                      <FaComments className="text-xs" />
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