import { useState, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  FaRupeeSign,
  FaChalkboardTeacher,
  FaComments,
  FaSearch,
  FaGraduationCap,
  FaMapMarkerAlt,
  FaStar,
  FaFilter,
  FaSort,
  FaHeart,
} from 'react-icons/fa';

const fallbackImage =
  'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80';

const colleges = [
  {
    id: 1,
    name: 'IIT Bombay',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
    avgPackage: '₹21 LPA',
    location: 'Mumbai, Maharashtra',
    rating: 4.8,
    branches: [
      { name: 'CSE', opening: 3, closing: 100 },
      { name: 'EE', opening: 101, closing: 400 },
      { name: 'CE', opening: 401, closing: 900 },
    ],
  },
  {
    id: 2,
    name: 'BITS Pilani',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    avgPackage: '₹18 LPA',
    location: 'Pilani, Rajasthan',
    rating: 4.7,
    branches: [
      { name: 'CSE', opening: 120, closing: 350 },
      { name: 'EEE', opening: 351, closing: 700 },
      { name: 'ME', opening: 701, closing: 1200 },
    ],
  },
  {
    id: 3,
    name: 'IIT Kanpur',
    image: 'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=400&q=80',
    avgPackage: '₹20 LPA',
    location: 'Kanpur, Uttar Pradesh',
    rating: 4.8,
    branches: [
      { name: 'CSE', opening: 10, closing: 80 },
      { name: 'EE', opening: 81, closing: 350 },
      { name: 'AE', opening: 351, closing: 900 },
    ],
  },
  {
    id: 4,
    name: 'IIT Kharagpur',
    image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3fd8?auto=format&fit=crop&w=400&q=80',
    avgPackage: '₹19 LPA',
    location: 'Kharagpur, West Bengal',
    rating: 4.7,
    branches: [
      { name: 'CSE', opening: 15, closing: 90 },
      { name: 'EE', opening: 91, closing: 400 },
      { name: 'ME', opening: 401, closing: 950 },
    ],
  },
  {
    id: 5,
    name: 'IIT Madras',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
    avgPackage: '₹20 LPA',
    location: 'Chennai, Tamil Nadu',
    rating: 4.8,
    branches: [
      { name: 'CSE', opening: 5, closing: 70 },
      { name: 'EE', opening: 71, closing: 320 },
      { name: 'CE', opening: 321, closing: 800 },
    ],
  },
  {
    id: 6,
    name: 'IIT Roorkee',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    avgPackage: '₹17 LPA',
    location: 'Roorkee, Uttarakhand',
    rating: 4.6,
    branches: [
      { name: 'CSE', opening: 30, closing: 120 },
      { name: 'EE', opening: 121, closing: 500 },
      { name: 'ME', opening: 501, closing: 1100 },
    ],
  },
  {
    id: 7,
    name: 'IIT Guwahati',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    avgPackage: '₹16 LPA',
    location: 'Guwahati, Assam',
    rating: 4.5,
    branches: [
      { name: 'CSE', opening: 40, closing: 150 },
      { name: 'EE', opening: 151, closing: 600 },
      { name: 'ME', opening: 601, closing: 1200 },
    ],
  },
  {
    id: 8,
    name: 'NIT Trichy',
    image: 'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=400&q=80',
    avgPackage: '₹14 LPA',
    location: 'Tiruchirappalli, Tamil Nadu',
    rating: 4.4,
    branches: [
      { name: 'CSE', opening: 100, closing: 400 },
      { name: 'EEE', opening: 401, closing: 900 },
      { name: 'ME', opening: 901, closing: 1500 },
    ],
  },
  {
    id: 9,
    name: 'NIT Surathkal',
    image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3fd8?auto=format&fit=crop&w=400&q=80',
    avgPackage: '₹13 LPA',
    location: 'Mangalore, Karnataka',
    rating: 4.3,
    branches: [
      { name: 'CSE', opening: 120, closing: 450 },
      { name: 'EEE', opening: 451, closing: 950 },
      { name: 'ME', opening: 951, closing: 1600 },
    ],
  },
  {
    id: 10,
    name: 'NIT Warangal',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
    avgPackage: '₹13 LPA',
    location: 'Warangal, Telangana',
    rating: 4.3,
    branches: [
      { name: 'CSE', opening: 130, closing: 470 },
      { name: 'EEE', opening: 471, closing: 970 },
      { name: 'ME', opening: 971, closing: 1700 },
    ],
  },
  {
    id: 11,
    name: 'NIT Calicut',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    avgPackage: '₹12 LPA',
    location: 'Kozhikode, Kerala',
    rating: 4.2,
    branches: [
      { name: 'CSE', opening: 140, closing: 490 },
      { name: 'EEE', opening: 491, closing: 990 },
      { name: 'ME', opening: 991, closing: 1800 },
    ],
  },
  {
    id: 12,
    name: 'NIT Rourkela',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    avgPackage: '₹12 LPA',
    location: 'Rourkela, Odisha',
    rating: 4.2,
    branches: [
      { name: 'CSE', opening: 150, closing: 510 },
      { name: 'EEE', opening: 511, closing: 1010 },
      { name: 'ME', opening: 1011, closing: 1900 },
    ],
  },
  {
    id: 13,
    name: 'IIIT Hyderabad',
    image: 'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=400&q=80',
    avgPackage: '₹24 LPA',
    location: 'Hyderabad, Telangana',
    rating: 4.9,
    branches: [
      { name: 'CSE', opening: 20, closing: 150 },
      { name: 'ECE', opening: 151, closing: 400 },
    ],
  },
  {
    id: 14,
    name: 'IIIT Delhi',
    image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3fd8?auto=format&fit=crop&w=400&q=80',
    avgPackage: '₹18 LPA',
    location: 'New Delhi',
    rating: 4.6,
    branches: [
      { name: 'CSE', opening: 60, closing: 300 },
      { name: 'ECE', opening: 301, closing: 700 },
    ],
  },
  {
    id: 15,
    name: 'VIT Vellore',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
    avgPackage: '₹10 LPA',
    location: 'Vellore, Tamil Nadu',
    rating: 4.1,
    branches: [
      { name: 'CSE', opening: 200, closing: 800 },
      { name: 'IT', opening: 801, closing: 1500 },
      { name: 'ECE', opening: 1501, closing: 2000 },
    ],
  },
  {
    id: 16,
    name: 'SRM University',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    avgPackage: '₹8 LPA',
    location: 'Chennai, Tamil Nadu',
    rating: 4.0,
    branches: [
      { name: 'CSE', opening: 300, closing: 1200 },
      { name: 'IT', opening: 1201, closing: 2000 },
      { name: 'ECE', opening: 2001, closing: 2500 },
    ],
  },
  {
    id: 17,
    name: 'Manipal Institute of Technology',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    avgPackage: '₹7 LPA',
    location: 'Manipal, Karnataka',
    rating: 4.0,
    branches: [
      { name: 'CSE', opening: 400, closing: 1500 },
      { name: 'IT', opening: 1501, closing: 2500 },
      { name: 'ECE', opening: 2501, closing: 3000 },
    ],
  },
  {
    id: 18,
    name: 'Thapar University',
    image: 'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=400&q=80',
    avgPackage: '₹6 LPA',
    location: 'Patiala, Punjab',
    rating: 3.9,
    branches: [
      { name: 'CSE', opening: 500, closing: 1800 },
      { name: 'IT', opening: 1801, closing: 2800 },
      { name: 'ECE', opening: 2801, closing: 3500 },
    ],
  },
  {
    id: 19,
    name: 'BITS Goa',
    image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3fd8?auto=format&fit=crop&w=400&q=80',
    avgPackage: '₹15 LPA',
    location: 'Goa',
    rating: 4.5,
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

  const filteredColleges = useMemo(() => 
    colleges.filter((college) =>
      college.name.toLowerCase().includes(search.toLowerCase().trim())
    ), [search]
  );

  const handleImageError = useCallback((collegeId) => {
    setImgError((prev) => ({ ...prev, [collegeId]: true }));
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-accent-50">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 left-10 w-2 h-2 bg-primary-400 rounded-full"></div>
          <div className="absolute top-20 right-20 w-1 h-1 bg-accent-400 rounded-full"></div>
          <div className="absolute bottom-10 left-1/4 w-1.5 h-1.5 bg-primary-400 rounded-full"></div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary-400/10 rounded-full blur-xl animate-pulse-slow"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-accent-400/10 rounded-full blur-2xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-primary-400/10 rounded-full blur-xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>

      <div className="relative z-10 py-10 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Header */}
          <header className="text-center mb-12 animate-fade-in-up">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="relative group">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-500">
                  <FaGraduationCap className="text-white text-2xl" />
                </div>
                <div className="absolute -inset-2 bg-gradient-to-r from-primary-400/20 to-primary-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <h1 className="heading-responsive font-bold text-gray-900 tracking-tight">
                Top Engineering Colleges
              </h1>
            </div>
            <p className="text-responsive text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Explore top-rated engineering institutes with details on branches, cutoffs,
              and placement statistics.
            </p>
          </header>

          {/* Enhanced Search and Filter Section */}
          <div className="mb-12 animate-fade-in-up">
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-center">
              {/* Enhanced Search Bar */}
              <div className="relative w-full max-w-lg group">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-primary-500 transition-colors duration-300" />
                <input
                  type="text"
                  placeholder="Search by college name..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  aria-label="Search colleges"
                  className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl shadow-lg focus:ring-2 focus:ring-primary-500 focus:outline-none bg-white/80 backdrop-blur-sm text-gray-800 placeholder-gray-500 transition-all duration-300 group-hover:shadow-xl"
                />
              </div>

              {/* Filter and Sort Buttons */}
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-6 py-4 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <FaFilter className="text-gray-600 group-hover:text-primary-500 transition-colors duration-300" />
                  <span className="font-medium text-gray-700">Filter</span>
                </button>
                <button className="flex items-center gap-2 px-6 py-4 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <FaSort className="text-gray-600 group-hover:text-primary-500 transition-colors duration-300" />
                  <span className="font-medium text-gray-700">Sort</span>
                </button>
              </div>
            </div>
          </div>

          {/* Enhanced College Count */}
          <div className="text-center mb-8 animate-fade-in-up">
            <p className="text-lg text-gray-600">
              Showing <span className="font-bold text-primary-600 text-xl">{filteredColleges.length}</span> result{filteredColleges.length !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Enhanced College Grid */}
          <div className="college-grid">
            {filteredColleges.length === 0 ? (
              <div className="col-span-full text-center py-16 animate-fade-in-up">
                <div className="glass rounded-3xl p-12 max-w-md mx-auto">
                  <FaSearch className="text-6xl text-gray-300 mb-6 mx-auto" />
                  <h3 className="text-2xl font-bold text-gray-700 mb-4">No results found</h3>
                  <p className="text-gray-600 mb-6">
                    Try using a different search term or browse all colleges.
                  </p>
                  <button 
                    onClick={() => setSearch('')}
                    className="px-6 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-all duration-300"
                  >
                    View All Colleges
                  </button>
                </div>
              </div>
            ) : (
              filteredColleges.map((college, index) => (
                <div
                  key={college.id}
                  className="group card card-hover animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Enhanced College Image with Overlay */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={imgError[college.id] ? fallbackImage : college.image}
                      alt={college.name}
                      onError={() => handleImageError(college.id)}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    {/* Enhanced Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                    
                    {/* Enhanced College Name and Rating */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="flex items-center justify-between mb-3">
                        <h2 className="text-white text-xl font-bold tracking-wide drop-shadow-lg">
                          {college.name}
                        </h2>
                        <div className="flex items-center gap-1 bg-gradient-to-r from-accent-400 to-accent-500 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
                          <FaStar className="text-white text-sm" />
                          <span className="text-sm font-bold text-white">{college.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-white/90 text-sm">
                        <FaMapMarkerAlt className="text-accent-300" />
                        <span className="font-medium">{college.location}</span>
                      </div>
                    </div>

                    {/* Floating Action Button */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300">
                        <FaHeart className="text-white text-sm" />
                      </button>
                    </div>
                  </div>

                  {/* Enhanced Info Section */}
                  <div className="p-6 space-y-5">
                    {/* Enhanced Average Package */}
                    <div className="flex items-center bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl px-5 py-4 shadow-sm group-hover:shadow-md transition-all duration-300">
                      <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-3 rounded-xl mr-4 shadow-lg">
                        <FaRupeeSign className="text-white text-lg" />
                      </div>
                      <div>
                        <p className="text-sm text-emerald-700 font-medium">Average Package</p>
                        <p className="text-xl font-bold text-emerald-800">{college.avgPackage}</p>
                      </div>
                    </div>

                    {/* Enhanced Branch List */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                        <div className="bg-gradient-to-br from-primary-500 to-primary-600 p-2 rounded-lg shadow-lg">
                          <FaChalkboardTeacher className="text-white text-sm" />
                        </div>
                        Available Branches
                      </h4>
                      <div className="space-y-3">
                        {college.branches.slice(0, 2).map((branch) => (
                          <div
                            key={branch.name}
                            className="flex justify-between items-center px-4 py-3 bg-gradient-to-r from-primary-50 to-purple-50 border border-primary-200 rounded-xl hover:border-primary-300 transition-all duration-300 group-hover:shadow-sm"
                          >
                            <span className="text-sm text-primary-900 font-semibold">{branch.name}</span>
                            <span className="text-xs bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold px-3 py-1.5 rounded-full shadow-sm">
                              {branch.opening}-{branch.closing}
                            </span>
                          </div>
                        ))}
                        {college.branches.length > 2 && (
                          <div className="text-center pt-2">
                            <span className="text-xs text-gray-600 bg-gray-100 px-4 py-2 rounded-full font-medium">
                              +{college.branches.length - 2} more branches
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Enhanced Action Buttons */}
                    <div className="flex gap-3 pt-2">
                      <Link to={`/college/${college.id}`} className="flex-1">
                        <button 
                          className="w-full py-3 text-sm font-semibold rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:from-primary-700 hover:to-primary-800 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                          aria-label={`Learn more about ${college.name}`}
                        >
                          Know More
                        </button>
                      </Link>
                      <Link to={`/chat/${college.id}`} className="flex-1">
                        <button 
                          className="w-full py-3 text-sm font-semibold rounded-xl bg-gradient-to-r from-accent-500 to-accent-600 text-white hover:from-accent-600 hover:to-accent-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                          aria-label={`Chat with senior students from ${college.name}`}
                        >
                          <FaComments className="text-sm" />
                          Chat
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CollegeList;