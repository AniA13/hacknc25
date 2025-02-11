"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { db } from "../firebase/client";
import { collection, getDocs, query, where } from "firebase/firestore";
import Navbar from "../components/Navbar";
import { 
  Search, 
  ChevronDown, 
  Star, 
  GraduationCap,
  X
} from "lucide-react";

const subjectsList = ["Mathematics", "Science", "English", "History", "Computer Science"];

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const Page = () => {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [selectedRating, setSelectedRating] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const q = query(collection(db, "users"), where("tutorVerified", "==", true));
        const querySnapshot = await getDocs(q);
        const tutorList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        tutorList.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        setTutors(tutorList);
      } catch (error) {
        console.error("Error fetching tutors:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTutors();
  }, []);

  const toggleSubject = (subject) => {
    setSelectedSubjects((prev) =>
      prev.includes(subject) ? prev.filter((s) => s !== subject) : [...prev, subject]
    );
  };

  const filteredTutors = tutors.filter((tutor) => {
    const matchesSearch =
      searchTerm === "" ||
      tutor.firstname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tutor.lastname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (tutor.subjects &&
        Array.isArray(tutor.subjects) &&
        tutor.subjects.some((subj) => subj.name.toLowerCase().includes(searchTerm.toLowerCase())));

    const matchesSubjects =
      selectedSubjects.length === 0 ||
      (tutor.subjects &&
        Array.isArray(tutor.subjects) &&
        selectedSubjects.every((subject) =>
          tutor.subjects.some((subj) => subj.name.toLowerCase() === subject.toLowerCase())
        ));

    const matchesRating = selectedRating === null || (tutor.rating || 0) >= selectedRating;

    return matchesSearch && matchesSubjects && matchesRating;
  });

  const TutorCard = ({ tutor }) => (
    <motion.div 
      variants={fadeIn}
      initial="initial"
      animate="animate"
      exit="exit"
      whileHover={{ y: -5 }}
      className="relative overflow-hidden rounded-3xl backdrop-blur-lg"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/90 to-white/50 backdrop-blur-md" />
      <div className="relative p-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <h3 className="text-2xl font-semibold bg-gradient-to-r from-black via-gray-800 to-black bg-clip-text text-transparent">
              {tutor.firstname} {tutor.lastname}
            </h3>
            <div className="flex items-center mt-2">
              {[...Array(5)].map((_, index) => (
                <Star 
                  key={index}
                  className={`w-4 h-4 ${index < (tutor.rating || 0) ? 'fill-black text-black' : 'fill-gray-200 text-gray-200'}`}
                />
              ))}
              <span className="ml-2 text-gray-700">{tutor.rating || 0}</span>
            </div>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-black to-gray-800 flex items-center justify-center">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {tutor.subjects?.slice(0, 3).map((subject, idx) => (
            <span
              key={idx}
              className="px-4 py-1.5 text-sm bg-black text-white rounded-full font-medium"
            >
              {subject.name}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-gray-50 to-white">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-48 -left-48 w-96 h-96 bg-gray-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
        <div className="absolute top-48 -right-48 w-96 h-96 bg-gray-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-48 left-48 w-96 h-96 bg-gray-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000" />
      </div>

      <Navbar />
      
      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative max-w-7xl mx-auto px-6 py-16 z-10"
      >
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-16"
        >
          <h1 className="text-7xl font-bold mt-4 tracking-tight mb-4 bg-gradient-to-r from-black via-gray-800 to-black bg-clip-text text-transparent">
            Find Your Perfect Tutor
          </h1>
          <p className="text-xl text-gray-700 font-light">
            Expert guidance tailored to your learning journey
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto mb-16 space-y-6">
          <motion.div 
            className="relative"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name or subject..."
              className="w-full pl-14 pr-6 py-5 bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg focus:ring-2 focus:ring-black focus:outline-none transition-shadow duration-200"
            />
          </motion.div>

          <motion.div className="flex flex-wrap justify-center gap-4">
            <div className="relative">
              <motion.button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="px-6 py-4 bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center text-gray-800"
              >
                <span className="mr-2">Subjects</span>
                <ChevronDown className="w-4 h-4" />
              </motion.button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute left-0 mt-2 w-56 bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg p-2 z-10"
                  >
                    {subjectsList.map((subject) => (
                      <motion.div
                        key={subject}
                        whileHover={{ x: 4 }}
                        className={`px-4 py-2 rounded-xl cursor-pointer ${
                          selectedSubjects.includes(subject)
                            ? "bg-black text-white"
                            : "hover:bg-gray-50 text-gray-800"
                        }`}
                        onClick={() => toggleSubject(subject)}
                      >
                        {subject}
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <select
              value={selectedRating || ""}
              onChange={(e) => setSelectedRating(e.target.value ? parseInt(e.target.value) : null)}
              className="px-6 py-4 bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none text-gray-800"
            >
              <option value="">Rating: Any</option>
              {[5, 4, 3, 2, 1].map((rating) => (
                <option key={rating} value={rating}>
                  {rating}+ Stars
                </option>
              ))}
            </select>

            {(selectedSubjects.length > 0 || selectedRating || searchTerm) && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={() => {
                  setSearchTerm("");
                  setSelectedSubjects([]);
                  setSelectedRating(null);
                }}
                className="px-6 py-4 bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center text-gray-800"
              >
                <X className="w-4 h-4 mr-2" />
                Clear Filters
              </motion.button>
            )}
          </motion.div>
        </div>

        <AnimatePresence>
          {loading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12"
            >
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-black border-t-transparent" />
            </motion.div>
          ) : (
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredTutors.length > 0 ? (
                filteredTutors.map((tutor) => (
                  <TutorCard key={tutor.id} tutor={tutor} />
                ))
              ) : (
                <motion.div
                  variants={fadeIn}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="col-span-full text-center py-12"
                >
                  <p className="text-xl text-gray-700">No tutors found matching your criteria.</p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.main>
    </div>
  );
};

export default Page;