import React, {useRef, useState} from "react";
import {useFrame,useThree, useLoader} from "@react-three/fiber";
import {Physics,useBox} from "@react-three/cannon";
import * as THREE from "three";

const Dollar = ({ position }) => {
    const { viewport } = useThree();
    const [falling, setFalling] = useState(true);
    let swing = 0; // swing angle
    const texture = useLoader(THREE.TextureLoader,'/dollar.jpg');

    const [ref, api] = useBox((index) => ({

        mass: 1, position: [4 - Math.random() * 8, viewport.height, 0, 0], args: [1.2],

    }))

    useFrame(() => {
        if(ref.current){
            if (falling) {

                swing += 0.01; // increase swing angle
                api.rotation.set(Math.sin(swing), Math.sin(swing), Math.sin(swing));
                ref.current.rotation.z = Math.sin(swing) ; // apply swing rotation
            }
        }

    });




    return (
        <Physics>
            <instancedMesh ref={ref} castShadow receiveShadow args={[null, null, 100]}>            <boxBufferGeometry args={[5,2,0.1]} />
            <meshStandardMaterial map={texture} />
            </instancedMesh>
        </Physics>
    );
};

export  default Dollar;
