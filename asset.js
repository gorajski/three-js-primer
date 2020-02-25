let scene, camera, renderer
let sphere
let increment = 0.1;

window.onload = () => { 

	let createSphere = function() {
		let geometry = new THREE.SphereGeometry(5,8,8,0,Math.PI,0,Math.PI/2)
		// Sphere Properties:
		// radius 5
		// and horz and vert segments of 8
		// horizontal sweep angle goes from 0 to PI (starts at (0,0,0), ends at (PI,0,0) thru xz plane)
		// vertical sweep angle goes from 0 to PI/2 (starts at (0,PI/2,0), ends at (0,0,0) thru xy plane)
		let material = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true})
		sphere = new THREE.Mesh(geometry, material)
		scene.add(sphere)
	}

	let init = function() {
		// create scene
		scene = new THREE.Scene()
		scene.background = new THREE.Color(0x000000)
		
		// create and locate the camera
		camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000)
		camera.position.z = 20

		// create and locate the objects on the scene
		createSphere()

		// create the renderer
		renderer = new THREE.WebGLRenderer({ antialias: true })
		renderer.setSize(window.innerWidth, window.innerHeight)

		document.body.appendChild(renderer.domElement)
	}

	let mainLoop = function() {
		sphere.rotation.x += increment
		sphere.rotation.y += increment

		// let axes = new THREE.AxesHelper( 5 )
		// scene.add(axes)

		renderer.render(scene, camera)
		requestAnimationFrame(mainLoop)
	}

	init()
	mainLoop()
}