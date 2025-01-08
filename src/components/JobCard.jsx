import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const JobCard = ({ job }) => {
  const navigate = useNavigate();
  return (
    <div className="border p-6 shadow-lg rounded-lg bg-white hover:shadow-xl transition-shadow duration-300">
      {/* Company Logo */}
      <div className="flex justify-between items-center">
        <img
          className="h-10 w-10 rounded-full"
          src={assets.company_icon}
          alt="Company Logo"
        />
      </div>

      {/* Job Title */}
      <h4 className="font-semibold text-lg mt-4 text-gray-800">{job.title}</h4>

      {/* Job Details */}
      <div className="flex items-center gap-2 mt-4 text-sm">
        <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full border border-blue-300">
          {job.location}
        </span>
        <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full border border-red-300">
          {job.level}
        </span>
      </div>

      {/* Job Description */}
      <p className="text-gray-600 mt-3 text-sm">
        {job.description.length > 100
          ? `${job.description.slice(0, 100)}...`
          : job.description}
      </p>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-4">
        <button
          onClick={() => {
            navigate(`/apply-job/${job._id}`);
            scrollTo(0, 0);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Apply now
        </button>
        <button
          onClick={() => {
            navigate(`/apply-job/${job._id}`);
            scrollTo(0, 0);
          }}
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
        >
          Learn more
        </button>
      </div>
    </div>
  );
};

export default JobCard;
