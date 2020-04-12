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

	let createGeometry = function() {
		let geometry = new THREE.BoxGeometry(3, 1, 3)
		let material = new THREE.MeshPhongMaterial({color: 0xff2200, shininess: 100, side: THREE.DoubleSide})
		cube = new THREE.Mesh(geometry,material)
		cube.position.x = 0
		cube.position.y = -1.5
		cube.position.z = -15
		cube.rotation.set(0.1,-0.2,-0.1)
		scene.add(cube)

		geometry = new THREE.SphereGeometry(2, 20, 20)
		material = new THREE.MeshPhongMaterial({color: 0x0036ee, shininess: 100, side: THREE.DoubleSide})
		sphere = new THREE.Mesh(geometry,material)
		sphere.position.x = 0
		sphere.position.y = 0
		sphere.position.z = -20
		sphere.rotation.set(0.1,-0.2,-0.1)
		scene.add(sphere)
	}

	let onMouseClick = function(e) {
		mouse.x = (e.clientX / window.innerWidth) * 2 - 1
		mouse.y = - (e.clientY / window.innerHeight) * 2 + 1
		mouse.z = 1

		rayCast.setFromCamera(mouse, camera)

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

		createGeometry()

		rayCast = new THREE.Raycaster()
		mouse = new THREE.Vector2()
		mouse.x = mouse.y = -1

		renderer = new THREE.WebGLRenderer({antialias: true})
		renderer.setSize(window.innerWidth, window.innerHeight)

		document.body.appendChild(renderer.domElement)
		document.addEventListener("click", onMouseClick, false)
	}

	let mainLoop = function() {
		sphere.material.color.set(0x0036ee)
		cube.material.color.set(0xff2200)

		let intersects = rayCast.intersectObjects(scene.children)
		intersects.forEach(obj => obj.object.material.color.set(0x00ff00))

		renderer.render(scene, camera)
		requestAnimationFrame(mainLoop)
	}

	init()
	mainLoop()
}