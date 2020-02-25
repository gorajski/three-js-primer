let scene, camera, renderer
let cube
let increment = 0.1;

window.onload = () => { 

	let createCube = function() {
		let geometry = new THREE.BoxGeometry(1,1,1)
		let material = new THREE.MeshBasicMaterial({color: 0x369CDD})
		cube = new THREE.Mesh(geometry, material)
		scene.add(cube)
	}

	let init = function() {
		// create scene
		scene = new THREE.Scene()
		scene.background = new THREE.Color(0xffffee)
		
		// create and locate the camera
		camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000)
		camera.position.z = 5

		// create and locate the objects on the scene
		createCube()

		// create the renderer
		renderer = new THREE.WebGLRenderer({ antialias: true })
		renderer.setSize(window.innerWidth, window.innerHeight)

		document.body.appendChild(renderer.domElement)
	}

	let mainLoop = function() {
		// cube.position.x += increment
		cube.rotation.y += increment

		if(cube.position.x <= -3 || cube.position.x >= 3)
			increment *= -1

		renderer.render(scene, camera)
		requestAnimationFrame(mainLoop)
	}

	init()
	mainLoop()
}