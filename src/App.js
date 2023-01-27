import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber"
import { Physics, usePlane, useSphere, useBox} from "@react-three/cannon"
import * as THREE from "three";
import Orbit from "./components/Orbit";


function Background () {
    const texture = useLoader(THREE.TextureLoader,'/beach.jpeg');
    const {scene} = useThree();
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = texture;
}
export default function App() {
  return (
      <div style={{ height: "100vh", width: "100vw" }}>
      <Canvas onPointerDown={(e) => console.log('clicked')} shadows gl={{ stencil: false, antialias: false }} camera={{ position: [0, 0, 20], fov: 50, near: 17, far: 40 }}>


{/*        <Orbit />*/}


          <Background />
{/*
          <fog attach="fog" args={["turquoise", 25, 35]} />
*/}
        <ambientLight intensity={1.5} />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} />
        <directionalLight
            castShadow
            intensity={4}
            position={[50, 50, 25]}
            shadow-mapSize={[256, 256]}
            shadow-camera-left={-10}
            shadow-camera-right={10}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
        />
        <Physics gravity={[0, -20, 0]} defaultContactMaterial={{ restitution: 1.2 }}>
          <group position={[0, 0, -10]}>
            <Mouse />
            <Borders />
            <Dollars />
          </group>
        </Physics>

      </Canvas>
      </div>
  )
}

function Dollars({ count = 200 }) {
    const texture = useLoader(THREE.TextureLoader,'/dollar.jpg');

    const { viewport } = useThree()
    const [ref, api] = useBox((index) => ({
        mass: 1,
        position: [4 - Math.random() * 8, viewport.height, 0, 0],
        rotation: [2,2,2],
        args: [1,4,1],

    }));
let swing = 0;
    useFrame((state) => {
    if(ref.current.position.y < -viewport.height) {
        swing += 0.1; // increase swing angle
       api.rotation.set(api.rotation.x,api.rotation.y, Math.sin(swing) * 0.1) // apply swing
    }
    })
  return (
      <instancedMesh ref={ref} castShadow receiveShadow args={[null, null, count]}>
        <boxBufferGeometry args={[0.1,1,2]} />
        <meshLambertMaterial map={texture} />
      </instancedMesh>
  )
}

function Borders() {
  const { viewport } = useThree()
  return (
      <>
        <Plane position={[0, -viewport.height / 2, 0]} rotation={[-Math.PI / 2, 0, 0]} />
        <Plane position={[-viewport.width / 2 - 1, 0, 0]} rotation={[0, Math.PI / 2, 0]} />
        <Plane position={[viewport.width / 2 + 1, 0, 0]} rotation={[0, -Math.PI / 2, 0]} />
        <Plane position={[0, 0, -1]} rotation={[0, 0, 0]} />
        <Plane position={[0, 0, 12]} rotation={[0, -Math.PI, 0]} />
      </>
  )
}

function Plane({ color, ...props }) {
  usePlane(() => ({ ...props }))
  return null
}

function Mouse() {
    const { viewport } = useThree()
    const [, api] = useSphere(() => ({ type: "Kinematic", args: [10] }))
    return useFrame((state) => {
        api.velocity.set((state.mouse.x * viewport.width) , (state.mouse.y * viewport.height) , 0)
        api.position.set((state.mouse.x * viewport.width) , (state.mouse.y * viewport.height) , 7)

    })
}
