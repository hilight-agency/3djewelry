import { useRef, useLayoutEffect } from 'react'
import { Canvas, useLoader } from '@react-three/fiber'
import { useGLTF, OrbitControls, MeshRefractionMaterial, Environment } from '@react-three/drei'
import { useControls } from 'leva'
import { RGBELoader } from 'three-stdlib'

function Ring(props) {
  const texture2 = useLoader(RGBELoader, '/1.hdr')
  const ref = useRef()
  const { nodes } = useGLTF('/camni.glb')
  return (
    <group ref={ref} rotation={[-Math.PI / 2, 0, 0]} {...props}>
    <mesh
      castShadow
      receiveShadow
      geometry={nodes['Layer_01(1B21DE05-E3AC-4C62-9547-4FFBA3C8A566)'].geometry}
      >
        <MeshRefractionMaterial 
        envMap={texture2} 
        bounces={2}
        aberrationStrength={0.01}
        ior={ 2.4}
        color={'white'}
        fastChroma
         />
      </mesh>
    <mesh
      castShadow
      receiveShadow
      geometry={nodes['Layer_01(822F5737-2B27-440C-B7D3-13B5C206F91D)'].geometry}
      >
        <MeshRefractionMaterial 
        envMap={texture2}
        bounces={2}
        aberrationStrength={0.01}
        ior={ 2.4}
        color={'blue'}
        fastChroma
 />
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
    <Canvas camera={{ fov: 60, position: [10, 40, 30]  }} >
      <Metal  scale={100}/>
      <Ring   scale={0.1} />
      <ambientLight color={'white'} intensity={4} />
      <OrbitControls makeDefault autoRotate autoRotateSpeed={0.5} enablePan={false} enableDamping={false} minDistance={3} maxDistance={6}/>
      <Environment files={"/1.hdr"} background={false}/>
    </Canvas>
  )
}
