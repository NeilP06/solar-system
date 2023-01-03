import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

/** Initializes camera and scene: */
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

/** Renders objects for the browser: */
const renderer = new THREE.WebGLRenderer({canvas: document.querySelector('#bg'),});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

/** Creates lighting so the objects can be seen from the front: */
const frontlight = new THREE.PointLight(0xFFFFFF);
frontlight.position.set(-30, 20, 100000);
scene.add(frontlight);

/** Creates lighting so the objects can be seen from a angle: */
const backlight = new THREE.PointLight(0xFFFFFF);
backlight.position.set(-30, 20, -100000);
scene.add(backlight);


/** Creates texture for the Sun: */
const sunNormalTexture = new THREE.TextureLoader().load('/Images/sun.jpg');

/** Creates texture for Mercury: */
const mercuryNormalTexture = new THREE.TextureLoader().load('/Images/mercury.jpg');
const mercuryObjectTexture = new THREE.TextureLoader().load('/Images/mercurytexture.png');

/** Creates texture for Venus: */
const venusNormalTexture = new THREE.TextureLoader().load('/Images/venus.jpg');
const venusObjectTexture = new THREE.TextureLoader().load('/Images/venustexture.jpg');

/** Creates texture for the earth spherical: */
const earthNormalTexture = new THREE.TextureLoader().load('/Images/earth.jpg');
const earthObjectTexture = new THREE.TextureLoader().load('/Images/earthtexture.jpg');

/** Creates texture for the earth spherical: */
const marsNormalTexture = new THREE.TextureLoader().load('/Images/mars.jpg');
const marsObjectTexture = new THREE.TextureLoader().load('/Images/marstexture.jpg');


/** Creates the sun's object and texture: */
const sunGeometry = new THREE.SphereGeometry(20, 32, 32);
const sunMaterial = new THREE.MeshStandardMaterial({map: sunNormalTexture});
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
sun.position.z = -50;
scene.add(sun);


/** Creates Mercury's object, texture, and orbit path: */
const mercuryGeometry = new THREE.SphereGeometry(2.5, 32, 32);
const mercuryMaterial = new THREE.MeshStandardMaterial({map: mercuryNormalTexture, normalMap: mercuryObjectTexture});
const mercury = new THREE.Mesh(mercuryGeometry, mercuryMaterial);
mercury.position.z = -15;
scene.add(mercury);

const mercuryOrbitGeometry = new THREE.TorusGeometry(35, 0.1, 30, 200);
const mercuryOrbitMaterial = new THREE.MeshBasicMaterial({color: 0xFFFFFF});
const mercuryOrbit = new THREE.Mesh(mercuryOrbitGeometry, mercuryOrbitMaterial);
mercuryOrbit.position.z = -50;
mercuryOrbit.rotateX(Math.PI / 2);
scene.add(mercuryOrbit);


/** Creates Venus's object, texture, and orbit path: */
const venusGeometry = new THREE.SphereGeometry(5, 32, 32);
const venusMaterial = new THREE.MeshStandardMaterial({map: venusNormalTexture, normalMap: venusObjectTexture});
const venus = new THREE.Mesh(venusGeometry, venusMaterial);
venus.position.z = 67;
scene.add(venus);

const venusOrbitGeometry = new THREE.TorusGeometry(117, 0.1, 30, 200);
const venusOrbitMaterial = new THREE.MeshBasicMaterial({color: 0xFFFFFF});
const venusOrbit = new THREE.Mesh(venusOrbitGeometry, venusOrbitMaterial);
venusOrbit.position.z = -50;
venusOrbit.rotateX(Math.PI / 2);
scene.add(venusOrbit);


/** Creates Earths's object and texture: */
const earthGeometry = new THREE.SphereGeometry(5, 32, 32);
const earthMaterial = new THREE.MeshStandardMaterial({map: earthNormalTexture, normalMap: earthObjectTexture});
const earth = new THREE.Mesh(earthGeometry, earthMaterial);
earth.position.z = 93;
scene.add(earth);

const earthOrbitGeometry = new THREE.TorusGeometry(143, 0.1, 30, 200);
const earthOrbitMaterial = new THREE.MeshBasicMaterial({color: 0xFFFFFF});
const earthOrbit = new THREE.Mesh(earthOrbitGeometry, earthOrbitMaterial);
earthOrbit.position.z = -50;
earthOrbit.rotateX(Math.PI / 2);
scene.add(earthOrbit);


/** Creates Mar's object and texture: */
const marsGeometry = new THREE.SphereGeometry(3, 32, 32);
const marsMaterial = new THREE.MeshStandardMaterial({map: marsNormalTexture, normalMap: marsObjectTexture});
const mars = new THREE.Mesh(marsGeometry, marsMaterial);
mars.position.z = 142;
scene.add(mars);

const marsOrbitGeometry = new THREE.TorusGeometry(192, 0.1, 30, 200);
const marsOrbitMaterial = new THREE.MeshBasicMaterial({color: 0xFFFFFF});
const marsOrbit = new THREE.Mesh(marsOrbitGeometry, marsOrbitMaterial);
marsOrbit.position.z = -50;
marsOrbit.rotateX(Math.PI / 2);
scene.add(marsOrbit);

function createAsteroidBelt() {
  const asteroidGeometry = new THREE.SphereGeometry(0.25, 24, 24);
  const asteroidMaterial = new THREE.MeshStandardMaterial({color: 0x696969});
  const asteroid = new THREE.Mesh(asteroidGeometry, asteroidMaterial);
  const x  = THREE.MathUtils;
  const y = 0;
  const z = 50;
  scene.add(asteroid);
}


const controls = new OrbitControls(camera, renderer.domElement);

/** Adds particle to the canvas scene: */
function addParticle() {
  // Initializes all variables:
  const geometry = new THREE.SphereGeometry(0.060, 24, 24);
  const material = new THREE.MeshStandardMaterial({color: 0xFFFFFF});
  const particle = new THREE.Mesh(geometry, material);
  // Creates random position and sets each particle to that position:
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(600));
  particle.position.set(x, y, z);
  scene.add(particle);
}


/** Calls addParticle() to create 9000 separate particles: */
Array(400).fill().forEach(addParticle);

/** Renders all information given to it: */
function animate() {
  requestAnimationFrame(animate);
  // Gives Mercury movement:
  mercury.rotation.y += (1/88);
  // Gives Venus movement:
  venus.rotation.y -= (1/225);
  // Gives Earth movement:
  earth.rotation.y += (1/365);
  // Gives Mars movement:
  mars.rotation.y += (1/687);
  controls.update();
  renderer.render(scene, camera);
}
animate();

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  camera.position.z = Math.abs(t) * -1 * -0.1;
  console.log(camera.position.z);
}
document.body.onscroll = moveCamera;