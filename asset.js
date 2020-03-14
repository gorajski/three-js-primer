let scene, camera, renderer

window.onload = () => { 
	
	let STEP = 0.1;
	let cube1, cube2, plane

	let createGeometry = function () {
		let geometry = new THREE.BoxGeometry(5,5,5)
		let material = new THREE.MeshBasicMaterial({color: 0xc9b92b})

		cube1 = new THREE.Mesh(geometry,material)
		cube1.position.z = -6
		cube1.position.y = -5

		geometry = new THREE.BoxGeometry(5,5,5)
		material = new THREE.MeshBasicMaterial({color: 0xff0040, transparent: true, opacity: 0.8})

		cube2 = new THREE.Mesh(geometry, material)
		cube2.position.z = 6
		cube2.position.y = -5

		geometry = new THREE.PlaneGeometry(1000,1000,50,50)
		material = new THREE.MeshBasicMaterial({color: 0xa6f995, wireframe: true})

		plane = new THREE.Mesh(geometry, material)
		plane.rotation.x = Math.PI / 2
		plane.position.y = -100

		scene.add(cube1)
		scene.add(cube2)
		scene.add(plane)
	}

	let init = function() {
		scene = new THREE.Scene()
		scene.background = new THREE.Color(0x000000)

		camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 10, 2000)
		camera.position.z = 20

		createGeometry()

		renderer = new THREE.WebGLRenderer({antialias: true})
		renderer.setSize(window.innerWidth, window.innerHeight)

		document.body.appendChild(renderer.domElement)
	}

	let mainLoop = function() {
		cube1.position.x += STEP
		cube2.position.x -= STEP
		if(Math.abs(cube1.position.x) > 6) STEP *= -1

		renderer.render(scene, camera)
		requestAnimationFrame(mainLoop)
	}

	init()
	mainLoop()
}