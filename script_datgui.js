var scene, camera, renderer;
var geometry, material, mesh;
var mouse = new THREE.Vector2(0.5, 0.5);
var canvas;
var stats;

var config = {
  saveImage: function() {
    renderer.render(scene, camera);
    window.open(canvas.toDataURL());
  },
  recursion: 3,
  resolution: '512',
};

init();
render();

function init() {
  scene = new THREE.Scene();
  camera = new THREE.Camera();

  geometry = new THREE.PlaneBufferGeometry(2.0, 2.0);
  material = new THREE.ShaderMaterial({
    uniforms: {
      time: { type: "f", value: 0.0 },
      resolution: { type: "v2", value: new THREE.Vector2(512.0, 512.0) },
      mouse: { type: "v2", value: mouse },
    },
    vertexShader: document.getElementById('vertex_shader').textContent,
    fragmentShader: document.getElementById('fragment_shader').textContent
  });
  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(512.0, 512.0);

  canvas = renderer.domElement;
  canvas.addEventListener('mousemove', onMouseMove);
  window.addEventListener('resize', onWindowResize);
  document.body.appendChild(canvas);

  var gui = new dat.GUI();
  gui.add(config, 'saveImage').name('Save Image');
  gui.add(config, 'resolution', ['256', '512', '800', 'full']).name('Resolution').onChange(function(value) {
    if (value !== 'full') {
      canvas.width = value;
      canvas.height = value;
    }
    onWindowResize();
  });

  stats = new Stats();
  document.body.appendChild( stats.domElement );
}

function render(timestamp) {
  stats.begin();

  material.uniforms.time.value = timestamp * 0.001;
  material.uniforms.resolution.value = new THREE.Vector2(canvas.width, canvas.height);
  material.uniforms.mouse.value = mouse;
  renderer.render(scene, camera);

  stats.end();
  requestAnimationFrame(render);
}

function onMouseMove(e) {
	mouse.x = e.offsetX / canvas.width;
	mouse.y = e.offsetY / canvas.height;
}

function onWindowResize(e) {
  if (config.resolution === 'full') {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  renderer.setSize(canvas.width, canvas.height);
}
