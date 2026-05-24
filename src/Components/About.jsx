import { useNavigate } from "react-router-dom";
import { 
  Target, 
  Eye, 
  Heart, 
  Award, 
  MapPin, 
  Mail, 
  Phone, 
  Users,
  GraduationCap,
  Calendar,
  School
} from "lucide-react";
import NavBar from "./NavBar";

const About = () => {
  const navigate = useNavigate();

  const stats = [
    { icon: GraduationCap, label: "Students Enrolled", value: "500+" },
    { icon: Users, label: "Expert Teachers", value: "35+" },
    { icon: Calendar, label: "Years of Excellence", value: "15+" },
    { icon: Award, label: "Awards Won", value: "12" }
  ];

  const values = [
    { 
      icon: Heart, 
      title: "Respect", 
      desc: "Fostering mutual respect between students, staff, and community" 
    },
    { 
      icon: Award, 
      title: "Integrity", 
      desc: "Building honest, ethical character in all our students" 
    },
    { 
      icon: Target, 
      title: "Excellence", 
      desc: "Striving for the highest standards in education" 
    },
    { 
      icon: Users, 
      title: "Service", 
      desc: "Encouraging community engagement and social responsibility" 
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-sky-600 via-blue-600 to-green-600 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1 bg-white/20 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
              Established with Purpose
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Shaping Tomorrow's Leaders at<br />
              <span className="text-green-300">Arca Dei Foundation School</span>
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
              A nurturing educational community in Anambra, Nigeria, dedicated to academic excellence, 
              character development, and empowering students to reach their full potential.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 bg-white shadow-sm relative -mt-10 mx-4 md:mx-auto max-w-6xl rounded-2xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 px-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center group">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-xl mb-3 group-hover:scale-110 transition-transform">
                <stat.icon className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Mission Card */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-green-200">
                <Target className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                To provide holistic education that develops confident, compassionate, and competent 
                learners equipped with the skills, knowledge, and values to thrive in an ever-changing world.
              </p>
            </div>

            {/* Vision Card */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-sky-600 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-blue-200">
                <Eye className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                To be a leading centre of educational excellence in Anambra State and beyond, 
                recognized for nurturing the next generation of innovative leaders and change-makers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              The foundation of everything we do at Arca Dei Foundation School
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, idx) => (
              <div key={idx} className="group p-6 rounded-2xl bg-gray-50 hover:bg-gradient-to-br hover:from-sky-600 hover:to-blue-600 transition-all duration-300 cursor-default">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm">
                  <value.icon className="w-6 h-6 text-sky-600 group-hover:text-blue-600" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-white">{value.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed group-hover:text-blue-100">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* School Info & Contact */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Info Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-8 shadow-lg sticky top-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">School Information</h3>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <School className="w-5 h-5 text-sky-600" />
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Levels</p>
                      <p className="font-semibold text-gray-900">Primary & Secondary</p>
                    </div>
                  </li>
                  <li className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Calendar className="w-5 h-5 text-sky-600" />
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Founded</p>
                      <p className="font-semibold text-gray-900">2009</p>
                    </div>
                  </li>
                  <li className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <MapPin className="w-5 h-5 text-sky-600" />
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Location</p>
                      <p className="font-semibold text-gray-900">Anambra State, Nigeria</p>
                    </div>
                  </li>
                  <li className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Users className="w-5 h-5 text-sky-600" />
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Community</p>
                      <p className="font-semibold text-gray-900">500+ Students</p>
                    </div>
                  </li>
                </ul>

                <button 
                  onClick={() => navigate('/contact')}
                  className="w-full mt-6 py-3 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-green-200 transition-all"
                >
                  Get in Touch
                </button>
              </div>
            </div>

            {/* Contact Details */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">Visit Our Campus</h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                  Located in the heart of Anambra State, our campus provides a safe, modern learning 
                  environment designed to inspire creativity and academic excellence. We welcome visits 
                  from prospective families and community members.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-sky-200 transition-colors">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <MapPin className="w-6 h-6 text-green-600" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">Address</h4>
                  <p className="text-gray-600">Anambra State, Nigeria</p>
                  <p className="text-sm text-gray-500 mt-1">Open for visits Mon-Fri, 8am-4pm</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-sky-200 transition-colors">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">Email Us</h4>
                  <p className="text-gray-600">info@arcadei.edu.ng</p>
                  <p className="text-sm text-gray-500 mt-1">We reply within 24 hours</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-sky-200 transition-colors">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <Phone className="w-6 h-6 text-purple-600" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">Call Us</h4>
                  <p className="text-gray-600">+234 800 000 0000</p>
                  <p className="text-sm text-gray-500 mt-1">Mon-Fri, 8am-5pm WAT</p>
                </div>

                <div className="bg-gradient-to-br from-sky-600 to-blue-600 p-6 rounded-xl text-white flex flex-col justify-center items-center text-center">
                  <h4 className="font-bold text-xl mb-2">Ready to Enroll?</h4>
                  <p className="text-blue-100 text-sm mb-4">Join our community of excellence</p>
                  <button 
                    onClick={() => navigate('/add-student')}
                    className="px-6 py-2 bg-white text-sky-600 rounded-lg font-semibold text-sm hover:bg-gray-50 transition-colors"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;