import "./js/loading.js"
import "./js/tilt.js"
import {handleObjectTilt, resetTilt} from "./js/tilt.js";

document.querySelector("#profile-img").addEventListener("mousemove",handleObjectTilt);
document.querySelector("#profile-img").addEventListener("mouseleave",resetTilt);