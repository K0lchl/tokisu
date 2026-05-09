import React, { Suspense, useMemo, useRef } from 'react';
import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Float, Center, useGLTF, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

function Product() {
    const { scene } = useGLTF('/model.glb');
    const texture = useLoader(THREE.TextureLoader, '/story_suzuyaki_texture.png');
    
    useMemo(() => {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(2, 2);
    }, [texture]);

    const copiedScene = useMemo(() => {
        const clone = scene.clone();
        clone.traverse((child) => {
            if (child.isMesh) {
                child.material = new THREE.MeshPhysicalMaterial({
                    color: '#121212',           // より深い墨色
                    roughness: 0.6,             // マットな質感を強調
                    roughnessMap: texture,
                    metalness: 0.15,            // わずかな金属感
                    normalMap: texture,
                    normalScale: new THREE.Vector2(0.25, 0.25), // 凹凸を少し強めに
                    clearcoat: 0.25,            // 自然釉の微細な光沢
                    clearcoatRoughness: 0.45,
                    envMapIntensity: 1.2,
                    ior: 1.5,
                    thickness: 1.0,
                });
            }
        });
        return clone;
    }, [scene, texture]);

    return (
        <Center>
            <primitive object={copiedScene} />
        </Center>
    );
}

// 窯の火の揺らぎを再現するライト
function KilnGlow() {
    const light = useRef();
    useFrame((state) => {
        if (light.current) {
            // 微妙に明滅させる
            light.current.intensity = 1.5 + Math.sin(state.clock.elapsedTime * 2) * 0.5;
        }
    });
    return (
        <pointLight
            ref={light}
            position={[5, -2, 5]}
            color="#ff4d00" // 燃える火の色
            intensity={2}
            distance={15}
            decay={2}
        />
    );
}

// マウスに追従するスポットライト（質感を強調）
function InteractiveLight() {
    const lightRef = useRef();
    useFrame(({ mouse, viewport }) => {
        if (lightRef.current) {
            const x = (mouse.x * viewport.width) / 2;
            const y = (mouse.y * viewport.height) / 2;
            lightRef.current.position.set(x, y, 5);
        }
    });
    return (
        <spotLight
            ref={lightRef}
            intensity={10}
            distance={20}
            angle={0.2}
            penumbra={1}
            color="#ffffff"
        />
    );
}

useGLTF.preload('/model.glb');

export default function MainScene() {
    return (
        <div className="absolute inset-0 cursor-move">
            <Canvas 
                dpr={[1, 1.5]} 
                camera={{ position: [0, 0, 7], fov: 40 }}
                gl={{ 
                    antialias: true,
                    alpha: true,
                    toneMapping: THREE.ACESFilmicToneMapping,
                    outputColorSpace: THREE.SRGBColorSpace
                }}
            >
                {/* 基本照明 */}
                <ambientLight intensity={0.2} />
                <Environment preset="night" /> {/* 夜の静寂な雰囲気 */}

                {/* 演出用照明 */}
                <KilnGlow />
                <InteractiveLight />
                
                {/* 背後からの輪郭強調用ライト */}
                <directionalLight position={[-5, 5, -5]} intensity={0.5} color="#4444ff" />

                <Suspense fallback={null}>
                    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.5}>
                        <Product />
                    </Float>
                    <ContactShadows 
                        resolution={1024} 
                        scale={15} 
                        blur={2.5} 
                        opacity={0.5} 
                        far={10} 
                        color="#000000" 
                    />
                </Suspense>

                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    autoRotate
                    autoRotateSpeed={0.3}
                    minPolarAngle={Math.PI / 2.5}
                    maxPolarAngle={Math.PI / 1.5}
                />
            </Canvas>
        </div>
    );
}