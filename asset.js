let scene, camera, renderer
let light
let cubes = []

window.onload = () => { 
	
	const LEFT = 37, RIGHT = 39, UP = 38, DOWN = 40
	let STEP = 0.2
	let theta = 0
	const RADIUS = 5, BASE_X = -16.5, BASE_Y = -20

	let randomInRange = function(from,to) {
		let x = Math.random() * (to - from)
		return x + from
	}

	let createGeometry = function() {

		for(let i = 1; i <= 60; i++) {
			let sideLength = randomInRange(2,6)
			let height = randomInRange(1,5)
			let geometry = new THREE.BoxGeometry(sideLength, height, sideLength)
			let material = new THREE.MeshPhongMaterial({color: Math.random() * 0xffffff, shininess: 100, side: THREE.DoubleSide})
			let cube = new THREE.Mesh(geometry,material)
			cube.position.x = randomInRange(-60, 60)
			cube.position.y = height/2
			cube.position.z = randomInRange(-100, 0)
			cubes.push(cube)
			scene.add(cube)
		}
	}



	let onKeyDown = function(e) {
		if (e.keyCode === LEFT) {
			cubes.forEach( cube => cube.position.x += STEP)	
		}
		else if (e.keyCode === RIGHT) {
			cubes.forEach( cube => cube.position.x -= STEP)	
		}
		else if (e.keyCode === DOWN) {
			cubes.forEach( cube => cube.position.y += STEP)	
		}
		else if (e.keyCode === UP) {
			cubes.forEach( cube => cube.position.y -= STEP)	
		}
		else return
	}


	let init = function() {
		scene = new THREE.Scene()
		scene.background = new THREE.Color(0xffffff)

		camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000)
		camera.position.set(0,10,40)

		dirLight = new THREE.DirectionalLight(0xffffff, 1)
		scene.add(dirLight)

		ambientLight = new THREE.AmbientLight(0x404040)
		scene.add(ambientLight)

		createGeometry()

		renderer = new THREE.WebGLRenderer({antialias: true})
		renderer.setSize(window.innerWidth, window.innerHeight)

		document.body.appendChild(renderer.domElement)
		document.addEventListener("keydown", onKeyDown, false)
	}

	let mainLoop = function() {
		camera.position.z -= 0.2

		renderer.render(scene, camera)
		requestAnimationFrame(mainLoop)
	}

	init()
	mainLoop()
}




		// camera.lookAt(new THREE.Vector3(0,0,0))
		// camera.position.x = 40 * Math.sin(theta)
		// camera.position.z = 40 * Math.cos(theta)