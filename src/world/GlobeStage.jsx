import React from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Html, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { useMaybee } from '../store'

function toCartesian(lat, lon, radius){
  const phi = (90 - lat) * (Math.PI/180)
  const theta = (lon + 180) * (Math.PI/180)
  const x = - (radius * Math.sin(phi) * Math.cos(theta))
  const z = (radius * Math.sin(phi) * Math.sin(theta))
  const y = (radius * Math.cos(phi))
  return new THREE.Vector3(x,y,z)
}

function CityPoint({ loc, radius }){
  const setSelected = useMaybee(s=>s.setSelected)
  const ref = React.useRef()
  const pos = React.useMemo(()=>toCartesian(loc.lat, loc.lon, radius+0.01), [loc, radius])

  useFrame(({clock})=>{
    const t = clock.getElapsedTime()
    if(ref.current){
      const s = 1 + Math.sin(t*3) * 0.15
      ref.current.scale.setScalar(s)
    }
  })

  return (
    <mesh position={pos.toArray()} ref={ref} onClick={(e)=>{
      e.stopPropagation()
      setSelected({type:'location', data:loc})
    }}>
      <sphereGeometry args={[0.02, 16, 16]} />
      <meshStandardMaterial emissive={'#9df7ff'} emissiveIntensity={3} color={'#9df7ff'} />
    </mesh>
  )
}

function Globe(){
  const texture = useTexture('https://raw.githubusercontent.com/kevinsqi/earth-map/main/earth-day.jpg')
  const bump = useTexture('https://raw.githubusercontent.com/kevinsqi/earth-map/main/earth-bump.jpg')
  const spec = useTexture('https://raw.githubusercontent.com/kevinsqi/earth-map/main/earth-specular.jpg')
  const group = React.useRef()
  useFrame(()=>{
    if(group.current){
      group.current.rotation.y += 0.0008
    }
  })
  return (
    <group ref={group}>
      <mesh>
        <sphereGeometry args={[2, 64, 64]} />
        <meshPhongMaterial map={texture} bumpMap={bump} bumpScale={0.05} specularMap={spec} shininess={6} />
      </mesh>
      <mesh>
        <sphereGeometry args={[2.05, 64, 64]} />
        <meshBasicMaterial color={'#9df7ff'} transparent opacity={0.05} />
      </mesh>
    </group>
  )
}

function Labels(){
  const locations = useMaybee(s=>s.locations)
  const radius = 2
  return locations.map(loc => {
    const v = toCartesian(loc.lat, loc.lon, radius+0.05)
    return (
      <Html key={loc.id} position={v.toArray()} center distanceFactor={10}>
        <div style={{
          background:'#0b0f15cc', padding:'6px 8px', borderRadius:8, border:'1px solid #1b2130',
          fontSize:12, whiteSpace:'nowrap'
        }}>{loc.name}</div>
      </Html>
    )
  })
}

export default function GlobeStage(){
  const locations = useMaybee(s=>s.locations)
  return (
    <Canvas camera={{ position: [0,0,5], fov: 45 }}>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5,5,5]} intensity={1.2} />
      <Globe />
      {locations.map(loc => <CityPoint key={loc.id} loc={loc} radius={2} />)}
      <Labels />
      <OrbitControls enablePan={false} minDistance={3.2} maxDistance={8} />
    </Canvas>
  )
}
