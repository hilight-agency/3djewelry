import { useRef } from 'react'
import { Canvas, useLoader } from '@react-three/fiber'
import { useGLTF, OrbitControls, MeshRefractionMaterial, Environment } from '@react-three/drei'
import { RGBELoader } from 'three-stdlib'
import { useControls } from "leva";
import { DepthOfField, EffectComposer } from "@react-three/postprocessing";
function Gems(props) {
  const ref = useRef()
  const texture = useLoader(RGBELoader, '/gems.hdr')
  /* const texture = useCubeTexture(
    ["px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"],
    { path: "gemsmap/" }
  ); */
  const { nodes } = useGLTF('/gem.glb')
  return (
    <group ref={ref} rotation={[-Math.PI / 2, 0, 0]} {...props}>
      <mesh geometry={nodes['Layer_01(F515426E-294D-4FC4-832F-9BAC280D6A14)'].geometry}      >
        <MeshRefractionMaterial
          envMap={texture}
          bounces={2}
          aberrationStrength={0.01}
          ior={2.4}
          color={'white'}
          fastChroma
        />
      </mesh>
    </group>
  )
}

function Model(props) {
  const { nodes, materials } = useGLTF('/met.glb')
  return (
    <group {...props} dispose={null}>
      <group scale={0.001}>
        <group rotation={[-Math.PI / 2, 0, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes['COLOR=�,MATERIAL=��(17C38827-CF04-41A3-BD5C-83A1DBCE0B94)'].geometry}
            material={materials['Silver Polished #1']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes['Layer_01(D0460141-C391-4238-B6C5-F8AD57FB3D13)'].geometry}
            material={materials['Silver Polished #1']}
          />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/met.glb')
useGLTF.preload('/gem.glb')

export default function App() {
  const { bgcolor, focusDistance, focalLength, bokehScale } = useControls({
    bgcolor: {
      value: '#fff',      
    },
    focusDistance: {
      min: 0,
      max: 1,
      step: 0.01,
      value: 0.1
    },
    focalLength: {
      min: 0,
      step: 0.01,
      max: 1,
      value: 0.5
    },
    bokehScale: {
      min: 0,
      step: 0.01,
      max: 10,
      value: 2
    }
  });
  return (
    <Canvas camera={{ fov: 60, position: [10, 40, 30] }} dpr={[1,2]} >
      <Environment files={'/Ring_Studio_011_V4.hdr'} environmentIntensity={0.5}/>
      <color attach="background" args={[bgcolor]} />
      <Model scale={100} />
      <Gems scale={0.1} />
      <OrbitControls makeDefault autoRotate autoRotateSpeed={0.5} enablePan={false} enableDamping={false} minDistance={3} maxDistance={6} />
      <EffectComposer>
          <DepthOfField
            focusDistance={focusDistance}
            focalLength={focalLength}
            bokehScale={bokehScale}
          />
        </EffectComposer>
    </Canvas>
  )
}
