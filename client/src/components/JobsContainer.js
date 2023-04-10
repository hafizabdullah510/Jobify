import React, { useEffect } from "react";
import Loading from "./Loading";
import Job from "./Job";
import { PageBtnContainer } from "./index";
import { useGlobalContext } from "../context/AppContext";
import Wrapper from "../assets/wrappers/JobsContainer";
const JobsContainer = () => {
  const {
    isLoading,
    jobs,
    totalJobs,
    getAllJobs,
    search,
    searchStatus,
    searchType,
    sort,
    numOfPages,
    page,
  } = useGlobalContext();

  useEffect(() => {
    getAllJobs();
    // eslint-disable-next-line
  }, [page, search, searchStatus, searchType, sort]);

  if (isLoading) {
    return <Loading center />;
  }

  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {totalJobs} job{jobs.length > 1 && "s"} found
      </h5>
      <div className="jobs">
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};

export default JobsContainer;
