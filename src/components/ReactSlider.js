import { Form } from "react-bootstrap";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

export default function ReactSlider(props) {
  const { sliderVal, changeSliderVal, sliderDescription, classes, min, max, start, step } = props;

  const valuetext = (val) => {
    return val;
  };

  const handleChange = (event, newVal) => {
    changeSliderVal(newVal);
  };

  return (
    <Form.Group>
      <div className={classes.root}>
        <Typography id='discrete-slider' gutterBottom>
          {sliderDescription}
        </Typography>
        <Slider
          defaultValue={start}
          getAriaValueText={valuetext}
          aria-labelledby='discrete-slider'
          valueLabelDisplay='auto'
          onChange={handleChange}
          value={sliderVal}
          step={step}
          marks
          min={min}
          max={max}
        />
      </div>
    </Form.Group>
  );
}
