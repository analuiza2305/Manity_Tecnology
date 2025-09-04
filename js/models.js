import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.150.0/build/three.module.js";
import { PLYLoader } from "https://cdn.jsdelivr.net/npm/three@0.150.0/examples/jsm/loaders/PLYLoader.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.150.0/examples/jsm/controls/OrbitControls.js";

window.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("model-container");

    // Cena
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    // Câmera
    const camera = new THREE.PerspectiveCamera(
        45,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
    );
    camera.position.set(0, 0.5, 2);

    // Renderizador
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Luz
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(2, 2, 2).normalize();
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0x404040, 1.5);
    scene.add(ambientLight);

    // Controles (para girar/zoom manualmente)
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;

    // Carregar modelo PLY
    const loader = new PLYLoader();
    loader.load("models/Manity.ply", (geometry) => {
        geometry.computeVertexNormals();
        const material = new THREE.MeshStandardMaterial({
            color: 0x94cc8a,
            flatShading: false,
            metalness: 0.2,
            roughness: 0.7,
        });

        const mesh = new THREE.Mesh(geometry, material);
        mesh.scale.set(0.01, 0.01, 0.01); // Ajuste do tamanho
        mesh.rotation.x = -Math.PI / 2;   // Corrige rotação
        scene.add(mesh);

        // Animação
        function animate() {
            requestAnimationFrame(animate);
            mesh.rotation.y += 0.01; // Auto rotação
            controls.update();
            renderer.render(scene, camera);
        }
        animate();
    });

    // Responsividade
    window.addEventListener("resize", () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
});
