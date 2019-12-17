import birds from '../sounds/birds.mp3'
import cafe from '../sounds/cafe.mp3'
import fire from '../sounds/fire.mp3'
import heavy_rain from '../sounds/heavy_rain.mp3'
import light_rain from '../sounds/light_rain.mp3'
import night from '../sounds/night.mp3'
import river from '../sounds/river.mp3'
import thunder from '../sounds/thunder.mp3'
import train from '../sounds/train.mp3'
import waves from '../sounds/waves.mp3'

var tilesConfig = {
    "fire": {
        name: "fire",
        active: false,
        sound: fire,
        icon: "fas fa-fire",
        volume: 30
    },
    "river": {
        name: "river",
        active: false,
        sound: river,
        icon: "fas fa-tint",
        volume: 30
    },
    "train": {
        name: "train",
        active: false,
        sound: train,
        icon: "fas fa-train",
        volume: 30
    }, 
    "light_rain": {
        name: "light_rain",
        active: false,
        sound: light_rain,
        icon: "fas fa-cloud-rain",
        volume: 30
    },
    "heavy_rain": {
        name: "heavy_rain",
        active: false,
        sound: heavy_rain,
        icon: "fas fa-cloud-showers-heavy",
        volume: 30
    },
    "thunder": {
        name: "thunder",
        active: false,
        sound: thunder,
        icon: "fas fa-bolt",
        volume: 30
    },
    "birds": {
        name: "birds",
        active: false,
        sound: birds,
        icon: "fas fa-dove",
        volume: 30
    },
    "cafe": {
        name: "cafe",
        active: false,
        sound: cafe,
        icon: "fas fa-coffee",
        volume: 30
    },
    "waves": {
        name: "waves",
        active: false,
        sound: waves,
        icon: "fas fa-water",
        volume: 30
    },
    "night": {
        name: "night",
        active: false,
        sound: night,
        icon: "fas fa-moon",
        volume: 30
    },
}

export default tilesConfig;