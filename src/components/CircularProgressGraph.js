import React, { useEffect, useState } from "react";
import { Paper, Typography } from "@mui/material";
import Plot from "react-plotly.js";
import styles from "./CircularProgressGraph.module.css";

const CircularProgressGraph = ({ percentage }) => {
  return (
    <div className={styles.circularProgressContainer}>
      <Plot
        data={[
          {
            values: [percentage, 100 - percentage],
            labels: ["Online", "Offline"],
            type: "pie",
            marker: {
              colors: ["#00e676", "lightgray"],
            },
            hole: 0.7,
            textinfo: "label+percent",
            textposition: "inside",
          },
        ]}
        layout={{
          showlegend: false,
          margin: { t: 0, b: 0, l: 0, r: 0 },
          plot_bgcolor: "transparent", // Set Plotly chart background to transparent
          paper_bgcolor: "transparent",
          width: 181,
          height: 181,
        }}
      />
    </div>
  );
};

export default CircularProgressGraph;
