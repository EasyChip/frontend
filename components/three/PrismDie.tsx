'use client'

import { useMemo, useRef } from 'react'
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
 * A luminous faceted crystal refracting the brand spectrum, hovering above
 * a silicon-die grid: the cockpit above the engines.
 */

const CRYSTAL_RADIUS = 1.35

function Crystal() {
  const group = useRef<THREE.Group>(null)

  const edges = useMemo(
    () => new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(CRYSTAL_RADIUS * 1.002, 0)),
    []
  )

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
        {/* main faceted prism — bright glass, long attenuation so it stays luminous */}
        <mesh>
          <icosahedronGeometry args={[CRYSTAL_RADIUS, 0]} />
          <MeshTransmissionMaterial
            transmission={1}
            thickness={1.1}
            roughness={0.06}
            ior={1.45}
            chromaticAberration={0.5}
            anisotropicBlur={0.25}
            distortion={0.18}
            distortionScale={0.5}
            temporalDistortion={0.08}
            attenuationDistance={6}
            attenuationColor="#7DE9FF"
            color="#eafcff"
            backside
            backsideThickness={0.4}
            flatShading
          />
        </mesh>

        {/* facet wireframe — engineered edge definition, catches bloom */}
        <lineSegments geometry={edges}>
          <lineBasicMaterial color="#00E5EE" transparent opacity={0.55} />
        </lineSegments>

        {/* emissive heart — the glow the glass carries */}
        <mesh scale={0.4}>
          <icosahedronGeometry args={[CRYSTAL_RADIUS, 0]} />
          <meshStandardMaterial
            color="#2b0a54"
            emissive="#7C08F5"
            emissiveIntensity={2.6}
            flatShading
          />
        </mesh>
        <pointLight color="#7C08F5" intensity={26} distance={8} decay={2} />
      </group>
    </Float>
  )
}

/** Soft prism aurora rendered in-scene so the frame is never flat black. */
function GlowBackdrop() {
  const texture = useMemo(() => {
    const size = 512
    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext('2d')!
    const g = ctx.createRadialGradient(size / 2, size * 0.46, 30, size / 2, size * 0.46, size * 0.52)
    g.addColorStop(0, 'rgba(78,85,252,0.55)')
    g.addColorStop(0.35, 'rgba(124,8,245,0.32)')
    g.addColorStop(0.65, 'rgba(0,229,238,0.10)')
    g.addColorStop(1, 'rgba(4,6,15,0)')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, size, size)
    const t = new THREE.CanvasTexture(canvas)
    t.colorSpace = THREE.SRGBColorSpace
    return t
  }, [])

  return (
    <mesh position={[0, 0.2, -6]}>
      <planeGeometry args={[26, 26]} />
      <meshBasicMaterial map={texture} transparent depthWrite={false} />
    </mesh>
  )
}

function Scene() {
  return (
    <>
      <color attach="background" args={['#04060F']} />
      <ambientLight intensity={0.5} />

      {/* brand-spectrum rim lights — the crystal reads as lit, not silhouetted */}
      <pointLight color="#00E5EE" intensity={90} distance={16} decay={2} position={[-4.5, 2.5, 4]} />
      <pointLight color="#C400FE" intensity={70} distance={16} decay={2} position={[4.5, -0.5, 3]} />
      <pointLight color="#0196E8" intensity={60} distance={18} decay={2} position={[0, 3.5, -4]} />

      <GlowBackdrop />
      <Crystal />

      {/* silicon-die floor */}
      <Grid
        position={[0, -1.7, 0]}
        args={[24, 24]}
        cellSize={0.45}
        cellThickness={0.7}
        cellColor="#243056"
        sectionSize={2.25}
        sectionThickness={1.1}
        sectionColor="#35427A"
        fadeDistance={16}
        fadeStrength={2}
        infiniteGrid
      />

      {/* stray carriers */}
      <Sparkles count={40} scale={[8, 4.5, 7]} size={2.4} speed={0.3} opacity={0.55} color="#00E5EE" />

      {/* bright spectrum environment — what the glass actually refracts */}
      <Environment resolution={256} frames={1}>
        <Lightformer intensity={9} color="#00E5EE" position={[-5, 2, 2]} scale={[5, 9, 1]} />
        <Lightformer intensity={7} color="#7C08F5" position={[5, 1, 3]} scale={[5, 8, 1]} />
        <Lightformer intensity={5} color="#C400FE" position={[1, -4, -3]} scale={[9, 3, 1]} />
        <Lightformer intensity={5} color="#0196E8" position={[0, 6, -2]} scale={[12, 2.5, 1]} />
        <Lightformer intensity={3} color="#4E55FC" position={[-2, -2, 5]} scale={[4, 4, 1]} />
      </Environment>

      <EffectComposer multisampling={0}>
        <Bloom mipmapBlur intensity={1.05} luminanceThreshold={0.22} luminanceSmoothing={0.3} />
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
