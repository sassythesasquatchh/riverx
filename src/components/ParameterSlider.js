import { Box, Slider, TextField } from "@mui/material";
import styles from "./ParameterSlider.module.css";
import * as React from 'react';

const ParameterSlider = ({ parentCallback, parameter, min, max, step }) => {

  const [value, setValue] = React.useState((max+min)/2);
  
  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
    parentCallback(newValue);
  };

  const handleInputChange = (event) => {
    setValue(event.target.value === '' ? '' : Number(event.target.value));
    parentCallback(value);
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 100) {
      setValue(100);
    }
  };

  return (
    <div className={styles.phParent}>
      <h4 className={styles.ph}>{parameter}</h4>
      <div className={styles.slidercontinuousParent}>
        <Box className={styles.slidercontinuous}>
          <Slider
            color="primary"
            defaultValue={(max+min)/2}
            min={min}
            max={max}
            orientation="horizontal"
            step={step}
            onChange={handleSliderChange}
            value={typeof value === 'number' ? value : 0}
          />
        </Box>
        <TextField
          className={styles.inputstandard}
          sx={{ width: 96 }}
          color="primary"
          variant="standard"
          defaultValue="7"
          type="number"
          size="medium"
          margin="none"
          onChange={handleInputChange}
          onBlur={handleBlur}
          value={value}
          inputProps={{
            step: step,
            min: min,
            max: max,
            type: 'number',
            'aria-labelledby': 'input-slider',
          }}
        />
      </div>
    </div>
  );
};

export default ParameterSlider;
