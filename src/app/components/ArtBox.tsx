// components/ThreeScene.js

import * as THREE from 'three'
import { createRoot } from 'react-dom/client'
import React, { useRef, useState } from 'react'
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber'


function Box(props: { position: [number, number, number]; scale: number; width: number; height: number; zVal: number }) {
    const meshRef = useRef<THREE.Mesh>(null!)
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)
    useFrame((state, delta) => (meshRef.current.rotation.x += delta))
    return (
        <mesh
            {...props}
            ref={meshRef}
            // scale={active ? 1.5 : 2}
            onClick={(event) => setActive(!active)}
            onPointerOver={(event) => setHover(true)}
            onPointerOut={(event) => setHover(false)}>
            <boxGeometry args={[props.width, props.height, props.zVal]} />
            <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
        </mesh>
    )
}

const ArtBox = (props: { details: { scale: number, width: number, height: number, zVal: number } }) => {

    // console.log(props.details)

    return (<Canvas>
        <ambientLight intensity={Math.PI / 2} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
        <pointLight position={[-10, -10, -10]} decay={2} intensity={Math.PI} />
        <Box position={[-1.2, 0, 0]} scale={props.details.scale} width={props.details.width} height={props.details.height} zVal={props.details.zVal} />
        <Box position={[1.2, 0, 0]} scale={props.details.scale} width={props.details.width} height={props.details.height} zVal={props.details.zVal} />
    </Canvas>
    )
};


export default ArtBox;
