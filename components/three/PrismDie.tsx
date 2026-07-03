'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  Float,
  Grid,
  Environment,
  Lightformer,
  MeshTransmissionMaterial,
  Sparkles,
} from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'

/**
 * The Prism Die — the signature visual.
 * A faceted crystal (the mark's language) refracting the brand spectrum,
 * hovering above a silicon-die grid: the cockpit above the engines.
 */

function Crystal() {
  const group = useRef<THREE.Group>(null)

  useFrame((state, delta) => {
    const g = group.current
    if (!g) return
    // slow lathe rotation + eased pointer parallax
    g.rotation.y += delta * 0.25
    const targetX = state.pointer.y * -0.18
    const targetZ = state.pointer.x * 0.12
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, targetX, 3, delta)
    g.rotation.z = THREE.MathUtils.damp(g.rotation.z, targetZ, 3, delta)
  })

  return (
    <Float speed={1.1} rotationIntensity={0.25} floatIntensity={0.7}>
      <group ref={group}>
        {/* main faceted prism */}
        <mesh castShadow>
          <icosahedronGeometry args={[1.35, 0]} />
          <MeshTransmissionMaterial
            transmission={1}
            thickness={1.6}
            roughness={0.08}
            ior={1.45}
            chromaticAberration={0.35}
            anisotropicBlur={0.2}
            distortion={0.12}
            distortionScale={0.4}
            temporalDistortion={0.06}
            attenuationDistance={2.2}
            attenuationColor="#4E55FC"
            color="#dff9ff"
            flatShading
          />
        </mesh>
        {/* dark core — the mark's built-in shadow */}
        <mesh scale={0.42}>
          <icosahedronGeometry args={[1.35, 0]} />
          <meshStandardMaterial color="#010E27" roughness={0.35} metalness={0.6} flatShading />
        </mesh>
      </group>
    </Float>
  )
}

function Scene() {
  return (
    <>
      <color attach="background" args={['#04060F']} />
      <ambientLight intensity={0.25} />

      <Crystal />

      {/* silicon-die floor */}
      <Grid
        position={[0, -1.7, 0]}
        args={[24, 24]}
        cellSize={0.45}
        cellThickness={0.6}
        cellColor="#1E2740"
        sectionSize={2.25}
        sectionThickness={1}
        sectionColor="#2A3557"
        fadeDistance={16}
        fadeStrength={2.2}
        infiniteGrid
      />

      {/* stray carriers */}
      <Sparkles count={26} scale={[7, 4, 7]} size={1.6} speed={0.25} opacity={0.35} color="#00E5EE" />

      {/* brand-spectrum environment — no external HDR fetch */}
      <Environment resolution={256} frames={1}>
        <Lightformer intensity={2.4} color="#00E5EE" position={[-4, 3, 2]} scale={[3, 6, 1]} />
        <Lightformer intensity={1.6} color="#7C08F5" position={[4, 1, 3]} scale={[3, 5, 1]} />
        <Lightformer intensity={1.1} color="#C400FE" position={[0, -3, -4]} scale={[6, 2, 1]} />
        <Lightformer intensity={0.9} color="#0196E8" position={[0, 5, -2]} scale={[8, 1.5, 1]} />
      </Environment>

      <EffectComposer multisampling={0}>
        <Bloom mipmapBlur intensity={0.55} luminanceThreshold={0.85} luminanceSmoothing={0.2} />
      </EffectComposer>
    </>
  )
}

export default function PrismDie({ active }: { active: boolean }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      frameloop={active ? 'always' : 'never'}
      camera={{ position: [0, 0.4, 6.2], fov: 42 }}
      gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      style={{ background: '#04060F' }}
    >
      <Scene />
    </Canvas>
  )
}
