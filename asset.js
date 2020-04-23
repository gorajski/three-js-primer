let scene, camera, renderer
let rayCast, mouse
let box

window.onload = () => { 
	
	let STEP = 0.2
	let theta = 0

	let randomInRange = function(from,to) {
		let x = Math.random() * (to - from)
		return x + from
	}

	let createBox = function() {
		let geometry = new THREE.BoxGeometry(2,0.6,2)
		let material = new THREE.MeshPhongMaterial({color: 0x3344ff, shininess: 1})
		box = new THREE.Mesh(geometry, material)

		box.position.x = 0
		box.position.y = -1
		box.position.z = 7
		box.rotation.x = 0.3
		box.rotation.y = 0.4
		scene.add(box)
	}

	let onMouseMove = function(e) {
		mouse.x = (2 * e.clientX / window.innerWidth) - 1
		mouse.y = (-2 * e.clientY / window.innerHeight) + 1

		rayCast.setFromCamera(mouse, camera)
		
		boxDistance = camera.position.z - box.position.z
		
		pointer = rayCast.ray.at(boxDistance, new THREE.Vector3(0,0,0))
		
		box.position.x = pointer.x
		box.position.y = pointer.y
	}


	let init = function() {
		scene = new THREE.Scene()
		scene.background = new THREE.Color(0xffffff)

		camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000)
		camera.position.set(0,0,20)

		light1 = new THREE.DirectionalLight(0xffffff, 1)
		light2 = new THREE.DirectionalLight(0xffffff, 0.75)
		light2.position.set(0, -5, -2)
		scene.add(light1)
		scene.add(light2)

		createBox()

		rayCast = new THREE.Raycaster()

		mouse = new THREE.Vector2()
		mouse.x = mouse.y = -1

		renderer = new THREE.WebGLRenderer({antialias: true})
		renderer.setSize(window.innerWidth, window.innerHeight)

		document.body.appendChild(renderer.domElement)
		document.addEventListener("mousemove", onMouseMove)
	}

	let mainLoop = function() {
		

		renderer.render(scene, camera)
		requestAnimationFrame(mainLoop)
	}

	init()
	mainLoop()
}