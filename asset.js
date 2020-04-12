let scene, camera, renderer
let light
let cube

window.onload = () => { 
	
	let STEP = 0.2
	let theta = 0

	let randomInRange = function(from,to) {
		let x = Math.random() * (to - from)
		return x + from
	}

	let createGeometry = function() {
		let sideLength = randomInRange(2,6)
		let height = randomInRange(1,5)
		let geometry = new THREE.BoxGeometry(sideLength, height, sideLength)
		let material = new THREE.MeshPhongMaterial({color: Math.random() * 0xffffff, shininess: 100, side: THREE.DoubleSide})
		cube = new THREE.Mesh(geometry,material)
		cube.position.x = randomInRange(-5, 5)
		// cube.position.y = height/2
		cube.position.z = randomInRange(-25, -10)
	
		scene.add(cube)
	}

	let onMouseClick = function() {
		STEP *= -1
	}


	let init = function() {
		scene = new THREE.Scene()
		scene.background = new THREE.Color(0xffffff)

		camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000)
		camera.position.set(0,0,5)

		light = new THREE.DirectionalLight(0xffffff, 1)
		scene.add(light)

		createGeometry()

		renderer = new THREE.WebGLRenderer({antialias: true})
		renderer.setSize(window.innerWidth, window.innerHeight)

		document.body.appendChild(renderer.domElement)
		document.addEventListener("click", onMouseClick, false)
	}

	let mainLoop = function() {
		cube.rotation.x += STEP
		cube.rotation.y += STEP

		renderer.render(scene, camera)
		requestAnimationFrame(mainLoop)
	}

	init()
	mainLoop()
}