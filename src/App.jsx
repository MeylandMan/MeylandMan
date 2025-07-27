import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

function App() {
  return (
    <Canvas>
      {/* Add your 3D objects and components here */}
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <OrbitControls /> {/* Example: Add orbit controls for camera */}
      {/* Example: A simple box */}
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="hotpink" />
      </mesh>
    </Canvas>
  );
}

export default App;