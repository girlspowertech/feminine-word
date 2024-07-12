import React, { FC, useRef, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { useDrag } from '@use-gesture/react';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { modelFiles } from "@/utils/modelFiles";

interface ModelProps {
  onClick: () => void;
  model: GLTF;
  position: [number, number, number];
  fontSize: number;
}

const Model: React.FC<ModelProps> = ({ model, position, fontSize, onClick }) => {
  const ref = useRef<THREE.Group>(null!);

  return (
    <group ref={ ref } position={ position } scale={ [fontSize, fontSize, fontSize] } onPointerDown={ onClick }>
      <primitive object={ model.scene } />
    </group>
  );
};

const CircleTextCanvas: FC = () => {
  const [models, setModels] = useState<{ path: string; model: GLTF; }[]>([]);
  useEffect(() => {
    const modelPromises = modelFiles.map(async (filename) => {
      console.log(import.meta.env.BASE_URL);
      const url = `${ import.meta.env.BASE_URL }models/${ filename }`;
      const loader = new GLTFLoader();
      const model = await loader.loadAsync(url);
      return { path: url, model };
    });

    Promise.all(modelPromises).then((loadedModels) => {
      setModels(loadedModels);
    });
  }, []);

  const [angle, setAngle] = useState(0);

  const radius = 6;
  const maxFontSize = 2;
  const minFontSize = 0.2;
  const canvasRef = useRef<HTMLDivElement>(null);

  const calculateFontSize = (index: number, total: number) => {
    const anglePerItem = (2 * Math.PI) / total;
    const currentAngle = angle + index * anglePerItem;
    const cosValue = Math.cos(currentAngle);
    const normalizedSize = (cosValue + 1) / 2; // Map cosValue from [-1, 1] to [0, 1]
    const sizeRange = maxFontSize - minFontSize;
    return Math.min(maxFontSize, minFontSize + normalizedSize * sizeRange);
  };

  const handleClick = (index: number) => {
    const targetAngle = -((index / models.length) * 2 * Math.PI);
    const currentAngle = angle;
    let angleDifference = targetAngle - currentAngle;

    angleDifference = ((angleDifference + Math.PI) % (2 * Math.PI)) - Math.PI;

    const steps = 50;
    let step = 0;

    const animate = () => {
      step += 1;
      const newAngle = currentAngle + (angleDifference * step) / steps;
      setAngle(newAngle);
      if (step < steps) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  };

  const bind = useDrag(({ movement: [mx, my], memo = angle, down, initial: [ix, iy] }) => {
    if (down && canvasRef.current) {
      const { left, top, width, height } = canvasRef.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;

      const initialAngle = Math.atan2(iy - centerY, ix - centerX);
      const currentAngle = Math.atan2(iy + my - centerY, ix + mx - centerX);

      let theta = currentAngle - initialAngle;

      if (theta > Math.PI) theta -= 2 * Math.PI;
      if (theta < -Math.PI) theta += 2 * Math.PI;

      setAngle(memo - theta / 30);
      return memo - theta / 30;
    }
    return memo;
  });

  return (
    <div ref={ canvasRef } style={ { width: '100vw', height: '100vh' } }>
      <Canvas { ...bind() } camera={ { position: [0, 0, 10] } }>
        <ambientLight intensity={ 0.5 } />
        <pointLight position={ [10, 10, 10] } />
        { models.map((model, index) => {
          const theta = (index / models.length) * 2 * Math.PI + angle;
          const x = radius * Math.cos(theta);
          const y = radius * Math.sin(theta);
          const fontSize = calculateFontSize(index, models.length);
          return (
            <Model
              key={ index }
              model={ model.model }
              position={ [x, y, 0] }
              fontSize={ fontSize }
              onClick={ () => handleClick(index) }
            />
          );
        }) }
      </Canvas>
    </div>
  );
};

export default CircleTextCanvas;
