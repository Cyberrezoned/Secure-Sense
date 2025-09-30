'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function HeroAnimation() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const currentMount = mountRef.current;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    camera.position.z = 50;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    currentMount.appendChild(renderer.domElement);

    // Particles
    const particlesCount = 5000;
    const positions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 200;
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      color: '#7DF9FF',
      size: 0.1,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.8,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Mouse tracking
    const mouse = new THREE.Vector2();
    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    
    // Animation
    const clock = new THREE.Clock();
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Update particles
      particles.rotation.y = elapsedTime * 0.05;
      particles.rotation.x = elapsedTime * 0.02;

      // Animate camera to follow mouse
      camera.position.x += (mouse.x * 5 - camera.position.x) * 0.05;
      camera.position.y += (-mouse.y * 5 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);


      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      currentMount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 -z-10" />;
}
