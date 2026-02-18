import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';

export function VoxelScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  // const SKY_COLOR = '#87CEEB'; // Sky Blue
  const SKY_COLOR = '#f0f2f5'; // Light Gray

  useEffect(() => {
    if (!containerRef.current) return;

    // --- CONFIGURATION ---
    const VOXEL_SIZE = 0.5;
    const GRID_GAP = 0.02; // Slight gap between voxels for style
    const BOWL_RADIUS = 16;
    const BOWL_HEIGHT = 12;
    const PIXEL_RATIO = window.devicePixelRatio * 0.75; // High resolution for Retina/HiDPI

    // Colors
    const PALETTE = {
      SOUP: new THREE.Color('#d94c23'),
      SOUP_LIGHT: new THREE.Color('#e65c35'),
      CREAM: new THREE.Color('#fffdd0'),
      BOWL_BASE: new THREE.Color('#8b4513'),
      BOWL_RIM: new THREE.Color('#d6c098'),
      CROUTON: new THREE.Color('#e8a958'),
      CROUTON_DARK: new THREE.Color('#c28338'),
      BASIL: new THREE.Color('#4caf50'),
      SPOON: new THREE.Color('#a0a0a0'),
      TEXT: new THREE.Color('#FFFF00'),
    };

    // --- SETUP ---
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(SKY_COLOR);

    // Set body background to match (for "root" feel)
    const originalBodyBg = document.body.style.backgroundColor;
    document.body.style.backgroundColor = SKY_COLOR;

    // Fog for depth
    scene.fog = new THREE.Fog(SKY_COLOR, 20, 70);

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(24, 28, 24);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(PIXEL_RATIO);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.zIndex = '1';

    containerRef.current.appendChild(renderer.domElement);

    // Label Configuration
    const LABEL_CONFIG = {
      TEXT: 'Mai ești supi? 🥺',
      COLOR: '#333',
      FONT_SIZE: '10vmin', // Relative to viewport size
      FONT_WEIGHT: 'bold',
      TEXT_SHADOW: '0 0 100px rgba(0,0,0,0.3)',
      MARGIN_TOP: '-1em',
      VISIBLE_RANGE_MIN_DEG: 45,
      VISIBLE_RANGE_MAX_DEG: 135,
    };

    // CSS2D Renderer for labels
    const labelRenderer = new CSS2DRenderer();
    labelRenderer.setSize(window.innerWidth, window.innerHeight);
    labelRenderer.domElement.style.position = 'absolute';
    labelRenderer.domElement.style.top = '0px';
    labelRenderer.domElement.style.left = '0px';
    labelRenderer.domElement.style.pointerEvents = 'none'; // Let clicks pass through
    labelRenderer.domElement.style.zIndex = '2';
    containerRef.current.appendChild(labelRenderer.domElement);

    // Add Floating Label
    const labelDiv = document.createElement('div');
    labelDiv.className = 'label';
    labelDiv.textContent = LABEL_CONFIG.TEXT;
    labelDiv.style.color = LABEL_CONFIG.COLOR;
    labelDiv.style.fontFamily = 'sans-serif';
    labelDiv.style.fontSize = LABEL_CONFIG.FONT_SIZE;
    labelDiv.style.fontWeight = LABEL_CONFIG.FONT_WEIGHT;
    labelDiv.style.textShadow = LABEL_CONFIG.TEXT_SHADOW;
    labelDiv.style.marginTop = LABEL_CONFIG.MARGIN_TOP;
    labelDiv.style.transition = 'opacity 0.1s'; // Smooth transition

    const label = new CSS2DObject(labelDiv);
    label.position.set(0, BOWL_HEIGHT * VOXEL_SIZE + 2, 0); // Position above the bowl
    scene.add(label);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.0;

    // --- LIGHTING ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(20, 40, 10);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 100;
    dirLight.shadow.bias = -0.0005;
    const d = 25;
    dirLight.shadow.camera.left = -d;
    dirLight.shadow.camera.right = d;
    dirLight.shadow.camera.top = d;
    dirLight.shadow.camera.bottom = -d;
    scene.add(dirLight);

    // Fill light for the shadows
    const fillLight = new THREE.DirectionalLight(0xffaa00, 0.3);
    fillLight.position.set(-10, 10, -10);
    scene.add(fillLight);

    // --- VOXEL GENERATION LOGIC ---

    const voxels: { x: number; y: number; z: number; color: THREE.Color }[] = [];

    function addVoxel(x: number, y: number, z: number, color: THREE.Color) {
      voxels.push({ x, y, z, color });
    }

    function generateScene() {
      // 1. Generate Bowl
      for (let y = 0; y < BOWL_HEIGHT; y++) {
        // Create a tapered bowl shape using math
        const progress = y / BOWL_HEIGHT;
        const currentRadius = BOWL_RADIUS * (0.5 + 0.5 * Math.pow(progress, 0.3));

        for (let x = -BOWL_RADIUS; x <= BOWL_RADIUS; x++) {
          for (let z = -BOWL_RADIUS; z <= BOWL_RADIUS; z++) {
            const dist = Math.sqrt(x * x + z * z);

            // Bowl Walls
            const wallThickness = 1.5;
            if (dist <= currentRadius && dist > currentRadius - wallThickness) {
              const isRim = y >= BOWL_HEIGHT - 2;
              addVoxel(x, y, z, isRim ? PALETTE.BOWL_RIM : PALETTE.BOWL_BASE);
            }

            // Bowl Floor
            if (y === 0 && dist <= currentRadius) {
              let color = PALETTE.BOWL_BASE;

              // Text Logic "BEA"
              // Font 3x5, 1px spacing
              // B: -5 to -3
              // E: -1 to 1
              // A: 3 to 5
              // Z range: -2 to 2 (height 5 centered)

              const tz = z + 2; // Shift to 0..4 range for easier math

              // Letter B (x: -5 to -3)
              if (x >= -5 && x <= -3 && tz >= 0 && tz <= 4) {
                const bx = x - (-5); // 0..2
                const pattern = [
                  [1, 1, 1], // 4 (top)
                  [1, 0, 1], // 3
                  [1, 1, 1], // 2
                  [1, 0, 1], // 1
                  [1, 1, 1]  // 0 (bottom)
                ];
                if (pattern[4 - tz][bx]) color = PALETTE.TEXT;
              }

              // Letter E (x: -1 to 1)
              if (x >= -1 && x <= 1 && tz >= 0 && tz <= 4) {
                const ex = x - (-1);
                const pattern = [
                  [1, 1, 1],
                  [1, 0, 0],
                  [1, 1, 1],
                  [1, 0, 0],
                  [1, 1, 1]
                ];
                if (pattern[4 - tz][ex]) color = PALETTE.TEXT;
              }

              // Letter A (x: 3 to 5)
              if (x >= 3 && x <= 5 && tz >= 0 && tz <= 4) {
                const ax = x - 3;
                const pattern = [
                  [1, 1, 1],
                  [1, 0, 1],
                  [1, 1, 1],
                  [1, 0, 1],
                  [1, 0, 1]
                ];
                if (pattern[4 - tz][ax]) color = PALETTE.TEXT;
              }

              addVoxel(x, y, z, color);
            }

            // 2. Soup Liquid (Fill inside)
            const soupLevel = BOWL_HEIGHT - 3;
            if (y > 0 && y <= soupLevel && dist <= currentRadius - wallThickness) {
              if (y === soupLevel) {
                // Surface features
                // Create a creamy swirl using noise-like math
                const angle = Math.atan2(z, x);
                const swirl = Math.sin(dist * 0.8 + angle * 4);
                const isCream = dist < currentRadius * 0.7 && swirl > 0.6;

                addVoxel(x, y, z, isCream ? PALETTE.CREAM : PALETTE.SOUP);
              } else {
                // Deep soup
                addVoxel(x, y, z, PALETTE.SOUP);
              }
            }
          }
        }
      }

      // 3. Croutons
      // Helper to create a blocky chunk
      function createChunk(cx: number, cy: number, cz: number, size: number, colorVar1: THREE.Color, colorVar2: THREE.Color) {
        const offset = Math.floor(size / 2);
        for (let i = 0; i < size; i++) {
          for (let j = 0; j < size; j++) {
            for (let k = 0; k < size; k++) {
              // Simple rotation logic for 90 deg, or just messy placement
              const px = cx + i - offset;
              const pz = cz + k - offset;
              const py = cy + j;

              // Randomly skip corners for "bread" organic look
              if (Math.random() > 0.9) continue;

              const col = Math.random() > 0.3 ? colorVar1 : colorVar2;
              addVoxel(px, py, pz, col);
            }
          }
        }
      }

      createChunk(-3, BOWL_HEIGHT - 3, 2, 3, PALETTE.CROUTON, PALETTE.CROUTON_DARK);
      createChunk(2, BOWL_HEIGHT - 3, 4, 3, PALETTE.CROUTON, PALETTE.CROUTON_DARK);
      createChunk(4, BOWL_HEIGHT - 3, -2, 2, PALETTE.CROUTON, PALETTE.CROUTON_DARK);

      // 4. Basil Leaves
      function createLeaf(lx: number, ly: number, lz: number) {
        const pattern = [
          { x: 0, z: 0 }, { x: 1, z: 0 }, { x: -1, z: 0 },
          { x: 0, z: 1 }, { x: 0, z: -1 }
        ];
        pattern.forEach(p => {
          addVoxel(lx + p.x, ly + 1, lz + p.z, PALETTE.BASIL);
          // Add a tiny stem below center
          if (p.x === 0 && p.z === 0) addVoxel(lx, ly, lz, PALETTE.BASIL);
        });
      }
      createLeaf(0, BOWL_HEIGHT - 3, 0);
      createLeaf(-2, BOWL_HEIGHT - 3, -2);

      // 5. Spoon
      // Handle
      for (let i = 0; i < 18; i++) {
        addVoxel(10 + i, BOWL_HEIGHT + i * 0.5, 0, PALETTE.SPOON);
      }
      // Scoop (submerged)
      for (let x = 6; x < 11; x++) {
        for (let z = -2; z <= 2; z++) {
          const d = Math.sqrt(Math.pow(x - 8, 2) + z * z);
          if (d < 2.5) {
            addVoxel(x, BOWL_HEIGHT - 2, z, PALETTE.SPOON);
          }
        }
      }
    }

    generateScene();

    // --- MESH CREATION ---

    // We use InstancedMesh for performance (thousands of cubes)
    const geometry = new RoundedBoxGeometry(VOXEL_SIZE - GRID_GAP, VOXEL_SIZE - GRID_GAP, VOXEL_SIZE - GRID_GAP, 2, 0.05);
    const material = new THREE.MeshStandardMaterial({
      roughness: 0.8,
      metalness: 0.1,
    });

    const mesh = new THREE.InstancedMesh(geometry, material, voxels.length);
    mesh.castShadow = true;
    mesh.receiveShadow = true;

    const dummy = new THREE.Object3D();

    voxels.forEach((v, i) => {
      dummy.position.set(
        v.x * VOXEL_SIZE,
        v.y * VOXEL_SIZE,
        v.z * VOXEL_SIZE
      );
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      mesh.setColorAt(i, v.color);
    });

    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    scene.add(mesh);

    // Center the bowl
    mesh.position.y = - (BOWL_HEIGHT * VOXEL_SIZE) / 2;


    // --- STEAM PARTICLES ---
    // Steam needs to be separate because it's transparent and animated
    const steamGeo = new THREE.BoxGeometry(VOXEL_SIZE, VOXEL_SIZE, VOXEL_SIZE);
    const steamMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.4
    });

    const steamParticles: { mesh: THREE.Mesh; speed: number; drift: number }[] = [];
    const STEAM_COUNT = 30;

    function resetSteamParticle(p: THREE.Mesh) {
      const r = (Math.random() * BOWL_RADIUS * 0.6) * VOXEL_SIZE; // Emit from center area
      const theta = Math.random() * Math.PI * 2;
      p.position.x = r * Math.cos(theta);
      p.position.z = r * Math.sin(theta);
      p.position.y = (BOWL_HEIGHT - 3) * VOXEL_SIZE - 2; // Start near soup surface (adjusted for mesh offset)

      // Fade in/out scale reset
      p.scale.set(0, 0, 0);
    }

    for (let i = 0; i < STEAM_COUNT; i++) {
      const p = new THREE.Mesh(steamGeo, steamMat);
      resetSteamParticle(p);
      // Randomize initial state so they don't all start at bottom
      p.position.y += Math.random() * 10;
      scene.add(p);
      steamParticles.push({
        mesh: p,
        speed: 0.02 + Math.random() * 0.03,
        drift: (Math.random() - 0.5) * 0.02
      });
    }

    // --- ANIMATION LOOP ---

    const clock = new THREE.Clock();
    let animationFrameId: number;

    function animate() {
      animationFrameId = requestAnimationFrame(animate);

      const dt = clock.getDelta();

      // Update controls
      if (controls) {
        controls.update();

        // Calculate Opacity based on Polar Angle
        // 0 is top, PI is bottom.
        // Range: 45 (PI/4) to 135 (3*PI/4)
        const angle = controls.getPolarAngle();
        const minRad = THREE.MathUtils.degToRad(LABEL_CONFIG.VISIBLE_RANGE_MIN_DEG);
        const maxRad = THREE.MathUtils.degToRad(LABEL_CONFIG.VISIBLE_RANGE_MAX_DEG);

        let opacity = 0;
        if (angle >= minRad && angle <= maxRad) {
          // Smooth fade at edges?
          // Let's use a sine wave for smooth fade: 0 at edges, 1 at center (90deg)
          // Normalize angle to 0..PI range within the window
          const normalized = (angle - minRad) / (maxRad - minRad); // 0 to 1
          opacity = Math.sin(normalized * Math.PI);
        }

        labelDiv.style.opacity = opacity.toString();
      }

      // Animate Steam
      if (steamParticles) {
        steamParticles.forEach(obj => {
          const p = obj.mesh;

          p.position.y += obj.speed;
          p.position.x += obj.drift + Math.sin(clock.elapsedTime + p.id) * 0.005;

          // Scale logic (grow then shrink)
          const life = p.position.y; // simpler logic based on height
          if (life > 8) {
            resetSteamParticle(p);
          } else {
            // Map height to scale: 0->1->0
            // Normalized height relative to spawn roughly
            let scale = 1;
            if (life < 2) scale = life / 2; // grow
            else if (life > 6) scale = 1 - ((life - 6) / 2); // shrink
            p.scale.setScalar(scale);
            p.rotation.x += dt;
            p.rotation.y += dt;
          }
        });
      }

      renderer.render(scene, camera);
      labelRenderer.render(scene, camera);
    }

    console.log("Starting animation loop");
    animate();

    // Handle Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      labelRenderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      console.log("Cleaning up VoxelScene");
      document.body.style.backgroundColor = originalBodyBg;
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      controls.dispose();

      // Dispose Three.js resources
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      steamGeo.dispose();
      steamMat.dispose();

      // Remove canvas from DOM
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
        containerRef.current.removeChild(labelRenderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} style={{ width: '100%', height: '100vh', overflow: 'hidden', background: SKY_COLOR, position: 'relative' }} />;
}
