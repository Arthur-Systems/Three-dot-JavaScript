import "/src/Css/style.css";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { AmbientLight, PointLight, TextGeometry } from "three";
import {
    MapControls,
    OrbitControls,
} from "three/examples/jsm/controls/OrbitControls";

//!Canvas Setup
const scene = new THREE.Scene();
const loader = new GLTFLoader();
var size = document.querySelector("#splash");

var w = size.offsetWidth;
var h = size.offsetHeight * 2;
const camera = new THREE.PerspectiveCamera(100, w / h, 2, 1000);

camera.position.setZ(0);
camera.position.setX(0);
camera.position.setY(0);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#bg"),
});
renderer.setPixelRatio(size.devicePixelRatio);
renderer.setSize(w, h);
size.appendChild(renderer.domElement);

//!Other
$(window).scroll(function() {
    const x = document.body.getBoundingClientRect().top;
    //camera.position.x = x * -0.5;
    //camera.position.x = x * -0.05;
    camera.position.y = x * -0.02;
    camera.position.z = x * -0.05;
});

//!lightings

const pointLight1 = new THREE.PointLight(0xffffff);
pointLight1.position.set(5, 10, 20);

const pointLight2 = new THREE.PointLight(0xffffff);
pointLight2.position.set(-5, 10, 20);

const pointLight3 = new THREE.PointLight(0xffffff);
pointLight3.position.set(5, 10, -10);

const pointLight4 = new THREE.PointLight(0xffffff);
pointLight4.position.set(0, -5, 20);

const ambientLight = new THREE.AmbientLight(0xffffff);

scene.add(pointLight1, pointLight2, pointLight3, pointLight4, ambientLight);

//!debugging

/*function reportWindowSize() {
    var size = document.querySelector('#splash');
    var heightOutput = size.innerHeight;
    var widthOutput = size.innerWidth;
}
const report = new THREE.TextGeometry(reportWindowSize())*/
const lightpos2 = new THREE.PointLightHelper(pointLight2);
const lightpos1 = new THREE.PointLightHelper(pointLight1);
const lightpos3 = new THREE.PointLightHelper(pointLight3);
const lightpos4 = new THREE.PointLightHelper(pointLight4);
//const gridpos = new THREE.GridHelper(200, 50);
scene.add(lightpos1, lightpos2, lightpos4, lightpos3);

//const control = new OrbitControls(camera, renderer.domElement);

//!Models

/*const geomenty = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xFF6347 });
const torus = new THREE.Mesh(geomenty, material);
scene.add(torus);*/

loader.load("/src/Models/Monitor.glb", function(Test) {
    scene.add(Test.scene);
    Test.scene.rotation.x = -80;
    Test.scene.position.z = -5;

    function spin() {
        requestAnimationFrame(spin);
        Test.scene.rotation.x += 0.05;
    }
    spin();
});
loader.load("/src/Models/MonitorEdit.glb", function(Monitor) {
    scene.add(Monitor.scene);
    Monitor.scene.rotation.y = -95.9;
});

function update() {
    requestAnimationFrame(update);
    renderer.render(scene, camera);
}
update();