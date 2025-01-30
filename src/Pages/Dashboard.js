import React, { useState } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import Leftmenu from "../Leftmenu";

const Dashboard = () => {
  const [selectedMetrics, setSelectedMetrics] = useState({
    SPO2: false,
    BPM: false,
    TEMP: false,
  });

  const graphData = [
    { name: "SPO2", data: [88, 89, 82, 97, 94, 86, 98], color: "blue" },
    { name: "BPM", data: [80, 82, 94, 86, 94, 98, 87], color: "green" },
    { name: "TEMP", data: [38, 32, 41, 36, 45, 40, 34], color: "red" },
  ];

  const [error, setError] = useState("");
  const [chartOptions, setChartOptions] = useState({
    title: { text: "" },
    xAxis: { categories: ["12", "1", "2", "3", "4", "5", "6"] },
    credits: {
      enabled: false, // Disable the watermark
    },
    series: [{ name: "No Data", data: [] }], // Default empty graph
  });

  const handleCheckboxChange = (metric) => {
    setSelectedMetrics((prev) => ({
      ...prev,
      [metric]: !prev[metric],
    }));
  };

  const handleApply = () => {
    const selectedSeries = graphData
      .filter((series) => selectedMetrics[series.name])
      .map((series) => ({ ...series })); // Deep copy to prevent reference issues

    if (selectedSeries.length === 0) {
      setError("Please check at least one checkbox to see the graph.");
      setChartOptions((prev) => ({
        ...prev,
        series: [{ name: "No Data", data: [] }], // Keep graph but no data
      }));
    } else {
      setError("");
      setChartOptions((prev) => ({
        ...prev,
        series: selectedSeries, // Update graph with selected metrics
      }));
    }
  };

  return (
    <div className="flex h-screen">
      <Leftmenu />

      {/* Main Content */}
      <div className="flex-1 p-4 bg-gray-50 overflow-auto sm:p-6"> {/* Adjust padding for smaller screens */}
        {/* Header */}
        <div className="bg-white p-4 shadow-sm rounded-md">
          <div className="flex justify-end items-center space-x-4">
            <span className="text-gray-600">🔔</span>
            <span className="text-gray-600">Admin ▼</span>
          </div>
        </div>

        {/* Graph Section */}
        <div className="bg-white p-4 mt-4 shadow-sm rounded-md">
          <div className="flex flex-col sm:flex-row sm:space-x-4 mb-4"> {/* Stack items vertically on smaller screens */}
            <select className="border p-2 rounded-md mb-2 sm:mb-0">
              <option>PROTOTYPE_001</option>
            </select>
            <select className="border p-2 rounded-md mb-2 sm:mb-0">
              <option>Cow</option>
            </select>
            <input type="date" className="border p-2 rounded-md mb-2 sm:mb-0" />
            <div className="flex flex-col sm:flex-row sm:space-x-2 mb-2 sm:mb-0">
              {Object.keys(selectedMetrics).map((metric) => (
                <label key={metric} className="flex items-center space-x-1">
                  <input
                    type="checkbox"
                    className="w-5 h-5"
                    checked={selectedMetrics[metric]}
                    onChange={() => handleCheckboxChange(metric)}
                  />
                  <span>{metric}</span>
                </label>
              ))}
            </div>
            <button
              onClick={handleApply}
              className="bg-green-500 text-white px-4 py-2 rounded-md"
            >
              Apply
            </button>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        </div>

        {/* Table Section */}
        <div className="bg-white p-4 mt-4 shadow-sm rounded-md">
          <h2 className="font-bold mb-2">TABLE</h2>
          <div className="overflow-x-auto"> {/* Ensure horizontal scrolling only for this section */}
            <table className="w-full min-w-max border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2">Device</th>
                  <th className="border p-2">Animal Type</th>
                  <th className="border p-2">Realtime</th>
                  <th className="border p-2">Itemp</th>
                  <th className="border p-2">Heart Rate</th>
                  <th className="border p-2">Respiration Rate</th>
                  <th className="border p-2">Activity Level</th>
                  <th className="border p-2">Location</th>
                  <th className="border p-2">Column 9</th>
                  <th className="border p-2">Column 10</th>
                  <th className="border p-2">Column 11</th>
                  <th className="border p-2">Column 12</th>
                  <th className="border p-2">Column 13</th>
                  <th className="border p-2">Column 14</th>
                  <th className="border p-2">Column 15</th>
                  <th className="border p-2">Column 16</th>
                  <th className="border p-2">Column 17</th>
                  <th className="border p-2">Column 18</th>
                  <th className="border p-2">Column 19</th>
                  <th className="border p-2">Column 20</th>
                  <th className="border p-2">Column 21</th>
                  <th className="border p-2">Column 22</th>
                  <th className="border p-2">Column 23</th>
                  <th className="border p-2">Column 24</th>
                  <th className="border p-2">Column 25</th>
                  <th className="border p-2">Column 26</th>
                  <th className="border p-2">Column 27</th>
                  <th className="border p-2">Column 28</th>
                </tr>
              </thead>
              <tbody>
                {/* Example Row with 28 Columns */}
                <tr className="hover:bg-gray-50">
                  <td className="border p-2">PROTOTYPE_001</td>
                  <td className="border p-2">Cow</td>
                  <td className="border p-2">2080-01-06 5:46:06</td>
                  <td className="border p-2">29.60</td>
                  <td className="border p-2">78 BPM</td>
                  <td className="border p-2">20 Breaths/min</td>
                  <td className="border p-2">Active</td>
                  <td className="border p-2">Barn A</td>
                  <td className="border p-2">Data 1</td>
                  <td className="border p-2">Data 2</td>
                  <td className="border p-2">Data 3</td>
                  <td className="border p-2">Data 4</td>
                  <td className="border p-2">Data 5</td>
                  <td className="border p-2">Data 6</td>
                  <td className="border p-2">Data 7</td>
                  <td className="border p-2">Data 8</td>
                  <td className="border p-2">Data 9</td>
                  <td className="border p-2">Data 10</td>
                  <td className="border p-2">Data 11</td>
                  <td className="border p-2">Data 12</td>
                  <td className="border p-2">Data 13</td>
                  <td className="border p-2">Data 14</td>
                  <td className="border p-2">Data 15</td>
                  <td className="border p-2">Data 16</td>
                  <td className="border p-2">Data 17</td>
                  <td className="border p-2">Data 18</td>
                  <td className="border p-2">Data 19</td>
                  <td className="border p-2">Data 20</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
