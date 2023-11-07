import React, { useEffect, useState } from "react";
import axios from "axios";
import ParameterSlider from "./ParameterSlider";
import { Box, Slider, TextField, Button } from "@mui/material";
import CircularProgressGraph from "./CircularProgressGraph";
import DeviceCommunicationComponent from "./DeviceCommunicationComponent";
import styles from "./DeviceComponent.module.css";

function calculatePercentage(deviceData) {
  if (!deviceData || !Array.isArray(deviceData)) {
    return 0;
  }

  // Filter devices with online equal to true or null
  const onlineDevices = deviceData.filter((device) => device.online === true);

  // Calculate the percentage
  const percentage = (onlineDevices.length / deviceData.length) * 100;

  // Round to the nearest integer
  return Math.round(percentage);
}

function DeviceComponent({ deviceData }) {
  return (
    <div className={styles.outerFrame}>
      <div className={styles.circularProgressContainer}>
        <CircularProgressGraph percentage={calculatePercentage(deviceData)} />
      </div>
      <DeviceCommunicationComponent deviceData={deviceData} />
    </div>
  );
}
export default DeviceComponent;
