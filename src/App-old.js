import React, { useRef, useState } from 'react';
import { Canvas, useRender } from 'react-three-fiber';
import {Physics, useBox } from '@react-three/cannon';
import {useFrame} from "@react-three/fiber";

const Feather = ({ position }) => {
    const ref = useRef();
    const [falling, setFalling] = useState(true);
    let swing = 0; // swing angle

    useFrame(() => {
        if (falling) {
            ref.current.position.y -= 0.05;
            swing += 0.1; // increase swing angle
            ref.current.rotation.z = Math.sin(swing) * 0.1; // apply swing rotation
        }
    });

    useBox({
        mass: 1,
        args: [0.1, 0.1, 0.1],
        onCollide: () => setFalling(false)
    }, ref);

    return (
        <mesh ref={ref} position={position}>
            <boxBufferGeometry />
            <meshStandardMaterial />
        </mesh>
    );
};

const Feathers = () => {
    const feathers = [...Array(10)].map((_, i) => (
        <Feather
            key={i}
            position={[i / 10, 1, 0]}
        />
    ));

    return (
        <>
            {feathers}
            <mesh position={[0, -0.5, 0]}>
                <planeBufferGeometry />
                <meshStandardMaterial />
            </mesh>
        </>
    );
};

const App = () => (
    <div style={{ height: '100vh', width:'100vh' }}>
    <Canvas style={{background:'black'}}>
        <Physics gravity={[0, -10, 0]} defaultContactMaterial={{ restitution: 0.5 }}>

        <Feathers />
        </Physics>
    </Canvas>
    </div>
);

export default App;
