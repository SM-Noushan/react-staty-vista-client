import PropTypes from "prop-types";
import { Chart } from "react-google-charts";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../../Shared/LoadingSpinner";

const options = {
  title: "Sales Over Time",
  curveType: "function",
  legend: { position: "bottom" },
  series: [{ color: "#F43F5E" }],
};

const SalesLineChart = ({ data }) => {
  const [loading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  return loading ? (
    <LoadingSpinner smallHeight={true} />
  ) : data.length > 1 ? (
    <Chart chartType="LineChart" width="100%" data={data} options={options} />
  ) : (
    <>
      <LoadingSpinner smallHeight={true} />
      <p className="mx-auto">Not Enough Data available for this section!</p>
    </>
  );
};

SalesLineChart.propTypes = {
  data: PropTypes.array,
};

export default SalesLineChart;
