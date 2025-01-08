import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { assets, JobCategories, JobLocations } from "../assets/assets";
import JobCard from "./JobCard";

const JobListing = () => {
  const { isSearched, searchFilter, setSearchFilter, jobs } =
    useContext(AppContext);

  const [showFilters, setShowFilters] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);

  const [filteredJobs, setFilteredJobs] = useState(jobs);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };
  const handleLocationChange = (location) => {
    setSelectedLocations((prev) =>
      prev.includes(location)
        ? prev.filter((c) => c !== location)
        : [...prev, location]
    );
  };

  useEffect(() => {
    const matchesCategory = (jobs) =>
      selectedCategories.length === 0 ||
      selectedCategories.includes(jobs.category);
    const matchesLocation = (jobs) =>
      selectedLocations.length === 0 ||
      selectedLocations.includes(jobs.location);
    const matchesTitle = (jobs) =>
      searchFilter.title === "" ||
      jobs.title.toLowerCase().includes(searchFilter.title.toLowerCase());
    const matchesSearchLocation = (jobs) =>
      searchFilter.location === "" ||
      jobs.location.toLowerCase().includes(searchFilter.location.toLowerCase());
    const newFilteredJobs = jobs
      .slice()
      .reverse()
      .filter(
        (job) =>
          matchesCategory(job) &&
          matchesLocation(job) &&
          matchesTitle(job) &&
          matchesSearchLocation(job)
      );
    setFilteredJobs(newFilteredJobs);
    setCurrentPage(1);
  }, [jobs, selectedCategories, selectedLocations, searchFilter]);

  return (
    <div className="container 2xl:px-20 mx-auto flex flex-col lg:flex-row max-lg:space-y-8 py-8">
      {/* Sidebar Filters */}
      <div className="w-full lg:w-1/4 bg-white px-4">
        {/* Current Search */}
        {isSearched &&
          searchFilter.title !== "" &&
          searchFilter.location !== "" && (
            <div>
              <h3 className="font-medium text-lg mb-4">Current Search</h3>
              <div className="mb-4 text-gray-600">
                {searchFilter.title && (
                  <span className="inline-flex items-center gap-2.5 bg-blue-50 border border-blue-200 px-4 py-1.5 rounded">
                    {searchFilter.title}
                    <img
                      src={assets.cross_icon}
                      onClick={() =>
                        setSearchFilter((prev) => ({ ...prev, title: "" }))
                      }
                      className="cursor-pointer"
                      alt="Remove title filter"
                    />
                  </span>
                )}
                {searchFilter.location && (
                  <span className="ml-2 inline-flex items-center gap-2.5 bg-red-50 border border-red-200 px-4 py-1.5 rounded">
                    {searchFilter.location}
                    <img
                      src={assets.cross_icon}
                      onClick={() =>
                        setSearchFilter((prev) => ({ ...prev, location: "" }))
                      }
                      className="cursor-pointer"
                      alt="Remove location filter"
                    />
                  </span>
                )}
              </div>
            </div>
          )}
        <button
          onClick={(e) => setShowFilters((prev) => !prev)}
          className="px-6 py-1.5 rounded border border-gray-400 lg:hidden"
        >
          {showFilters ? "Close" : "Filters"}
        </button>

        {/* Search by Category */}
        <div className={showFilters ? "" : "max-lg:hidden"}>
          <h4 className="font-medium text-lg py-4">Search by Category</h4>
          <ul className="space-y-4 text-gray-600">
            {JobCategories.map((category, index) => (
              <li className="flex gap-3 items-center" key={index}>
                <input
                  className="scale-125"
                  type="checkbox"
                  onChange={() => handleCategoryChange(category)}
                  checked={selectedCategories.includes(category)}
                />

                {category}
              </li>
            ))}
          </ul>
        </div>

        {/* Search by Location */}
        <div className={showFilters ? "" : "max-lg:hidden"}>
          <h4 className="pt-14 font-medium text-lg py-4">Search by Location</h4>
          <ul className="space-y-4 text-gray-600">
            {JobLocations.map((location, index) => (
              <li className="flex gap-3 items-center" key={index}>
                <input
                  className="scale-125"
                  type="checkbox"
                  onChange={() => handleLocationChange(location)}
                  checked={selectedLocations.includes(location)}
                />
                {location}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Job Listings Section */}
      <section className="w-full lg:w-3/4 text-gray-800 px-4">
        <h3 className="font-medium text-3xl py-2" id="job-list">
          Latest jobs
        </h3>
        <p className="mb-8">Get your desired job from top companies</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredJobs
            .slice((currentPage - 1) * 6, currentPage * 6)
            .map((job, index) => (
              <JobCard key={index} job={job} />
            ))}
        </div>
        {/* pagination */}

        {filteredJobs.length > 0 && (
          <div className="flex justify-center items-center space-x-2 mt-8">
            {/* Previous Page Button */}
            <a href="#job-list" className="mr-2">
              <img
                onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                src={assets.left_arrow_icon}
                alt="Previous Page"
              />
            </a>
            {/* Page Numbers */}
            {Array.from({ length: Math.ceil(filteredJobs.length / 6) }).map(
              (_, idx) => (
                <a href="#job-list" key={idx} className="mx-1">
                  <button
                    className={`w-10 h-10 flex items-center justify-center border border-gray-300 rounded ${
                      currentPage === idx + 1
                        ? "bg-blue-100 text-blue-500"
                        : "text-gray-500"
                    }`}
                    onClick={() => setCurrentPage(idx + 1)}
                  >
                    {idx + 1}
                  </button>
                </a>
              )
            )}
            {/* Next Page Button */}
            <a href="#job-list" className="ml-2">
              <img
                onClick={() =>
                  setCurrentPage(
                    Math.min(
                      currentPage + 1,
                      Math.ceil(filteredJobs.length / 6)
                    )
                  )
                }
                src={assets.right_arrow_icon}
                alt="Next Page"
              />
            </a>
          </div>
        )}
      </section>
    </div>
  );
};

export default JobListing;
