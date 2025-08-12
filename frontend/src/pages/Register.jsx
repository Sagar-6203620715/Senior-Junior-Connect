import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaEye, FaEyeSlash, FaUser, FaEnvelope, FaLock, FaGraduationCap, FaMapMarkerAlt, FaCalendarAlt, FaPhone, FaWhatsapp } from 'react-icons/fa';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    studentType: 'junior',
    college: '',
    branch: '',
    yearOfStudy: 1,
    rollNumber: '',
    dateOfBirth: '',
    phoneNumber: '',
    whatsappNumber: ''
  });

  const [colleges, setColleges] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [step, setStep] = useState(1);

  const { register, error, clearError, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  // Clear errors when component mounts
  useEffect(() => {
    clearError();
  }, [clearError]);

  // Fetch colleges on component mount
  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/colleges');
        if (response.ok) {
          const data = await response.json();
          setColleges(data.data.colleges || []);
        }
      } catch (error) {
        console.error('Failed to fetch colleges:', error);
      }
    };

    fetchColleges();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear validation error for this field
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateStep1 = () => {
    const errors = {};

    if (!formData.firstName.trim()) {
      errors.firstName = 'First name is required';
    } else if (formData.firstName.trim().length < 2) {
      errors.firstName = 'First name must be at least 2 characters';
    }

    if (!formData.lastName.trim()) {
      errors.lastName = 'Last name is required';
    } else if (formData.lastName.trim().length < 2) {
      errors.lastName = 'Last name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(formData.password)) {
      errors.password = 'Password must contain uppercase, lowercase, number, and special character';
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateStep2 = () => {
    const errors = {};

    if (!formData.studentType) {
      errors.studentType = 'Please select your student type';
    }

    if (!formData.college) {
      errors.college = 'Please select your college';
    }

    if (!formData.branch.trim()) {
      errors.branch = 'Branch is required';
    }

    if (!formData.yearOfStudy) {
      errors.yearOfStudy = 'Year of study is required';
    }

    if (!formData.rollNumber.trim()) {
      errors.rollNumber = 'Roll number is required';
    }

    if (!formData.dateOfBirth) {
      errors.dateOfBirth = 'Date of birth is required';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const nextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    }
  };

  const prevStep = () => {
    setStep(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep2()) return;

    setIsLoading(true);
    
    // Prepare data for registration
    const registrationData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      studentType: formData.studentType,
      college: formData.college,
      branch: formData.branch,
      yearOfStudy: parseInt(formData.yearOfStudy),
      rollNumber: formData.rollNumber,
      dateOfBirth: formData.dateOfBirth,
      phoneNumber: formData.phoneNumber || undefined,
      whatsappNumber: formData.whatsappNumber || undefined
    };

    const result = await register(registrationData);
    
    if (!result.success) {
      setIsLoading(false);
    }
  };

  const getPasswordStrength = (password) => {
    if (!password) return { score: 0, label: '', color: '' };
    
    let score = 0;
    if (password.length >= 8) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[@$!%*?&]/.test(password)) score++;

    const labels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
    const colors = ['text-red-500', 'text-orange-500', 'text-yellow-500', 'text-blue-500', 'text-green-500'];
    
    return {
      score: Math.min(score, 4),
      label: labels[Math.min(score, 4)],
      color: colors[Math.min(score, 4)]
    };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-10 px-4 sm:px-6 lg:px-12">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
              EngiConnect
            </h1>
          </Link>
          <p className="text-gray-600 mt-2">Create your account to get started</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            <div className={`flex items-center ${step >= 1 ? 'text-primary-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                step >= 1 ? 'border-primary-600 bg-primary-600 text-white' : 'border-gray-300'
              }`}>
                1
              </div>
              <span className="ml-2 text-sm font-medium">Basic Info</span>
            </div>
            <div className={`w-16 h-0.5 ${step >= 2 ? 'bg-primary-600' : 'bg-gray-300'}`}></div>
            <div className={`flex items-center ${step >= 2 ? 'text-primary-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                step >= 2 ? 'border-primary-600 bg-primary-600 text-white' : 'border-gray-300'
              }`}>
                2
              </div>
              <span className="ml-2 text-sm font-medium">Academic Details</span>
            </div>
          </div>
        </div>

        {/* Registration Form */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 ? (
              /* Step 1: Basic Information */
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* First Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      First Name
                    </label>
                    <div className="relative">
                      <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={`w-full pl-12 pr-4 py-4 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all duration-200 ${
                          validationErrors.firstName 
                            ? 'border-red-300 focus:ring-red-500' 
                            : 'border-gray-300 focus:border-primary-500'
                        }`}
                        placeholder="Enter your first name"
                        disabled={isLoading}
                      />
                    </div>
                    {validationErrors.firstName && (
                      <p className="text-red-500 text-sm mt-1">{validationErrors.firstName}</p>
                    )}
                  </div>

                  {/* Last Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Last Name
                    </label>
                    <div className="relative">
                      <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={`w-full pl-12 pr-4 py-4 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all duration-200 ${
                          validationErrors.lastName 
                            ? 'border-red-300 focus:ring-red-500' 
                            : 'border-gray-300 focus:border-primary-500'
                        }`}
                        placeholder="Enter your last name"
                        disabled={isLoading}
                      />
                    </div>
                    {validationErrors.lastName && (
                      <p className="text-red-500 text-sm mt-1">{validationErrors.lastName}</p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full pl-12 pr-4 py-4 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all duration-200 ${
                        validationErrors.email 
                          ? 'border-red-300 focus:ring-red-500' 
                          : 'border-gray-300 focus:border-primary-500'
                      }`}
                      placeholder="Enter your email address"
                      disabled={isLoading}
                    />
                  </div>
                  {validationErrors.email && (
                    <p className="text-red-500 text-sm mt-1">{validationErrors.email}</p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`w-full pl-12 pr-12 py-4 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all duration-200 ${
                        validationErrors.password 
                          ? 'border-red-300 focus:ring-red-500' 
                          : 'border-gray-300 focus:border-primary-500'
                      }`}
                      placeholder="Create a strong password"
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      disabled={isLoading}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {/* Password Strength Indicator */}
                  {formData.password && (
                    <div className="mt-2">
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          {[0, 1, 2, 3, 4].map((index) => (
                            <div
                              key={index}
                              className={`w-2 h-2 rounded-full ${
                                index <= passwordStrength.score ? 'bg-green-500' : 'bg-gray-300'
                              }`}
                            ></div>
                          ))}
                        </div>
                        <span className={`text-sm font-medium ${passwordStrength.color}`}>
                          {passwordStrength.label}
                        </span>
                      </div>
                    </div>
                  )}
                  {validationErrors.password && (
                    <p className="text-red-500 text-sm mt-1">{validationErrors.password}</p>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={`w-full pl-12 pr-4 py-4 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all duration-200 ${
                        validationErrors.confirmPassword 
                          ? 'border-red-300 focus:ring-red-500' 
                          : 'border-gray-300 focus:border-primary-500'
                      }`}
                      placeholder="Confirm your password"
                      disabled={isLoading}
                    />
                  </div>
                  {validationErrors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">{validationErrors.confirmPassword}</p>
                  )}
                </div>

                {/* Next Button */}
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-primary-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:from-primary-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  Next Step
                </button>
              </>
            ) : (
              /* Step 2: Academic Details */
              <>
                {/* Student Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    I am a
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <label className="flex items-center p-4 border rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                      <input
                        type="radio"
                        name="studentType"
                        value="junior"
                        checked={formData.studentType === 'junior'}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                      />
                      <div className="ml-3">
                        <div className="font-medium text-gray-900">Junior Student</div>
                        <div className="text-sm text-gray-500">Looking for mentorship</div>
                      </div>
                    </label>
                    <label className="flex items-center p-4 border rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                      <input
                        type="radio"
                        name="studentType"
                        value="senior"
                        checked={formData.studentType === 'senior'}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                      />
                      <div className="ml-3">
                        <div className="font-medium text-gray-900">Senior Student</div>
                        <div className="text-sm text-gray-500">Can mentor others</div>
                      </div>
                    </label>
                  </div>
                  {validationErrors.studentType && (
                    <p className="text-red-500 text-sm mt-1">{validationErrors.studentType}</p>
                  )}
                </div>

                {/* College Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    College/University
                  </label>
                  <div className="relative">
                    <FaGraduationCap className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <select
                      name="college"
                      value={formData.college}
                      onChange={handleInputChange}
                      className={`w-full pl-12 pr-4 py-4 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all duration-200 ${
                        validationErrors.college 
                          ? 'border-red-300 focus:ring-red-500' 
                          : 'border-gray-300 focus:border-primary-500'
                      }`}
                      disabled={isLoading}
                    >
                      <option value="">Select your college</option>
                      {colleges.map((college) => (
                        <option key={college._id} value={college._id}>
                          {college.name} - {college.location}
                        </option>
                      ))}
                    </select>
                  </div>
                  {validationErrors.college && (
                    <p className="text-red-500 text-sm mt-1">{validationErrors.college}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Branch */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Branch/Department
                    </label>
                    <input
                      type="text"
                      name="branch"
                      value={formData.branch}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-4 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all duration-200 ${
                        validationErrors.branch 
                          ? 'border-red-300 focus:ring-red-500' 
                          : 'border-gray-300 focus:border-primary-500'
                      }`}
                      placeholder="e.g., Computer Science"
                      disabled={isLoading}
                    />
                    {validationErrors.branch && (
                      <p className="text-red-500 text-sm mt-1">{validationErrors.branch}</p>
                    )}
                  </div>

                  {/* Year of Study */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Year of Study
                    </label>
                    <select
                      name="yearOfStudy"
                      value={formData.yearOfStudy}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-4 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all duration-200 ${
                        validationErrors.yearOfStudy 
                          ? 'border-red-300 focus:ring-red-500' 
                          : 'border-gray-300 focus:border-primary-500'
                      }`}
                      disabled={isLoading}
                    >
                      <option value={1}>1st Year</option>
                      <option value={2}>2nd Year</option>
                      <option value={3}>3rd Year</option>
                      <option value={4}>4th Year</option>
                    </select>
                    {validationErrors.yearOfStudy && (
                      <p className="text-red-500 text-sm mt-1">{validationErrors.yearOfStudy}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Roll Number */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Roll Number
                    </label>
                    <input
                      type="text"
                      name="rollNumber"
                      value={formData.rollNumber}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-4 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all duration-200 ${
                        validationErrors.rollNumber 
                          ? 'border-red-300 focus:ring-red-500' 
                          : 'border-gray-300 focus:border-primary-500'
                      }`}
                      placeholder="Enter your roll number"
                      disabled={isLoading}
                    />
                    {validationErrors.rollNumber && (
                      <p className="text-red-500 text-sm mt-1">{validationErrors.rollNumber}</p>
                    )}
                  </div>

                  {/* Date of Birth */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Date of Birth
                    </label>
                    <div className="relative">
                      <FaCalendarAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        className={`w-full pl-12 pr-4 py-4 border rounded-xl focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all duration-200 ${
                          validationErrors.dateOfBirth 
                            ? 'border-red-300 focus:ring-red-500' 
                            : 'border-gray-300 focus:border-primary-500'
                        }`}
                        disabled={isLoading}
                      />
                    </div>
                    {validationErrors.dateOfBirth && (
                      <p className="text-red-500 text-sm mt-1">{validationErrors.dateOfBirth}</p>
                    )}
                  </div>
                </div>

                {/* Optional Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Phone Number */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number (Optional)
                    </label>
                    <div className="relative">
                      <FaPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all duration-200"
                        placeholder="Enter your phone number"
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  {/* WhatsApp Number */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      WhatsApp Number (Optional)
                    </label>
                    <div className="relative">
                      <FaWhatsapp className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-500" />
                      <input
                        type="tel"
                        name="whatsappNumber"
                        value={formData.whatsappNumber}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all duration-200"
                        placeholder="Enter your WhatsApp number"
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                </div>

                {/* Error Display */}
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <p className="text-red-600 text-sm">{error}</p>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={prevStep}
                    disabled={isLoading}
                    className="flex-1 px-6 py-4 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 bg-gradient-to-r from-primary-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:from-primary-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Creating Account...
                      </div>
                    ) : (
                      'Create Account'
                    )}
                  </button>
                </div>
              </>
            )}
          </form>

          {/* Sign In Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-primary-600 hover:text-primary-700 font-semibold transition-colors"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link
            to="/"
            className="text-gray-500 hover:text-gray-700 transition-colors text-sm"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
