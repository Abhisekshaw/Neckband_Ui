import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeviceAndAnimal } from "../Slices/dashSlice";
import { GetDevice } from "../Slices/deviceSlice";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import Leftmenu from "../Leftmenu";
import $ from "jquery";
import "bootstrap-daterangepicker/daterangepicker.css";
import moment from "moment";
import "bootstrap-daterangepicker";
import { useNavigate } from "react-router-dom"; 

const Dashboard = () => {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedDevice, setSelectedDevice] = useState("");
  const [selectedAnimal, setSelectedAnimal] = useState("");
  const dateRangePickerRef = useRef(null);
  const [selectedMetrics, setSelectedMetrics] = useState({
    SPO2: false,
    BPM: false,
    TEMP: false,
  });
  const [error, setError] = useState("");
  const [tableData, setTableData] = useState([]);
  const navigate = useNavigate();

  // Fetch device and animal data from Redux state
  const { response, loading, dash_error } = useSelector(
    (state) => state.dashSlice || { response: "", loading: false }
  );

  //Fetch Device Data from Redux State
  const { device_loading, device_response, device_error } = useSelector(
    (state) =>
      state.deviceSlice || { device_response: "", device_loading: false }
  );

  const header = {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
  };

  useEffect(() => {
    dispatch(DeviceAndAnimal({ data: {}, header }));
  }, [dispatch]);

  // Get filtered animal types based on the selected device
  const filteredAnimal =
    response?.data?.find((device) => device._id === selectedDevice)
      ?.animal_type || [];

  const [chartOptions, setChartOptions] = useState({
    title: { text: "" },
    xAxis: { categories: [] },
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
    const data = {
      Device: selectedDevice,
      animal_type: selectedAnimal,
      startdate: startDate,
      enddate: endDate,
    };

    // Dispatch the GetDevice action with filters
    dispatch(GetDevice({ data, header })).then((response) => {
      const fetchedData = response.payload.data;

      if (fetchedData && fetchedData.length > 0) {
        // const times = fetchedData.map((entry) => entry.realtime);
        const times = fetchedData.map((entry) => moment.utc(entry.createdAt).format("YYYY-MM-DD hh:mm A"));
        const SPO2Data = fetchedData.map((entry) => entry.spO2);
        const BPMData = fetchedData.map((entry) => entry.bpm);
        const IrtempData = fetchedData.map((entry) => entry.irtemp);

        // Map the fetched data to the Highcharts format
        setChartOptions((prev) => ({
          ...prev,
          xAxis: {
            categories: times, // Map time to the x-axis
          },
          series: [
            selectedMetrics.SPO2 && {
              name: "SPO2",
              data: SPO2Data,
              color: "blue",
            },
            selectedMetrics.BPM && {
              name: "BPM",
              data: BPMData,
              color: "green",
            },
            selectedMetrics.TEMP && {
              name: "Irtemp",
              data: IrtempData,
              color: "red",
            },
          ].filter(Boolean), // Remove empty series if metrics are not selected
        }));

        setTableData(fetchedData);
      } else {
        setTableData([]);
      }
    });

    // const selectedSeries = graphData
    //   .filter((series) => selectedMetrics[series.name])
    //   .map((series) => ({ ...series })); // Deep copy to prevent reference issues

    // if (selectedSeries.length === 0) {
    //   setError("Please check at least one checkbox to see the graph.");
    //   setChartOptions((prev) => ({
    //     ...prev,
    //     series: [{ name: "No Data", data: [] }], // Keep graph but no data
    //   }));
    // } else {
    //   setError("");
    //   setChartOptions((prev) => ({
    //     ...prev,
    //     series: selectedSeries, // Update graph with selected metrics
    //   }));
    // }
  };
  // const [startDate, setStartDate] = useState(moment().startOf("day").format("M/DD/YYYY hh:mm:ss A"));
  // const [endDate, setEndDate] = useState(moment().endOf("day").format("M/DD/YYYY hh:mm:ss A"));

  useEffect(() => {
    setTimeout(() => {
      if (dateRangePickerRef.current) {
        const newStartDate = moment().startOf("day");
        const newEndDate = moment(newStartDate).endOf("day");

        $(dateRangePickerRef.current).daterangepicker(
          {
            timePicker: true,
            startDate: newStartDate,
            endDate: newEndDate,
            maxDate: moment().endOf("day"), // Disable future dates
            locale: { format: "M/DD/YYYY hh:mm A" },
          },
          (start, end) => {
            setStartDate(start.format("M/DD/YYYY hh:mm:ss A"));
            setEndDate(end.format("M/DD/YYYY hh:mm:ss A"));
          }
        );

        // $(".daterangepicker .calendar-time").css({
        //   "pointer-events": "none",
        //   cursor: "not-allowed",
        //   opacity: "0.5",
        // });
      }
    }, 100);

    return () => {
      if ($(dateRangePickerRef.current).data("daterangepicker")) {
        $(dateRangePickerRef.current).data("daterangepicker").remove();
      }
    };
  }, []);
    // Handle logout
    const handleLogout = () => {
      window.localStorage.removeItem("token"); // Remove the token
      navigate("/"); // Redirect to the login page
    };

  return (
    <div className="flex h-screen">
      <Leftmenu />

      {/* Main Content */}
      <div className="flex-1 p-4 bg-gray-50 overflow-auto sm:p-6">
        {/* Header */}
        <div className="bg-white p-4 shadow-sm rounded-md">
          <div className="flex justify-end items-center space-x-4">
            <span className="text-gray-600">🔔</span>
            <span className="text-gray-600">Admin ▼</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-1 rounded-md"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Graph Section */}
        <div className="bg-white p-4 mt-4 shadow-sm rounded-md">
          {/* Wrap All Inputs in a Single Line */}
          <div className="flex items-center space-x-4 overflow-x-auto flex-wrap sm:flex-nowrap">
            {/* Device Dropdown */}
            <select
              className="border p-2 rounded-md h-10 w-48"
              value={selectedDevice}
              onChange={(e) => {
                setSelectedDevice(e.target.value);
                setSelectedAnimal("");
              }}
            >
              <option value="">Select Device</option>
              {response?.data?.map((device) => (
                <option key={device._id} value={device._id}>
                  {device._id}
                </option>
              ))}
            </select>

            {/* Animal Dropdown */}
            <select
              className="border p-2 rounded-md h-10 w-48"
              value={selectedAnimal}
              onChange={(e) => setSelectedAnimal(e.target.value)}
              disabled={!selectedDevice}
            >
              <option value="">Select Animal</option>
              {filteredAnimal.map((animal, index) => (
                <option key={index} value={animal}>
                  {animal}
                </option>
              ))}
            </select>

            {/* Date Range Picker */}
            <input
              ref={dateRangePickerRef}
              className="border p-2 rounded-md h-10 w-48"
              placeholder="Select Date Range"
            />

            {/* Checkbox Section */}
            <div className="flex space-x-4">
              {Object.keys(selectedMetrics).map((metric) => (
                <label key={metric} className="flex items-center space-x-1">
                  <input
                    type="checkbox"
                    className="w-5 h-5"
                    checked={selectedMetrics[metric]}
                    onChange={() => handleCheckboxChange(metric)}
                  />
                  <span className="text-sm">{metric}</span>
                </label>
              ))}
            </div>

            {/* Apply Button (Reduced Height) */}
            <button
              onClick={handleApply}
              className="bg-green-500 text-white px-4 py-1 rounded-md h-8"
            >
              Apply
            </button>
          </div>

          {error && <p className="text-red-500">{error}</p>}
          <div className="mt-8">
          <h2 className="font-bold mt-6 mb-2">GRAPH</h2>
            <HighchartsReact highcharts={Highcharts} options={chartOptions} />
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white p-4 mt-4 shadow-sm rounded-md">
          <h2 className="font-bold mb-2">TABLE</h2>
          <div className="overflow-x-auto">
            {" "}
            {/* Ensure horizontal scrolling only for this section */}
            <table className="w-full min-w-max border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2">Device</th>
                  <th className="border p-2">Animal Type</th>
                  <th className="border p-2">Realtime</th>
                  <th className="border p-2">Irtemp</th>
                  <th className="border p-2">Bpm</th>
                  <th className="border p-2">Spo2</th>
                  <th className="border p-2">Pitch</th>
                  <th className="border p-2">Posture</th>
                  <th className="border p-2">Rumination</th>
                  <th className="border p-2">DeviceOrientation</th>
                  <th className="border p-2">Latitude</th>
                  <th className="border p-2">Longitude</th>
                  <th className="border p-2">Battery Percentage</th>
                  <th className="border p-2">CV</th>
                  <th className="border p-2">Abnormal_flag</th>
                  <th className="border p-2">Imei</th>
                  <th className="border p-2">Sim No</th>
                  <th className="border p-2">Esp32 No</th>
                  <th className="border p-2">Esp32Mdate</th>
                  <th className="border p-2">accX</th>
                  <th className="border p-2">accY</th>
                  <th className="border p-2">accZ</th>
                  <th className="border p-2">GyroX</th>
                  <th className="border p-2">GyroY</th>
                  <th className="border p-2">GyroZ</th>
                  <th className="border p-2">magX</th>
                  <th className="border p-2">magY</th>
                  <th className="border p-2">magz</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border p-2">{row.Device}</td>
                    <td className="border p-2">{row.animal_type}</td>
                    <td className="border p-2">{row.realtime}</td>
                    <td className="border p-2">{row.irtemp}</td>
                    <td className="border p-2">{row.bpm}</td>
                    <td className="border p-2">{row.spO2}</td>
                    <td className="border p-2">{row.Pitch}</td>
                    <td className="border p-2">{row.Posture}</td>
                    <td className="border p-2">{row.Rumination}</td>
                    <td className="border p-2">{row.deviceOrientation}</td>
                    <td className="border p-2">{row.latitude}</td>
                    <td className="border p-2">{row.longitude}</td>
                    <td className="border p-2">{row.batteryPercentage}</td>
                    <td className="border p-2">{row.cv}</td>
                    <td className="border p-2">{row.abnormal_flag}</td>
                    <td className="border p-2">{row.imei}</td>
                    <td className="border p-2">{row.simNo}</td>
                    <td className="border p-2">{row.esp32No}</td>
                    <td className="border p-2">{row.esp32Mdate}</td>
                    <td className="border p-2">{row.accX}</td>
                    <td className="border p-2">{row.accY}</td>
                    <td className="border p-2">{row.accZ}</td>
                    <td className="border p-2">{row.GyroX}</td>
                    <td className="border p-2">{row.GyroY}</td>
                    <td className="border p-2">{row.GyroZ}</td>
                    <td className="border p-2">{row.magX}</td>
                    <td className="border p-2">{row.magY}</td>
                    <td className="border p-2">{row.magZ}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
