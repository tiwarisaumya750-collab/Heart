// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.z = 220;

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById("canvas"),
    antialias: true,
    alpha: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Heart Path
const path = document.querySelector("#heart");
const length = path.getTotalLength();

const vertices = [];

for (let i = 0; i < length; i += 0.35) {

    const point = path.getPointAtLength(i);

    const v = new THREE.Vector3(
        point.x - 300,
        -(point.y - 250),
        (Math.random() - 0.5) * 40
    );

    vertices.push(v);

}

// Geometry
const geometry = new THREE.BufferGeometry();

const positions = new Float32Array(vertices.length * 3);

vertices.forEach((v, i) => {

    positions[i * 3] = v.x;
    positions[i * 3 + 1] = v.y;
    positions[i * 3 + 2] = v.z;

});

geometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3)
);

// Material
const material = new THREE.PointsMaterial({
    color: 0xff3366,
    size: 3,
    transparent: true,
    opacity: 0.9
});

// Particle System
const heart = new THREE.Points(
    geometry,
    material
);

scene.add(heart);
// GSAP Intro Animation
heart.scale.set(0.05, 0.05, 0.05);

gsap.to(heart.scale, {
    x: 1,
    y: 1,
    z: 1,
    duration: 2,
    ease: "elastic.out(1,0.4)"
});

gsap.to(heart.rotation, {
    y: Math.PI * 2,
    duration: 20,
    repeat: -1,
    ease: "none"
});

gsap.to(heart.position, {
    y: 8,
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
});

// Mouse Rotation
let mouseX = 0;
let mouseY = 0;

window.addEventListener("mousemove", (e) => {

    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;

});

// Animation Loop
function animate() {

    requestAnimationFrame(animate);

    heart.rotation.x += (mouseY * 0.4 - heart.rotation.x) * 0.05;
    heart.rotation.y += ((mouseX * 0.4) - heart.rotation.y) * 0.05;

    renderer.render(scene, camera);

}

animate();

// Resize
window.addEventListener("resize", () => {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

});
