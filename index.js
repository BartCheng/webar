
const targetImagePath = new URL("./show.zpt", import.meta.url).href;

// ZapparThree provides a LoadingManager that shows a progress bar while
// the assets are downloaded
const manager = new ZapparThree.LoadingManager();

// Setup ThreeJS in the usual way
const renderer = new THREE.WebGLRenderer();
document.body.appendChild(renderer.domElement);

renderer.setSize(window.innerWidth, window.innerHeight);
window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
});

renderer.setAnimationLoop(render);

// Setup a Zappar camera instead of one of ThreeJS's cameras
const camera = new ZapparThree.Camera();

// The Zappar library needs your WebGL context, so pass it
ZapparThree.glContextSet(renderer.getContext());

// Create a ThreeJS Scene and set its background to be the camera background texture
const scene = new THREE.Scene();
scene.background = camera.backgroundTexture;

// Request the necessary permission from the user
ZapparThree.permissionRequestUI().then((granted) => {
    if (granted) camera.start();
    else ZapparThree.permissionDeniedUI();
});

// Set up our image tracker group
// Pass our loading manager in to ensure the progress bar works correctly
const tracker = new ZapparThree.ImageTrackerLoader(manager).load(targetImagePath);
const trackerGroup = new ZapparThree.ImageAnchorGroup(camera, tracker);
scene.add(trackerGroup);

let imageTracker = new ZapparThree.ImageTracker();
imageTracker.loadTarget("./show.zpt").then(() => {
});

imageTracker.onVisible.bind(anchor => {
    console.log("Anchor is visible:", anchor.id);
    $('#gif-img').attr('src', 'model/p00/show.gif')
    $('.gif-image').css('visibility', 'visible')
});

imageTracker.onNotVisible.bind(anchor => {
    console.log("Anchor is not visible:", anchor.id);
    $('.gif-image').css('visibility', 'hidden')
    $('#gif-img').attr('src', '')
});

let imageTracker2 = new ZapparThree.ImageTracker();
imageTracker2.loadTarget("./show2.zpt").then(() => {
});

imageTracker2.onVisible.bind(anchor => {
    console.log("Anchor2 is visible:", anchor.id);
    $('#gif-img').attr('src', 'model/p03/show.gif')
    $('.gif-image').css('visibility', 'visible')
});

imageTracker2.onNotVisible.bind(anchor => {
    console.log("Anchor is not visible:", anchor.id);
    $('.gif-image').css('visibility', 'hidden')
    $('#gif-img').attr('src', '')
});
// Set up our render loop
function render() {
    camera.updateFrame(renderer);
    renderer.render(scene, camera);
}
