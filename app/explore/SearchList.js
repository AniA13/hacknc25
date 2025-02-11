"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // ✅ Import Next.js router
import SearchBar from "./SearchBar";

const SubjectList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // ✅ Initialize Next.js router

  // List of subjects
  const FEATURES = [
    { icon: "🧬", title: "Science", description: "Biology, Environmental Science, Chemistry, etc." },
    { icon: "📚", title: "Mathematics", description: "Calculus, Algebra, Geometry, etc." },
    { icon: "💻", title: "Computer Science", description: "Programming, Algorithms, Data Structures, Web Development, etc." },
    { icon: "🧪", title: "Chemistry", description: "Organic Chemistry, Inorganic Chemistry, Biochemistry, etc." },
  ];

  useEffect(() => {
    const filteredResults = searchTerm
      ? FEATURES.filter((subject) => {
          const titleMatch = subject.title.toLowerCase().startsWith(searchTerm.toLowerCase());
          const descriptionMatch = subject.description
            .toLowerCase()
            .split(/[\s,]+/) // Split by spaces and commas
            .some((word) => word.startsWith(searchTerm.toLowerCase())); // Check if any word starts with searchTerm
  
          return titleMatch || descriptionMatch;
        })
      : FEATURES;
  
    setResults(filteredResults);
  }, [searchTerm]);
  

  // 🔹 Handle subject click to navigate to `/tutor?subject=subjectName`
  const handleSubjectClick = (subject) => {
    router.push(`/tutor?subject=${encodeURIComponent(subject)}`); // ✅ Navigate in Next.js
  };

  // 🎨 Subject Card Component
  const FeatureCard = ({ icon, title, description }) => (
    <div
      className="bg-black/5 p-6 mt-5 rounded-xl text-center hover:scale-[1.05] transition-all cursor-pointer"
      onClick={() => handleSubjectClick(title)} // ✅ Make the entire card clickable
    >
      <div className="mx-auto mb-4 text-black" style={{ fontSize: "48px" }}>
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-black/60">{description}</p>
    </div>
  );

  return (
    <div className="w-full max-w-6xl mx-auto p-2">
      {/* 🔍 Search Bar */}
      <SearchBar
        value={searchTerm}
        onChange={(value) => {
          setSearchTerm(value);
          setLoading(true);
          setTimeout(() => setLoading(false), 500);
        }}
        loading={loading}
        placeholder="Search for classes..."
      />

      {/* 📋 Display Filtered Subjects */}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {results.length > 0 ? (
          results.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500">No subjects found. Try different search terms.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubjectList;
