console.log("🔥 ods5.js carregado");

import * as THREE from "three";
import { PLYLoader } from "three/addons/loaders/PLYLoader.js";

window.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("ods5-container");
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 400;

    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 1, 3);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1.2);
    hemiLight.position.set(0, 20, 0);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(5, 10, 7.5);
    scene.add(dirLight);

    let mesh = null;
    const material = new THREE.MeshStandardMaterial({
        vertexColors: true,
        metalness: 0,
        roughness: 1
    });

    function animate() {
        requestAnimationFrame(animate);
        if (mesh) {
            mesh.rotation.y += 0.01;
            mesh.position.y = Math.sin(Date.now() * 0.001) * 0.05;
        }
        renderer.render(scene, camera);
    }
    animate();

    const loader = new PLYLoader();
    loader.load(
        "./models/ods5.ply",
        (geometry) => {
            console.log("✅ ODS5 PLY carregado");

            geometry.computeVertexNormals();

            mesh = new THREE.Mesh(geometry, material);

            mesh.scale.set(1.2, 1.2, 1.2);

            geometry.computeBoundingBox();
            const box = geometry.boundingBox;
            const center = new THREE.Vector3();
            box.getCenter(center);
            mesh.position.sub(center);

            const size = new THREE.Vector3();
            box.getSize(size);
            const maxDim = Math.max(size.x, size.y, size.z);
            const fov = camera.fov * (Math.PI / 180);
            let cameraZ = maxDim / (2 * Math.tan(fov / 2));
            cameraZ *= 1.5;
            camera.position.set(0, 0, cameraZ);
            camera.lookAt(0, 0, 0);

            scene.add(mesh);

            const odsImage = document.querySelector("#ods5-container");
            if (odsImage) {
                setTimeout(() => odsImage.classList.add("loaded"), 100);
            }
        },
        undefined,
        (err) => console.error("❌ Erro ao carregar ODS5 PLY:", err)
    );

    window.addEventListener("resize", () => {
        const w = container.clientWidth || 600;
        const h = container.clientHeight || 400;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
    });
});
