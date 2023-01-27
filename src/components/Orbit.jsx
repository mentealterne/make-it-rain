import {extend, Object3DNode, useThree} from "react-three-fiber";
import React from "react";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
extend({OrbitControls});

const Orbit = () => {
    const {camera,gl} = useThree();
    return (

        <orbitControls args={[camera,gl.domElement]}/>
    )
}


export default Orbit
