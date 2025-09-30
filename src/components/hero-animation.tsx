'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const GLOBE_RADIUS = 5;

export function HeroAnimation() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;
    const currentMount = mountRef.current;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    camera.position.z = 15;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    currentMount.appendChild(renderer.domElement);

    // --- Globe ---
    const globeGeometry = new THREE.SphereGeometry(GLOBE_RADIUS, 64, 64);
    const globeMaterial = new THREE.MeshPhongMaterial({
      color: 'hsl(221, 83%, 53%)',
      transparent: true,
      opacity: 0.1,
      shininess: 50
    });
    const globe = new THREE.Mesh(globeGeometry, globeMaterial);
    scene.add(globe);

    // --- Wireframe ---
    const wireframeGeometry = new THREE.SphereGeometry(GLOBE_RADIUS + 0.01, 32, 32);
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 'hsl(221, 83%, 53%)',
      wireframe: true,
      transparent: true,
      opacity: 0.15
    });
    const wireframe = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
    scene.add(wireframe);

    // --- Points ---
    const pointsGeometry = new THREE.BufferGeometry();
    const pointsCount = 3000;
    const posArray = new Float32Array(pointsCount * 3);
    for (let i = 0; i < pointsCount * 3; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      const r = GLOBE_RADIUS + Math.random() * 0.2;
      posArray[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      posArray[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      posArray[i * 3 + 2] = r * Math.cos(phi);
    }
    pointsGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const pointsMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: 'hsl(221, 83%, 70%)',
      transparent: true,
      blending: THREE.AdditiveBlending
    });
    const points = new THREE.Points(pointsGeometry, pointsMaterial);
    scene.add(points);

    // --- Arcs ---
    const arcsGroup = new THREE.Group();
    scene.add(arcsGroup);

    function createArc(start: THREE.Vector3, end: THREE.Vector3, color: string | number | THREE.Color) {
      const v = new THREE.Vector3().subVectors(end, start);
      const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
      const midLength = mid.length();
      mid.normalize();
      mid.multiplyScalar(midLength + start.distanceTo(end) * 0.4);

      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      const points = curve.getPoints(50);
      const geometry = new THREE.BufferGeometry().setFromPoints(points);

      const material = new THREE.LineBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending
      });

      const arc = new THREE.Line(geometry, material);
      return arc;
    }

    function addRandomArc() {
      const startPoint = new THREE.Vector3().setFromSphericalCoords(GLOBE_RADIUS, Math.acos(1 - 2 * Math.random()), 2 * Math.PI * Math.random());
      const endPoint = new THREE.Vector3().setFromSphericalCoords(GLOBE_RADIUS, Math.acos(1 - 2 * Math.random()), 2 * Math.PI * Math.random());
      
      const isRedArc = Math.random() > 0.7; // 30% chance of being a red "attack" arc
      const color = isRedArc ? 'hsl(0, 72%, 51%)' : 'hsl(221, 83%, 80%)';

      const arc = createArc(startPoint, endPoint, color);
      arcsGroup.add(arc);

      setTimeout(() => {
        arc.geometry.dispose();
        (arc.material as THREE.Material).dispose();
        arcsGroup.remove(arc);
      }, Math.random() * 4000 + 2000);
    }


    // --- Lights ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight('hsl(221, 83%, 53%)', 1);
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);
    
    // --- Controls ---
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;

    // --- Animation Loop ---
    const animate = () => {
      controls.update();
      points.rotation.y += 0.001;
      wireframe.rotation.y += 0.0005;
      globe.rotation.y += 0.0005;

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    const arcInterval = setInterval(addRandomArc, 400);

    // --- Resize Handler ---
    const handleResize = () => {
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    setIsLoaded(true);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(arcInterval);
      if (currentMount) {
        currentMount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className={`absolute inset-0 z-0 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`} />;
}
