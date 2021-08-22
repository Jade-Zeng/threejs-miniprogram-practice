import { registerGLTFLoader } from '../loaders/gltf-loader'
import { registerTextureLoader } from '../loaders/texture_loader'
import registerOrbit from "../test-cases/orbit"

export function pdpRender(canvas, THREE) {
    THREE.canvas = canvas
    registerGLTFLoader(THREE)
    registerTextureLoader(THREE)

    var container, stats, clock, gui, mixer, actions, activeAction, previousAction;
    var camera, scene, renderer, model, face, controls;
    var api = { state: 'Walking' };
    init();
    animate();
    function init() {
        camera = new THREE.PerspectiveCamera(45, canvas.width / canvas.height, 0.25, 1000);
        camera.position.set(0, 0, 0);
        scene = new THREE.Scene();
        scene.add(camera)
        clock = new THREE.Clock();
        // lights
        var light = new THREE.HemisphereLight(0xffffff, 0x444444);
        light.position.set(0, 20, 0);
        scene.add(light);
        light = new THREE.DirectionalLight(0xffffff);
        light.position.set(0, 20, 10);
        scene.add(light);
        // ground
        var mesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(2000, 2000), new THREE.MeshPhongMaterial({ color: 0x999999, depthWrite: false }));
        mesh.rotation.x = - Math.PI / 2;
        scene.add(mesh);
        var grid = new THREE.GridHelper(200, 40, 0x000000, 0x000000);
        grid.material.opacity = 0.2;
        grid.material.transparent = true;
        scene.add(grid);
        // model
        var loader = new THREE.GLTFLoader();
        // let url = 'https://threejs.org/examples/models/gltf/RobotExpressive/RobotExpressive.glb'
        let url = 'https://zugou.vip/static/models/demo/S1.gltf'
        loader.load(url, function (gltf) {
            model = gltf.scene;
            console.log(gltf)
            scene.add(model);
        });
        renderer = new THREE.WebGLRenderer({antialias: true });
        renderer.setClearColor(0xffffff, 1);
        renderer.setPixelRatio(wx.getSystemInfoSync().devicePixelRatio);
        renderer.setSize(canvas.width, canvas.height);
        renderer.gammaOutput = true;
        renderer.gammaFactor = 2.2;
        renderer.render(scene, camera)

        const { OrbitControls } = registerOrbit(THREE)
        controls = new OrbitControls( camera, renderer.domElement );

        camera.position.set( 0, 0, 1 );
        controls.update();
    }

    function animate() {
        var dt = clock.getDelta();
        if (mixer) mixer.update(dt);
        canvas.requestAnimationFrame(animate);
        controls.update()
        renderer.render(scene, camera);
    }
}