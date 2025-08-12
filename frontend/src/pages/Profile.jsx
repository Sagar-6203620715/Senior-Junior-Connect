import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { FaUser, FaEnvelope, FaGraduationCap, FaMapMarkerAlt, FaCalendarAlt, FaPhone, FaWhatsapp, FaEdit, FaSave, FaTimes } from 'react-icons/fa';

const Profile = () => {
  const { user, updateProfile, loading, error } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    bio: '',
    phoneNumber: '',
    whatsappNumber: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        bio: user.bio || '',
        phoneNumber: user.phoneNumber || '',
        whatsappNumber: user.whatsappNumber || ''
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await updateProfile(formData);
    if (result.success) {
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      bio: user.bio || '',
      phoneNumber: user.phoneNumber || '',
      whatsappNumber: user.whatsappNumber || ''
    });
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Profile Not Found</h1>
          <p className="text-gray-600">Please log in to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">My Profile</h1>
          <p className="text-gray-600">Manage your account information and preferences</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8">
          {/* Profile Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-purple-600 rounded-full flex items-center justify-center">
                <FaUser className="text-white text-2xl" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{user.fullName}</h2>
                <p className="text-gray-600">{user.email}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    user.studentType === 'senior' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {user.studentType === 'senior' ? 'Senior Student' : 'Junior Student'}
                  </span>
                  {user.isVerified && (
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                      Verified
                    </span>
                  )}
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                isEditing
                  ? 'bg-gray-600 text-white hover:bg-gray-700'
                  : 'bg-primary-600 text-white hover:bg-primary-700'
              }`}
            >
              {isEditing ? <FaTimes className="inline mr-2" /> : <FaEdit className="inline mr-2" />}
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  First Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all duration-200"
                    placeholder="Enter your first name"
                  />
                ) : (
                  <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-800">
                    {user.firstName}
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Last Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all duration-200"
                    placeholder="Enter your last name"
                  />
                ) : (
                  <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-800">
                    {user.lastName}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="flex items-center px-4 py-3 bg-gray-50 rounded-xl">
                  <FaEnvelope className="text-gray-400 mr-3" />
                  <span className="text-gray-800">{user.email}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
              </div>

              {/* College */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  College
                </label>
                <div className="flex items-center px-4 py-3 bg-gray-50 rounded-xl">
                  <FaGraduationCap className="text-gray-400 mr-3" />
                  <span className="text-gray-800">{user.college?.name || 'Not specified'}</span>
                </div>
              </div>

              {/* Branch */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Branch
                </label>
                <div className="flex items-center px-4 py-3 bg-gray-50 rounded-xl">
                  <FaGraduationCap className="text-gray-400 mr-3" />
                  <span className="text-gray-800">{user.branch}</span>
                </div>
              </div>

              {/* Year of Study */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Year of Study
                </label>
                <div className="flex items-center px-4 py-3 bg-gray-50 rounded-xl">
                  <FaGraduationCap className="text-gray-400 mr-3" />
                  <span className="text-gray-800">{user.yearOfStudy} Year</span>
                </div>
              </div>

              {/* Roll Number */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Roll Number
                </label>
                <div className="flex items-center px-4 py-3 bg-gray-50 rounded-xl">
                  <FaGraduationCap className="text-gray-400 mr-3" />
                  <span className="text-gray-800">{user.rollNumber}</span>
                </div>
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Date of Birth
                </label>
                <div className="flex items-center px-4 py-3 bg-gray-50 rounded-xl">
                  <FaCalendarAlt className="text-gray-400 mr-3" />
                  <span className="text-gray-800">
                    {user.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString() : 'Not specified'}
                  </span>
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number
                </label>
                {isEditing ? (
                  <div className="relative">
                    <FaPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all duration-200"
                      placeholder="Enter your phone number"
                    />
                  </div>
                ) : (
                  <div className="flex items-center px-4 py-3 bg-gray-50 rounded-xl">
                    <FaPhone className="text-gray-400 mr-3" />
                    <span className="text-gray-800">{user.phoneNumber || 'Not specified'}</span>
                  </div>
                )}
              </div>

              {/* WhatsApp Number */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  WhatsApp Number
                </label>
                {isEditing ? (
                  <div className="relative">
                    <FaWhatsapp className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-500" />
                    <input
                      type="tel"
                      name="whatsappNumber"
                      value={formData.whatsappNumber}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all duration-200"
                      placeholder="Enter your WhatsApp number"
                    />
                  </div>
                ) : (
                  <div className="flex items-center px-4 py-3 bg-gray-50 rounded-xl">
                    <FaWhatsapp className="text-green-500 mr-3" />
                    <span className="text-gray-800">{user.whatsappNumber || 'Not specified'}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Bio */}
            <div className="mt-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Bio
              </label>
              {isEditing ? (
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all duration-200"
                  placeholder="Tell us about yourself..."
                />
              ) : (
                <div className="px-4 py-3 bg-gray-50 rounded-xl">
                  <span className="text-gray-800">
                    {user.bio || 'No bio added yet. Click edit to add one!'}
                  </span>
                </div>
              )}
            </div>

            {/* Account Info */}
            <div className="mt-8 p-6 bg-gray-50 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Account Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="text-sm font-medium text-gray-600">Member Since:</span>
                  <p className="text-gray-800">
                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Last Active:</span>
                  <p className="text-gray-800">
                    {user.lastActive ? new Date(user.lastActive).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Account Status:</span>
                  <p className={`font-medium ${
                    user.isActive ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {user.isActive ? 'Active' : 'Inactive'}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Email Verification:</span>
                  <p className={`font-medium ${
                    user.isVerified ? 'text-green-600' : 'text-yellow-600'
                  }`}>
                    {user.isVerified ? 'Verified' : 'Pending'}
                  </p>
                </div>
              </div>
            </div>

            {/* Save Button */}
            {isEditing && (
              <div className="mt-8 flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Saving...
                    </div>
                  ) : (
                    <>
                      <FaSave className="inline mr-2" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
