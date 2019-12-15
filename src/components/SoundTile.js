import React, {useState} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import Tooltip from '@material-ui/core/Tooltip';
import PropTypes from 'prop-types';


function ValueLabelComponent(props) {
    const { children, open, value } = props;
  
    const popperRef = React.useRef(null);
    React.useEffect(() => {
      if (popperRef.current) {
        popperRef.current.update();
      }
    });
  
    return (
      <Tooltip
        PopperProps={{
          popperRef,
        }}
        open={open}
        enterTouchDelay={0}
        placement="top"
        title={value}
      >
        {children}
      </Tooltip>
    );
}

ValueLabelComponent.propTypes = {
    children: PropTypes.element.isRequired,
    open: PropTypes.bool.isRequired,
    value: PropTypes.number.isRequired,
};


const VolumeSlider = withStyles({
    root: {
      color: '#F8F9FA',
      height: 5,
    },
    thumb: {
      height: 15,
      width: 15,
      backgroundColor: '#fff',
      marginTop: -6,
      marginLeft: -12,
    },
    active: {},
    track: {
      height: 3,
      borderRadius: 4,
    },
    rail: {
      height: 3,
      borderRadius: 4,
    },
})(Slider);

const SoundTile = (props) => {
  const [volume, setVolume] = useState(props.volume)
  const [active, setActive] = useState(props.active)

  // original set value for volume slider
  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };

  const changeVolume = (event, newVolume) => {
    setVolume(newVolume)
  };

  const toggleActive = (event) => {
      setActive(!active);
  };

  return (
    <div style={{
      color: '#F8F9FA',
      textAlign: 'center',
      opacity: active? '30%':'100%'
    }}>

      <i className={props.icon} onClick={toggleActive} style={{fontSize:"80px", margin:"20px"}}/>
      <Grid container spacing={1}>
        <Grid item>
          <i className="fas fa-volume-down"></i>
        </Grid>
        <Grid item xs>
          <VolumeSlider 
            value={volume} 
            ValueLabelComponent={ValueLabelComponent} 
            onChange={changeVolume} 
            aria-labelledby="VolumeSlider" 
          />
        </Grid>
        <Grid item>
          <i className="fas fa-volume-up"></i>
        </Grid>
      </Grid>
    </div>
        
    )
}

export default SoundTile;