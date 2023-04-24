import { Autocomplete, TextField } from "@mui/material";
import styles from "./Chart.module.css";

const Chart = () => {
  return (
    <div className={styles.lineCharttwovaluesParent}>
      <div className={styles.lineCharttwovalues}>
        <div className={styles.lineChart}>
          <div className={styles.lineChartChild} />
          <div className={styles.text}>Text</div>
          <div className={styles.text1}>Text</div>
          <div className={styles.text2}>Text</div>
          <div className={styles.text3}>Text</div>
          <div className={styles.text4}>Text</div>
          <div className={styles.text5}>Text</div>
          <div className={styles.text6}>Text</div>
          <div className={styles.text7}>Text</div>
          <div className={styles.text8}>Text</div>
          <div className={styles.text9}>Text</div>
          <div className={styles.text10}>Text</div>
          <div className={styles.text11}>Text</div>
          <div className={styles.div}>0</div>
          <div className={styles.div1}>10</div>
          <div className={styles.div2}>20</div>
          <div className={styles.div3}>30</div>
          <div className={styles.div4}>40</div>
          <div className={styles.div5}>50</div>
          <div className={styles.div6}>60</div>
          <div className={styles.div7}>70</div>
          <div className={styles.div8}>80</div>
          <div className={styles.div9}>90</div>
          <div className={styles.div10}>100</div>
          <img className={styles.gridV1Icon} alt="" src="/grid-v-1.svg" />
          <img className={styles.gridV2Icon} alt="" src="/grid-v-2.svg" />
          <img className={styles.gridV3Icon} alt="" src="/grid-v-3.svg" />
          <img className={styles.gridV4Icon} alt="" src="/grid-v-4.svg" />
          <img className={styles.gridV5Icon} alt="" src="/grid-v-5.svg" />
          <img className={styles.gridV6Icon} alt="" src="/grid-v-6.svg" />
          <img className={styles.gridV7Icon} alt="" src="/grid-v-7.svg" />
          <img className={styles.gridV8Icon} alt="" src="/grid-v-8.svg" />
          <img className={styles.gridV9Icon} alt="" src="/grid-v-9.svg" />
          <img className={styles.gridV10Icon} alt="" src="/grid-v-10.svg" />
          <img className={styles.gridV11Icon} alt="" src="/grid-v-11.svg" />
          <img className={styles.gridV12Icon} alt="" src="/grid-v-12.svg" />
          <img className={styles.gridV1Icon1} alt="" src="/grid-v-13.svg" />
          <img className={styles.gridV2Icon1} alt="" src="/grid-v-13.svg" />
          <img className={styles.gridV3Icon1} alt="" src="/grid-v-13.svg" />
          <img className={styles.gridV4Icon1} alt="" src="/grid-v-13.svg" />
          <img className={styles.gridV5Icon1} alt="" src="/grid-v-13.svg" />
          <img className={styles.gridV6Icon1} alt="" src="/grid-v-13.svg" />
          <img className={styles.gridV7Icon1} alt="" src="/grid-v-13.svg" />
          <img className={styles.gridV8Icon1} alt="" src="/grid-v-13.svg" />
          <img className={styles.gridV9Icon1} alt="" src="/grid-v-13.svg" />
          <img className={styles.gridV10Icon1} alt="" src="/grid-v-13.svg" />
          <img className={styles.gridV11Icon1} alt="" src="/grid-v-13.svg" />
          <img className={styles.line1Icon} alt="" src="/line-1.svg" />
          <img className={styles.line2Icon} alt="" src="/line-2.svg" />
        </div>
      </div>
      <Autocomplete
        className={styles.autocompletestandard}
        disablePortal
        options={[
          "pH",
          "Conductivity",
          "Light Intensity",
          "Temperature",
          "Humidity",
          "Oxygen",
          "CO2",
        ]}
        renderInput={(params) => (
          <TextField
            {...params}
            color="primary"
            label="Label"
            variant="standard"
            placeholder=""
            helperText=""
          />
        )}
        defaultValue="pH"
        size="medium"
      />
    </div>
  );
};

export default Chart;
