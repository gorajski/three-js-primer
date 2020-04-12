let scene, camera, renderer
let light
let cubes = []

window.onload = () => { 
	
	const LEFT = 37, RIGHT = 39, UP = 38, DOWN = 40
	let STEP = 0.02
	let theta = 0
	const RADIUS = 5, BASE_X = -16.5, BASE_Y = -20

	let randomInRange = function(from,to) {
		let x = Math.random() * (to - from)
		return x + from
	}

	let createGeometry = function() {
		let geometry = new THREE.BoxGeometry(5, 5, 5)

		for(let i = 1; i <= 10; i++) {
			let material = new THREE.MeshPhongMaterial({color: Math.random() * 0xffffff, shininess: 100, side: THREE.DoubleSide})
			let cube = new THREE.Mesh(geometry,material)
			cube.position.x = randomInRange(-20, 20)
			cube.position.z = randomInRange(-10, 10)
			cubes.push(cube)
			scene.add(cube)
		}
	}

	let onKeyDown = function(e) {
		if (e.keyCode === LEFT) {
			STEP = -0.2
			cubes.forEach( cube => cube.position.x += STEP)	
		}
		else if (e.keyCode === RIGHT) {
			STEP = 0.2
			cubes.forEach( cube => cube.position.x += STEP)	
		}
		else if (e.keyCode === UP) {
			scene.rotation.x += 0.2
		}
		else if (e.keyCode === DOWN) {
			scene.rotation.x -= 0.2
		}
		else return
	}


	let init = function() {
		scene = new THREE.Scene()
		scene.background = new THREE.Color(0xffffff)

		camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 7, 1000)
		camera.position.set(0,10,40)

		light = new THREE.DirectionalLight(0xffffff, 1)

		scene.add(light)

		createGeometry()

		renderer = new THREE.WebGLRenderer({antialias: true})
		renderer.setSize(window.innerWidth, window.innerHeight)

		document.body.appendChild(renderer.domElement)
		document.addEventListener("keydown", onKeyDown, false)
	}

	let mainLoop = function() {

		renderer.render(scene, camera)
		requestAnimationFrame(mainLoop)
	}

	init()
	mainLoop()
}




		// camera.lookAt(new THREE.Vector3(0,0,0))
		// camera.position.x = 40 * Math.sin(theta)
		// camera.position.z = 40 * Math.cos(theta)