import React, { useEffect, useState } from "react";
import axios from "axios";
import ParameterSlider from "./ParameterSlider";
import { Autocomplete, TextField, Button } from "@mui/material";
import styles from "./DeviceCommunicationComponent.module.css";

const apiKey = process.env.REACT_APP_API_KEY;

function DeviceCommunicationComponent({ deviceData }) {
  const [interval, setInterval] = useState(15);
  const [selectedDevice, setSelectedDevice] = useState();

  const deviceNames = deviceData.map((device) => device.name);

  const intervalCallbackFunction = (childData) => {
    setInterval(childData);
  };

  const findDeviceIdByName = () => {
    for (const i in deviceData) {
      if (deviceData[i].name === selectedDevice) {
        return deviceData[i].id;
      }
    }
    // Return null or any other value to indicate that the device name was not found
    return null;
  };

  const intToHex = (integer) => {
    // Use the toString method with a radix of 16 to convert to hexadecimal
    const hexString = integer.toString(16);

    // Ensure that the result has at least two characters (e.g., '0A' instead of 'A')
    const paddedHexString =
      hexString.length % 2 === 0 ? hexString : "0" + hexString;

    return paddedHexString;
  };

  const handleClick = () => {
    const deviceId = findDeviceIdByName();
    if (deviceId === null) {
      console.error("Device not found");
      return;
    }
    const url = `https://api.akenza.io/v3/devices/${deviceId}/downlink`;

    const requestBody = {
      raw: true,
      loraDownlink: {
        port: 2,
        payloadHex: intToHex(interval),
        confirmed: false,
      },
    };

    axios
      .post(url, requestBody, {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        },
      })
      .then((response) => {
        // Handle the success response, e.g., update the UI
        console.log("POST request successful:", response.data);
        // You can also update the UI here
      })
      .catch((error) => {
        // Handle the error, e.g., show an error message to the user
        console.error("POST request error:", error);
        // You can show an error message to the user here
      });
  };
  return (
    <div className={styles.outerFrame}>
      <ParameterSlider
        parentCallback={intervalCallbackFunction}
        parameter="Report Interval"
        min={0}
        max={120}
        step={5}
      />

      <Autocomplete
        className={styles.autocomplete}
        options={deviceNames} // Available options for y variable
        defaultValue=""
        onChange={(event, value) => setSelectedDevice(value)}
        renderInput={(params) => (
          <TextField {...params} label="Select Device" />
        )}
      />

      <Button
        className={styles.button}
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        Send Update
      </Button>
    </div>
  );
}

export default DeviceCommunicationComponent;
