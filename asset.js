let scene, camera, renderer

window.onload = () => { 
	
	let STEP = 0.1
	let cube, cone, plane, light

	let createGeometry = function () {
		let geometry = new THREE.BoxGeometry(5,5,5)
		let material = new THREE.MeshPhongMaterial({color: 0x0f1d89, shininess: 100, side: THREE.DoubleSide})

		cube = new THREE.Mesh(geometry,material)
		cube.position.z = -6
		cube.position.y = -5
		cube.position.x = -6

		geometry = new THREE.ConeGeometry(3,4,20,1,true)
		cone = new THREE.Mesh(geometry, material)
		cone.position.x = 7
		cone.position.y = -5

		geometry = new THREE.PlaneGeometry(1000, 1000, 50, 50)
		material = new THREE.MeshPhongMaterial({color: 0x693421, side: THREE.DoubleSide})
		plane = new THREE.Mesh(geometry,material)
		plane.rotation.x = Math.PI/2
		plane.position.y = -100;

		scene.add(cube)
		scene.add(cone)
		scene.add(plane)
	}

	let init = function() {
		scene = new THREE.Scene()
		scene.background = new THREE.Color(0x88afef)

		camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000)
		camera.position.z = 25

		light = new THREE.AmbientLight(0xeeeeff)
		scene.add(light)

		createGeometry()

		renderer = new THREE.WebGLRenderer({antialias: true})
		renderer.setSize(window.innerWidth, window.innerHeight)

		document.body.appendChild(renderer.domElement)
	}

	let mainLoop = function() {
		light.intensity += STEP
		if (light.intensity >= 8 || light.intensity <= 1) STEP *= -1

		renderer.render(scene, camera)
		requestAnimationFrame(mainLoop)
	}

	init()
	mainLoop()
}