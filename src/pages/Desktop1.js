import Chart from "../components/Chart";
import StatusCard from "../components/StatusCard";
import CircularProgressGraph from "../components/CircularProgressGraph";
import styles from "./Desktop1.module.css";
import React, { useEffect, useState } from "react";
import DeviceComponent from "../components/DeviceComponent";
import axios from "axios";

const apiKey = process.env.REACT_APP_API_KEY;

function parseDeviceData(jsonData) {
  return jsonData.content.map((device) => ({
    id: device.id,
    name: device.name,
    online: device.online,
  }));
}

const Desktop1 = () => {
  const [data, setData] = useState([]);

  // Fetch device data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.akenza.io/v3/assets?workspaceId=297f86eb45cdac04&type=DEVICE",
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "x-api-key": apiKey,
            },
          }
        );

        const parsedData = parseDeviceData(response.data);
        setData(parsedData);
      } catch (error) {
        if (error.response && error.response.status === 502) {
          // Retry request if 502 error is encountered
          try {
            const retryResponse = await axios.get(
              // Change this to retryResponse
              "https://api.akenza.io/v3/assets?workspaceId=297f86eb45cdac04&type=DEVICE",
              {
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  "x-api-key": apiKey,
                },
              }
            );

            const responseData = retryResponse.data; // Change this to retryResponse
            const parsedData = parseDeviceData(responseData);
            setData(parsedData);
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

  return (
    <div className={styles.desktop1}>
      <div className={styles.sidePanel} />
      <div className={styles.modularAeroponicsParent}>
        <h1 className={styles.modularAeroponics}>RiverX</h1>
        {/* <h5 className={styles.anIotModular}>
          An IoT modular aeroponics agricultural system can revolutionize the
          way we grow crops by combining the power of the internet of things
          (IoT) with the efficiency of aeroponic farming. This system provides
          numerous benefits, including the ability to grow fresh produce in any
          environment, regardless of the climate or soil quality. The modular
          design of this system allows for easy scalability and customization,
          making it ideal for use in both small and large-scale farming
          operations. Additionally, the use of IoT technology enables farmers to
          remotely monitor and control the system, providing real-time insights
          into plant health, nutrient levels, and more.
        </h5> */}
        <Chart />
        <DeviceComponent deviceData={data} />
        {/* <StatusCard /> */}
      </div>
      <div className={styles.sidePanel1} />
    </div>
  );
};

export default Desktop1;
