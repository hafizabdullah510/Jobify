import React, { useState } from "react";
import { BarChartComponent, AreaChartComponent } from "./index";
import Wrapper from "../assets/wrappers/ChartsContainer";
const ChartsContainer = ({ data }) => {
  const [barChart, setBarChart] = useState(true);
  console.log(data);
  return (
    <Wrapper>
      <h4>Monthly Applications</h4>
      <button type="button" onClick={() => setBarChart(!barChart)}>
        {barChart ? "AreaChart" : "BarChart"}
      </button>
      {barChart ? (
        <BarChartComponent data={data} />
      ) : (
        <AreaChartComponent data={data} />
      )}
    </Wrapper>
  );
};

export default ChartsContainer;
