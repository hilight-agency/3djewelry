import { useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF, OrbitControls, MeshRefractionMaterial, useCubeTexture, CubeCamera, Environment } from '@react-three/drei'

function Ring(props) {
  const ref = useRef()
  const texture = useCubeTexture(
    ["px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"],
    { path: "gemsmap/" }
  );
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
  const texture = useCubeTexture(
    ["px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"],
    { path: "metalmap/" }
  );
  materials['Silver Polished #1'].envMap = texture;
  console.log(nodes);
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

useGLTF.preload('/gem.glb')
useGLTF.preload('/met.glb')

export default function App() {
  return (
    <Canvas camera={{ fov: 60, position: [10, 40, 30] }} >
      <Model scale={100} />
      <Ring scale={0.1} />
      <ambientLight color={'white'} intensity={4} />
      <OrbitControls makeDefault autoRotate autoRotateSpeed={0.5} enablePan={false} enableDamping={false} minDistance={3} maxDistance={6} />
    </Canvas>
  )
}
