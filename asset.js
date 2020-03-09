let scene, camera, renderer

window.onload = () => { 

	const STEP = 0.02;
	let outerRing, midRing, innerRing, planet
	let count

	let createRing = function(radius,thickness,color) {
		let geometry = new THREE.TorusGeometry(radius,thickness,2,55)
		let material = new THREE.MeshBasicMaterial({color: color})		
		let ring = new THREE.Mesh(geometry,material)
		ring.rotation.x = 1.5
		ring.rotation.y = 0.3
		return ring
	}

	let createPlanet = function() {
		let geometry = new THREE.SphereGeometry(5,25,25)
		let material = new THREE.MeshBasicMaterial({color: 0xff8800})
		let planet = new THREE.Mesh(geometry,material)
		return planet
	}

	let init = function() {
		count = 0;

		// create scene
		scene = new THREE.Scene()
		scene.background = new THREE.Color(0x000000)

		// create and locate the camera
		camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 5, 200)
		camera.position.z = 20
		camera.position.y = 4
		
		// create and locate the objects on the scene
		outerRing = createRing(10, 0.5, 0xfffa00)
		innerRing = createRing(7.5, 1.5, 0xffaa00)
		planet = createPlanet()
		
		// create the renderer
		renderer = new THREE.WebGLRenderer({antialias: true})
		renderer.setSize(window.innerWidth, innerHeight)

		document.body.appendChild(renderer.domElement)
	}

	let mainLoop = function() {
		outerRing.position.y = Math.sin(count)
		innerRing.position.y = Math.sin(count)
		planet.position.y = Math.sin(count)

		count += STEP

		scene.add(outerRing)
		scene.add(innerRing)
		scene.add(planet)

		renderer.render(scene,camera)
		requestAnimationFrame(mainLoop)
	}

	init()
	mainLoop()
}