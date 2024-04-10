import { useRef, useLayoutEffect } from 'react'
import { Canvas, useLoader } from '@react-three/fiber'
import { useGLTF, OrbitControls, MeshRefractionMaterial, Environment } from '@react-three/drei'
import { useControls } from 'leva'
import { RGBELoader } from 'three-stdlib'

function Ring(props) {
  const texture2 = useLoader(RGBELoader, '/1.hdr')
  const ref = useRef()
  const { nodes } = useGLTF('/camni.glb')
  const dia = useControls('dia', {
    bounces: { value: 2, min: 0, max: 8, step: 1 },
    aberrationStrength: { value: 0.01, min: 0, max: 0.1, step: 0.01 },
    ior: { value: 2.4, min: 0, max: 8 },
    fresnel: { value: 1, min: 0, max: 1 },
    color: 'white',
    fastChroma: true
  })
  const cnt = useControls('cnt', {
    bounces: { value: 2, min: 0, max: 8, step: 1 },
    aberrationStrength: { value: 0.01, min: 0, max: 0.1, step: 0.01 },
    ior: { value: 2.4, min: 0, max: 8 },
    fresnel: { value: 1, min: 0, max: 1 },
    color: 'blue',
    fastChroma: true
  })
  return (
    <group ref={ref} rotation={[-Math.PI / 2, 0, 0]} {...props}>
    <mesh
      castShadow
      receiveShadow
      geometry={nodes['Layer_01(1B21DE05-E3AC-4C62-9547-4FFBA3C8A566)'].geometry}
      >
        <MeshRefractionMaterial envMap={texture2} {...dia} />
      </mesh>
    <mesh
      castShadow
      receiveShadow
      geometry={nodes['Layer_01(822F5737-2B27-440C-B7D3-13B5C206F91D)'].geometry}
      >
        <MeshRefractionMaterial envMap={texture2} {...cnt} />
      </mesh>
  </group>
  )
}

function Metal(props) {
  const { scene } = useGLTF('/metal.glb')
  useLayoutEffect(() => {
    scene.traverse((obj) => obj.isMesh && (obj.receiveShadow = obj.castShadow = true))
  })
  return <primitive object={scene} {...props} />
}

export default function App() {
  return (
    <Canvas camera={{ fov: 60 }} >
      <Metal  scale={100}/>
      <Ring   scale={0.1} />
      <ambientLight color={'white'} intensity={4} />
      <OrbitControls makeDefault autoRotate autoRotateSpeed={0.5} />
      <Environment files={"/1.hdr"} background={false}/>
    </Canvas>
  )
}
