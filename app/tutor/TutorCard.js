import React from "react";
import { FaEnvelope, FaUserGraduate } from "react-icons/fa";

const TutorCard = ({ tutor }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-md transform transition duration-200 hover:scale-105 hover:shadow-lg">
      <div className="flex justify-between items-center">
        {/* Icon */}
        <FaUserGraduate className="text-4xl text-blue-400" />

        {/* Tutor Info */}
        <div className="text-right">
          <h3 className="text-xl font-semibold text-white">{tutor.firstname} {tutor.lastname}</h3>
          <p className="text-gray-400">{tutor.subjects?.map((s) => s.name).join(", ") || "No subjects listed"}</p>
          <p className="text-yellow-400">{tutor.rating ? `⭐ ${tutor.rating}/5` : "No rating yet"}</p>
        </div>
      </div>

      {/* Email Button */}
      <a
        href={`https://mail.google.com/mail/?view=cm&fs=1&to=${tutor.email}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 px-4 py-2 w-full inline-block text-center rounded-lg bg-blue-500 text-white hover:bg-blue-600 flex items-center justify-center gap-2"
      >
        <FaEnvelope className="text-lg" /> Email Tutor
      </a>
    </div>
  );
};

export default TutorCard;