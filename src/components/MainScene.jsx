import React, { Suspense, useLayoutEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Float, Center, useGLTF, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

function Product() {
    // /public/model.glb のパスを適宜指定して読み込む
    const { scene } = useGLTF('/model.glb');

    // キャッシュされた元データを直接書き換えるとスマホ等でクラッシュする原因になるため、
    // useMemoを使ってモデルをクローンしてからマテリアルを適用します
    const copiedScene = React.useMemo(() => {
        const clone = scene.clone();
        clone.traverse((child) => {
            if (child.isMesh) {
                child.material = new THREE.MeshPhysicalMaterial({
                    color: '#151515',      // 基本の深みのある黒
                    roughness: 0.2,        // 表面の滑らかさ
                    metalness: 0.1,        // 陶器なので非金属
                    clearcoat: 1.0,        // クリアコート（釉薬）による表面の強い光沢層
                    clearcoatRoughness: 0.1, // クリアコート層自体の滑らかさ
                    envMapIntensity: 2.5   // 周囲の環境光（Environment）の反射強度
                });
            }
        });
        return clone;
    }, [scene]);

    // Center コンポーネントでモデルを画面中央に配置
    return (
        <Center>
            <primitive object={copiedScene} />
        </Center>
    );
}

// コンポーネント描画前にモデルをプリロードして引っ掛かりを防ぐ
useGLTF.preload('/model.glb');

export default function MainScene() {
    return (
        <div className="absolute inset-0 cursor-move">
            <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 7], fov: 40 }}>
                <ambientLight intensity={0.4} />
                <directionalLight position={[10, 10, 5]} intensity={1.5} />
                <Environment preset="city" />

                {/* モデル読み込み中はSuspense（fallback=nullにより何も表示されない）が機能 */}
                <Suspense fallback={null}>
                    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.8}>
                        <Product />
                    </Float>
                    {/* モデルに基づくContactShadowsもSuspense内で計算 */}
                    <ContactShadows resolution={512} frames={1} scale={12} blur={2.5} opacity={0.6} far={10} color="#000000" />
                </Suspense>

                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    autoRotate
                    autoRotateSpeed={0.5}
                />
            </Canvas>
        </div>
    );
}