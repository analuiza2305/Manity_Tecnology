console.log("🔥 models.js que está sendo executado AGORA");

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.150.0/build/three.module.js";
import { OBJLoader } from "https://cdn.jsdelivr.net/npm/three@0.150.0/examples/jsm/loaders/OBJLoader.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.150.0/examples/jsm/controls/OrbitControls.js";

window.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("model-container");

    if (!container) {
        console.error("❌ ERRO: não existe #model-container no HTML!");
        return;
    }

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
    camera.position.set(0, 1, 3);

    // Renderizador
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Luzes
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(2, 2, 2).normalize();
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0x404040, 1.5);
    scene.add(ambientLight);

    // Controles
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;

    // Loader OBJ
    const loader = new OBJLoader();
    loader.load(
        "./models/Manity.obj",
        (obj) => {
            console.log("✅ Modelo OBJ carregado com sucesso!");

            // Centraliza
            const box = new THREE.Box3().setFromObject(obj);
            const center = new THREE.Vector3();
            box.getCenter(center);
            obj.position.sub(center);

            // Ajusta câmera
            const size = new THREE.Vector3();
            box.getSize(size);
            const maxDim = Math.max(size.x, size.y, size.z);
            const fov = camera.fov * (Math.PI / 180);
            let cameraZ = maxDim / (2 * Math.tan(fov / 2));
            cameraZ *= 1.5;
            camera.position.set(0, 0, cameraZ);
            camera.lookAt(0, 0, 0);

            scene.add(obj);

            // Loop de renderização
            function animate() {
                requestAnimationFrame(animate);
                obj.rotation.y += 0.01; // animação de rotação
                controls.update();
                renderer.render(scene, camera);
            }
            animate();
        },
        (xhr) => {
            if (xhr.lengthComputable) {
                console.log(`⏳ Carregando: ${(xhr.loaded / xhr.total) * 100}%`);
            } else {
                console.log(`⏳ Carregado: ${xhr.loaded} bytes`);
            }
        },
        (error) => {
            console.error("❌ Erro no OBJLoader:", error);
        }
    );

    // Responsividade
    window.addEventListener("resize", () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
});
