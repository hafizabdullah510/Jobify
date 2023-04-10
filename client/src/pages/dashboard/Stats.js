import React from "react";
import { useEffect } from "react";
import { useGlobalContext } from "../../context/AppContext";
import {
  ChartsContainer,
  StatsContainer,
  Loading,
} from "../../components/index";
const Stats = () => {
  const { isLoading, getStats, monthlyApplications } = useGlobalContext();

  useEffect(() => {
    getStats();
    // eslint-disable-next-line
  }, []);

  if (isLoading) {
    return <Loading center />;
  }

  return (
    <>
      <StatsContainer />
      {monthlyApplications.length > 0 && (
        <ChartsContainer data={monthlyApplications} />
      )}
    </>
  );
};

export default Stats;
