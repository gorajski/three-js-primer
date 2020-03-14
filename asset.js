let scene, camera, renderer

window.onload = () => { 
	
	let STEP = 0.1;
	let cube, sphere

	let createGeometry = function () {
		let material = new THREE.MeshDepthMaterial()
		let geometry = new THREE.BoxGeometry(3,2,4)

		cube = new THREE.Mesh(geometry,material)
		cube.position.z = -10
		cube.position.x = -5

		geometry = new THREE.SphereGeometry(3,30,30)

		sphere = new THREE.Mesh(geometry, material)
		sphere.position.z = 0
		sphere.position.x = 5

		scene.add(cube)
		scene.add(sphere)
	}

	let init = function() {
		scene = new THREE.Scene()
		scene.background = new THREE.Color(0xffffff)

		camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000)
		camera.position.z = 5

		createGeometry()

		renderer = new THREE.WebGLRenderer({antialias: true})
		renderer.setSize(window.innerWidth, window.innerHeight)

		document.body.appendChild(renderer.domElement)
	}

	let mainLoop = function() {
		cube.position.z += STEP
		sphere.position.z -= STEP

		if(cube.position.z >= 6 || cube.position.z <= -16) STEP *= -1

		renderer.render(scene, camera)
		requestAnimationFrame(mainLoop)
	}

	init()
	mainLoop()
}