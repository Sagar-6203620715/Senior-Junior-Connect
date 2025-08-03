import { Link } from 'react-router-dom';
import { FaGraduationCap, FaUsers, FaComments, FaSearch, FaStar, FaArrowRight, FaRocket, FaLightbulb, FaHeart } from 'react-icons/fa';

function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 left-10 w-2 h-2 bg-white rounded-full"></div>
          <div className="absolute top-20 right-20 w-1 h-1 bg-white rounded-full"></div>
          <div className="absolute bottom-10 left-1/4 w-1.5 h-1.5 bg-white rounded-full"></div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse-slow"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-accent-400/20 rounded-full blur-2xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-primary-400/30 rounded-full blur-xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in-up">
            {/* Enhanced Logo */}
            <div className="flex justify-center mb-8">
              <div className="relative group">
                <div className="w-24 h-24 bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm border border-white/20 rounded-3xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all duration-500">
                  <FaGraduationCap className="text-white text-4xl" />
                </div>
                <div className="absolute -inset-4 bg-gradient-to-r from-primary-400/20 to-accent-400/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>

            {/* Enhanced Heading */}
            <h1 className="heading-responsive font-bold text-white mb-6 leading-tight">
              Connect with
              <span className="block bg-gradient-to-r from-white to-accent-200 bg-clip-text text-transparent">Senior Students</span>
            </h1>
            
            <p className="text-responsive text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
              Find and connect with experienced students from top engineering colleges across India. 
              Get insights, guidance, and mentorship to shape your academic journey.
            </p>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Link 
                to="/colleges" 
                className="group relative px-8 py-4 bg-white text-primary-700 rounded-2xl font-semibold hover:shadow-2xl transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                <span className="flex items-center gap-3">
                  Browse Colleges
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary-100 to-accent-100 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              
              <Link 
                to="/about" 
                className="group px-8 py-4 border-2 border-white/30 text-white rounded-2xl font-semibold hover:bg-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-105"
              >
                Learn More
              </Link>
            </div>

            {/* Enhanced Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="glass rounded-2xl p-6 text-center group hover:scale-105 transition-all duration-300">
                <div className="text-3xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">500+</div>
                <div className="text-white/80">Engineering Colleges</div>
              </div>
              <div className="glass rounded-2xl p-6 text-center group hover:scale-105 transition-all duration-300">
                <div className="text-3xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">10,000+</div>
                <div className="text-white/80">Active Students</div>
              </div>
              <div className="glass rounded-2xl p-6 text-center group hover:scale-105 transition-all duration-300">
                <div className="text-3xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">50,000+</div>
                <div className="text-white/80">Connections Made</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="heading-responsive font-bold text-white mb-6">Why Choose EngiConnect?</h2>
            <p className="text-responsive text-white/80 max-w-3xl mx-auto">
              Connect with senior students who have been through the same journey and can guide you to success.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature Card 1 */}
            <div className="group glass rounded-3xl p-8 text-center hover:scale-105 transition-all duration-500 animate-fade-in-left">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <FaSearch className="text-white text-2xl" />
                </div>
                <div className="absolute -inset-2 bg-gradient-to-r from-primary-400/20 to-primary-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Find Your College</h3>
              <p className="text-white/80 leading-relaxed">
                Browse through hundreds of engineering colleges with detailed information about branches, cutoffs, and placement packages.
              </p>
            </div>
            
            {/* Feature Card 2 */}
            <div className="group glass rounded-3xl p-8 text-center hover:scale-105 transition-all duration-500 animate-fade-in-up">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <FaUsers className="text-white text-2xl" />
                </div>
                <div className="absolute -inset-2 bg-gradient-to-r from-accent-400/20 to-accent-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Connect with Seniors</h3>
              <p className="text-white/80 leading-relaxed">
                Connect with senior students who can provide valuable insights about college life, academics, and career opportunities.
              </p>
            </div>
            
            {/* Feature Card 3 */}
            <div className="group glass rounded-3xl p-8 text-center hover:scale-105 transition-all duration-500 animate-fade-in-right">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <FaComments className="text-white text-2xl" />
                </div>
                <div className="absolute -inset-2 bg-gradient-to-r from-green-400/20 to-green-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Get Mentorship</h3>
              <p className="text-white/80 leading-relaxed">
                Receive personalized guidance and mentorship from experienced students to help you make informed decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass rounded-3xl p-12 animate-scale-in">
            <h2 className="heading-responsive font-bold text-white mb-6">Ready to Start Your Journey?</h2>
            <p className="text-responsive text-white/80 mb-8 max-w-2xl mx-auto">
              Join thousands of students who are already connecting and learning from their seniors.
            </p>
            <Link 
              to="/colleges" 
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-accent-500 to-accent-600 text-white rounded-2xl font-semibold hover:from-accent-600 hover:to-accent-700 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
            >
              <FaRocket className="group-hover:animate-bounce" />
              Get Started Today
              <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="heading-responsive font-bold text-white mb-6">What Students Say</h2>
            <p className="text-responsive text-white/80">Hear from students who have benefited from our platform</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="group glass rounded-3xl p-8 hover:scale-105 transition-all duration-500 animate-fade-in-left">
              <div className="flex items-center mb-6">
                <div className="flex text-accent-400">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="group-hover:scale-110 transition-transform duration-300" style={{ animationDelay: `${i * 0.1}s` }} />
                  ))}
                </div>
              </div>
              <p className="text-white/90 mb-6 leading-relaxed">
                "EngiConnect helped me connect with seniors from my dream college. Their guidance was invaluable!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">P</span>
                </div>
                <div>
                  <div className="font-semibold text-white">Priya Sharma</div>
                  <div className="text-sm text-white/70">IIT Delhi Aspirant</div>
                </div>
              </div>
            </div>
            
            {/* Testimonial 2 */}
            <div className="group glass rounded-3xl p-8 hover:scale-105 transition-all duration-500 animate-fade-in-up">
              <div className="flex items-center mb-6">
                <div className="flex text-accent-400">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="group-hover:scale-110 transition-transform duration-300" style={{ animationDelay: `${i * 0.1}s` }} />
                  ))}
                </div>
              </div>
              <p className="text-white/90 mb-6 leading-relaxed">
                "The college information and cutoff details are so accurate. It saved me a lot of research time."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-accent-500 to-accent-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">R</span>
                </div>
                <div>
                  <div className="font-semibold text-white">Rahul Kumar</div>
                  <div className="text-sm text-white/70">BITS Pilani Student</div>
                </div>
              </div>
            </div>
            
            {/* Testimonial 3 */}
            <div className="group glass rounded-3xl p-8 hover:scale-105 transition-all duration-500 animate-fade-in-right">
              <div className="flex items-center mb-6">
                <div className="flex text-accent-400">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="group-hover:scale-110 transition-transform duration-300" style={{ animationDelay: `${i * 0.1}s` }} />
                  ))}
                </div>
              </div>
              <p className="text-white/90 mb-6 leading-relaxed">
                "As a senior, I love helping juniors through this platform. It's rewarding to give back to the community."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">A</span>
                </div>
                <div>
                  <div className="font-semibold text-white">Anjali Patel</div>
                  <div className="text-sm text-white/70">NIT Trichy Senior</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="relative py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass rounded-3xl p-8 animate-fade-in-up">
            <div className="flex items-center justify-center gap-3 mb-4">
              <FaLightbulb className="text-accent-400 text-2xl" />
              <h3 className="text-2xl font-bold text-white">Ready to Transform Your Journey?</h3>
            </div>
            <p className="text-white/80 mb-6">
              Join the community of learners and mentors today
            </p>
            <div className="flex items-center justify-center gap-2 text-accent-400">
              <FaHeart className="animate-pulse" />
              <span className="text-sm">Made with love for students</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home; 