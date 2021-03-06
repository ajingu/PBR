window.addEventListener("load", init);

function init(){
    const width = 960;
    const height = 540;

    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector("#myCanvas"),
        antialias: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width/height);
    camera.position.set(0, 0, 1000);

    const controls = new THREE.OrbitControls(camera);
    controls.enableDamping = true;
    controls.dampingFactor = 0.2;

    const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(100, 30, 30),
        new THREE.MeshStandardMaterial({color: 0x00FFFF})
    );
    scene.add(mesh);

    const light = new THREE.DirectionalLight(0xFFFFFF);
    light.position.set(1, 1, 1);
    scene.add(light);

    tick();

    function tick(){
        controls.update();
        renderer.render(scene, camera);

        requestAnimationFrame(tick);
    }

    onResize();

    window.addEventListener("resize", onResize);

    function onResize(){
        const width = window.innerWidth;
        const height = window.innerHeight;

        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(width, height);

        camera.aspect = width/height;
        camera.updateProjectionMatrix();
    }
}