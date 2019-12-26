import React, {useState, useContext} from 'react';
import { withStyles } from '@material-ui/core/styles';import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import Tooltip from '@material-ui/core/Tooltip';
import PropTypes from 'prop-types';
import { ConfigContext } from '../ConfigContext.js'



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
  const [config, setConfig] = useContext(ConfigContext);
  var volume = config[props.name].volume;
  var active = config[props.name].active;
  // const [volume, setVolume] = useState(volume)
  // const [active, setActive] = useState(active)
  const [audio] = useState(() => {
    let audio = new Audio(props.sound)

    audio.addEventListener('ended', function () {
      this.currentTime = 0;
      this.play();
    }, false);

    active? audio.play(): audio.pause();
    audio.volume = volume/100;

    return audio
  })

  const changeVolume = (event, newVolume) => {
    audio.volume = newVolume/100;

    var newConfig = config
    newConfig[props.name].volume = newVolume;
    setConfig(newConfig);
    console.log(config[props.name].volume);

    // setVolume(newVolume)
  };

  const toggleActive = (event) => {
    if(active){
      audio.pause();
    }
    else{
      audio.play();
    }

    var newConfig = config
    newConfig[props.name].active = !newConfig[props.name].active;
    setConfig(newConfig);
    console.log(config[props.name].active);

    // setActive(!active);
  };

  return (
    <div style={{
      color: '#F8F9FA',
      textAlign: 'center',
      opacity: active? '100%':'30%'
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