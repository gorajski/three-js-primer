let scene, camera, renderer
let rayCast, mouse
let cube, sphere

window.onload = () => { 
	
	let STEP = 0.2
	let theta = 0

	let randomInRange = function(from,to) {
		let x = Math.random() * (to - from)
		return x + from
	}

	let createSphere = function(pos) {
		geometry = new THREE.SphereGeometry(2, 20, 20)
		material = new THREE.MeshPhongMaterial({color: 0x4a57fa, shininess: 100, side: THREE.DoubleSide})
		sphere = new THREE.Mesh(geometry,material)

		sphere.position.set(pos.x, pos.y, pos.z)
		scene.add(sphere)
	}

	let onMouseClick = function(e) {
		mouse.x = (e.clientX / window.innerWidth) * 2 - 1		
		mouse.y = - (e.clientY / window.innerHeight) * 2 + 1
		mouse.z = 1

		rayCast.setFromCamera(mouse, camera)
		createSphere(rayCast.ray.at(15, new THREE.Vector3(0,0,0)))
	}


	let init = function() {
		scene = new THREE.Scene()
		scene.background = new THREE.Color(0xffffff)

		camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000)
		camera.position.set(0,0,5)

		light1 = new THREE.DirectionalLight(0xffffff, 1)
		light2 = new THREE.DirectionalLight(0xffffff, 0.75)
		light2.position.set(0, -5, 2)
		scene.add(light1)
		scene.add(light2)

		rayCast = new THREE.Raycaster()
		mouse = new THREE.Vector2()
		mouse.x = mouse.y = -1

		renderer = new THREE.WebGLRenderer({antialias: true})
		renderer.setSize(window.innerWidth, window.innerHeight)

		document.body.appendChild(renderer.domElement)
		document.addEventListener("click", onMouseClick, false)
	}

	let mainLoop = function() {

		renderer.render(scene, camera)
		requestAnimationFrame(mainLoop)
	}

	init()
	mainLoop()
}