var scene, camera, renderer;
var geometry, material, mesh;
var canvas;

init();
animate();

function init() {
  scene = new THREE.Scene();
  camera = new THREE.Camera();

  geometry = new THREE.PlaneBufferGeometry(2.0, 2.0);
  material = new THREE.ShaderMaterial({
    uniforms: {
      time: { type: "f" },
      resolution: { type: "v2" }
    },
    vertexShader: document.getElementById('vertex_shader').textContent,
    fragmentShader: document.getElementById('fragment_shader').textContent
  });
  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(512.0, 512.0);

  canvas = renderer.domElement;
  document.body.appendChild(canvas);
}

function animate(dt) {
  requestAnimationFrame(animate);

  material.uniforms.time.value = dt;
  material.uniforms.resolution.value = new THREE.Vector2(512.0, 512.0);

  renderer.render(scene, camera);
}

function saveImage() {
  renderer.render(scene, camera);
  window.open(canvas.toDataURL());
}
