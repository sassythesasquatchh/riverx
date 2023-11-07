import React, { useEffect, useState } from "react";
import axios from "axios";
import { Autocomplete, TextField } from "@mui/material";
import Plot from "react-plotly.js";
import styles from "./Chart.module.css";

const apiKey = process.env.REACT_APP_API_KEY;

const calculatePercentageWithinLastHour = (deviceData) => {
  const currentTime = new Date().getTime();
  const oneHourAgo = currentTime - 3600000; // 3600000 milliseconds in an hour

  const devicesWithinLastHour = deviceData.filter((device) => {
    const timestamp = new Date(device.timestamp).getTime();
    return timestamp >= oneHourAgo;
  });

  const percentage = (devicesWithinLastHour.length / deviceData.length) * 100;
  return percentage;
};

const Chart = () => {
  const [data, setData] = useState([]);
  const [layout, setLayout] = useState([]);
  const [plotData, setPlotData] = useState([]);
  const [selectedY, setSelectedY] = useState("Temperature");

  const config = { responsive: true };

  // Fetch timeseries data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.akenza.io/v3/devices/0221948277bcd06f/query?topic=*&limit=500&skip=0",
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "x-api-key": apiKey,
            },
          }
        );

        const responseData = response.data;
        setData(responseData);
      } catch (error) {
        if (error.response && error.response.status === 502) {
          // Retry request if 502 error is encountered
          try {
            const response = await axios.get(
              "https://api.akenza.io/v3/devices/0221948277bcd06f/query?topic=*&limit=500&skip=0",
              {
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  "x-api-key": apiKey,
                },
              }
            );

            const responseData = retryResponse.data;
            setData(responseData);
          } catch (retryError) {
            console.log(retryError);
          }
        } else {
          console.log(error);
        }
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data.length === 0 || selectedY === "") {
      return; // Wait for data and selectedY to be set
    }

    let plotlyData = {
      name: selectedY,
      x: data.map((entry) => entry.timestamp),
      y: [],
      type: "line",
      mode: "lines",
      transforms: [
        {
          type: "sort",
          target: data.map((entry) => entry.timestamp),
          order: "ascending",
        },
      ],
    };

    let newLayout = {
      title: {
        text: "",
        font: {
          color: "#3D3D3D",
          size: 16,
        },
      },
      font: {
        family: "var(--default-font, var(--sans-serif))",
        color: "#979797",
      },
      showlegend: false,
      legend: {
        xanchor: "center",
        x: 0.45,
        y: -0.2,
        orientation: "h",
      },
      margin: {
        l: 72,
        r: 24,
        t: 24,
        b: 72,
        pad: 2,
      },
      hovermode: "closest",
      hoverlabel: {
        bgcolor: "#000",
        bordercolor: "#000",
        font: {
          color: "#fff",
          family: "var(--default-font, var(--sans-serif))",
          size: 12,
        },
      },
      clickmode: "select+event",
      dragmode: "select",
      xaxis: {
        title: {
          text: "Time",
          standoff: 6,
          font: {
            size: 12,
          },
        },
        type: "-",
        tickformat: "",
        automargin: true,
        fixedrange: true,
        gridcolor: "#fff",
        zerolinecolor: "#fff",
      },
      yaxis: {
        title: {
          standoff: 6,
          font: {
            size: 12,
          },
        },
        type: "linear",
        tickformat: "",
        automargin: true,
        fixedrange: true,
        zerolinecolor: "#DEDEDE",
      },
    };

    switch (selectedY) {
      case "Temperature":
        plotlyData.y = data.map((entry) => entry.data.temperature);
        plotlyData.marker = {
          color: "#247BC7",
        };
        newLayout.yaxis.title.text = "Temperature [C]";
        break;

      case "Pressure":
        plotlyData.y = data.map((entry) => entry.data.pressure);
        plotlyData.marker = {
          color: "#C15627",
        };
        newLayout.yaxis.title.text = "Pressure [mbar]";
        break;

      case "Turbidity":
        plotlyData.y = data
          .filter((entry) => entry.data.irOff !== 9999)
          .map((entry) => entry.data.irOff);
        plotlyData.marker = {
          color: "#C15627",
        };
        newLayout.yaxis.title.text = "Turbidity [NTU]";
        break;
      default:
        break;
    }

    setPlotData([plotlyData]);
    setLayout(newLayout);
  }, [data, selectedY]);

  return (
    // <div className={styles.lineCharttwovaluesParent}>
    <div>
      <Autocomplete
        className={styles.autocompletestandard}
        options={["Temperature", "Pressure", "Turbidity"]} // Available options for y variable
        defaultValue="Temperature"
        onChange={(event, value) => setSelectedY(value)}
        renderInput={(params) => (
          <TextField {...params} label="Select Y Variable" />
        )}
      />
      <Plot
        data={plotData}
        layout={layout}
        onInitialized={(figure) => this.setState(figure)}
        onUpdate={(figure) => this.setState(figure)}
      />
    </div>
  );
};

export default Chart;
