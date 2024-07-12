import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Vector3, Group } from 'three';

interface GLTFTextProps {
  url: string;
  position: [number, number, number];
  scale: [number, number, number];
  onClick: () => void;
}

const GLTFText: React.FC<GLTFTextProps> = ({ url, position, scale, onClick }) => {
  const { scene } = useGLTF(url);
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        const geometry = child.geometry;
        if (geometry) {
          const positionAttribute = geometry.attributes.position;
          for (let i = 0;i < positionAttribute.count;i++) {
            const x = positionAttribute.getX(i);
            const y = positionAttribute.getY(i);
            const z = positionAttribute.getZ(i);
            if (isNaN(x) || isNaN(y) || isNaN(z)) {
              console.error(`NaN detected in geometry of model ${ url }`);
            }
          }
        }
      }
    });
  }, [scene, url]);

  return <primitive object={ scene } position={ position } scale={ scale } onClick={ onClick } />;
};

interface TextCircleProps {
  gltfUrls: string[];
}

const TextCircle: React.FC<TextCircleProps> = ({ gltfUrls }) => {
  const groupRef = useRef<Group>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const radius = 6; // 圆弧半径
  const maxScale = 3; // 最大缩放比例
  const minScale = 0.3; // 最小缩放比例

  const positions = gltfUrls.map((_, index) => {
    // 计算角度，保证最大的字位于圆弧的正中最右位置
    const DIFF = (activeIndex || gltfUrls.length / 2) - index;
    const absDiff = Math.abs(DIFF);
    const angle = (DIFF / (gltfUrls.length - 1)) * Math.PI * 2 - Math.PI / 2;
    const scale = maxScale - (maxScale - minScale) * (absDiff / (gltfUrls.length - 1));
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    return { x, y, scale };
  });


  useFrame(() => {
    if (activeIndex !== null && groupRef.current) {
      const group = groupRef.current;
    }
  });

  const handleClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <group ref={ groupRef } position={ [0, 0, 0] }>
      { gltfUrls.map((url, index) => (
        <GLTFText
          key={ index }
          url={ url }
          position={ [positions[index].x, positions[index].y, 0] }
          scale={ [positions[index].scale, positions[index].scale, positions[index].scale] }
          onClick={ () => handleClick(index) }
        />
      )) }
    </group>
  );
};

const WordArc: React.FC = () => {
  const modules = import.meta.glob('/public/models/*.glb');
  const gltfUrls = Object.keys(modules).slice(0, 25)

  return (
    <div className='h-screen w-auto'>
      <Canvas camera={ { position: [0, 0, 10] } } >
        <ambientLight intensity={ 0.5 } />
        <spotLight position={ [10, 10, 10] } angle={ 0.15 } penumbra={ 1 } />
        <pointLight position={ [-10, -10, -10] } />
        <TextCircle gltfUrls={ gltfUrls } />
        <OrbitControls
          enableRotate={ false }
          enablePan={ false }
          enableZoom={ false }
        />
      </Canvas>
    </div>
  );
};

export default WordArc;
