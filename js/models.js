console.log("🔥 models.js carregado");

import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { PLYLoader } from "three/addons/loaders/PLYLoader.js";

window.addEventListener("DOMContentLoaded", () => {
    // Seleciona todos os containers de modelo
    const containers = document.querySelectorAll("[data-model]");

    containers.forEach(container => {
        const modelPath = container.getAttribute("data-model");
        if (!modelPath) return;

        const width = container.clientWidth || 600;
        const height = container.clientHeight || 400;

        // Cena
        const scene = new THREE.Scene();
        scene.background = null;

        // Câmera
        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        camera.position.set(0, 1, 3);

        // Renderizador
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(width, height);
        container.appendChild(renderer.domElement);

        // Luzes
        const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1.2);
        hemiLight.position.set(0, 20, 0);
        scene.add(hemiLight);

        const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
        dirLight.position.set(5, 10, 7.5);
        scene.add(dirLight);

        // Controles (desativados)
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.enabled = false;

        // Variáveis
        let mesh = null;
        const material = new THREE.MeshStandardMaterial({
            vertexColors: true,
            metalness: 0,
            roughness: 1
        });

        // Loop de animação
        function animate() {
            requestAnimationFrame(animate);
            if (mesh) {
                mesh.rotation.y += 0.01;
                mesh.position.y = Math.sin(Date.now() * 0.001) * 0.05;
            }
            renderer.render(scene, camera);
        }
        animate();

        // Carregar modelo PLY
        const loader = new PLYLoader();
        loader.load(
            modelPath,
            (geometry) => {
                console.log(`✅ Modelo carregado: ${modelPath}`);

                geometry.computeVertexNormals();
                mesh = new THREE.Mesh(geometry, material);

                mesh.scale.set(1.25, 1.25, 1.25);

                // Centralizar
                geometry.computeBoundingBox();
                const box = geometry.boundingBox;
                const center = new THREE.Vector3();
                box.getCenter(center);
                mesh.position.sub(center);

                // Ajustar câmera
                const size = new THREE.Vector3();
                box.getSize(size);
                const maxDim = Math.max(size.x, size.y, size.z);
                const fov = camera.fov * (Math.PI / 180);
                let cameraZ = maxDim / (2 * Math.tan(fov / 2));
                cameraZ *= 1.5;
                camera.position.set(0, 0, cameraZ);
                camera.lookAt(0, 0, 0);

                scene.add(mesh);

                // Animação de surgimento
                setTimeout(() => {
                    container.classList.add("loaded");
                }, 100);

                // Atualizar cor conforme tema
                updateMaterialTheme();
            },
            undefined,
            (err) => console.error(`❌ Erro ao carregar ${modelPath}:`, err)
        );

        // Função para trocar cor no dark/light
        function updateMaterialTheme() {
            if (!mesh) return;
            if (document.body.classList.contains("dark-mode")) {
                material.vertexColors = false;
                material.color.set("#94cc8a");
            } else {
                material.vertexColors = true;
                material.color.set(0xffffff);
            }
            material.needsUpdate = true;
        }

        // Observar mudanças de tema
        const themeToggle = document.getElementById("theme-toggle");
        if (themeToggle) {
            themeToggle.addEventListener("click", () => {
                setTimeout(updateMaterialTheme, 100);
            });
        }

        // Responsividade
        window.addEventListener("resize", () => {
            const w = container.clientWidth || 600;
            const h = container.clientHeight || 400;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        });
    });
});
