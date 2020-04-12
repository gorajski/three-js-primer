let scene, camera, renderer
let light1
let spheres = []

window.onload = () => { 
	
	let STEP = 0.01
	let theta = 0
	const RADIUS = 5, BASE_X = -20, BASE_Y = -20

	let createGeometry = function() {
		let material = new THREE.MeshPhongMaterial({color: 0x0450fb, shininess: 100, side: THREE.DoubleSide})

		for(let i = 0; i < 4; i++) {
			for(let j = 0; j < 4; j++) {
				let geometry = new THREE.SphereGeometry(RADIUS,30,30)
				let sphere = new THREE.Mesh(geometry,material)
				sphere.position.x = BASE_X + j * 2 * (RADIUS+0.5)
				sphere.position.y = BASE_Y + i * RADIUS
				sphere.position.z = -2*RADIUS * i
				scene.add(sphere)
			}
		}

	}


	let init = function() {
		scene = new THREE.Scene()
		scene.background = new THREE.Color(0xffffff)

		camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 7, 1000)
		camera.position.set(0,10,60)

		light1 = new THREE.SpotLight(0xffffff, 1)
		light1.position.set(0,10,15)

		scene.add(light1)

		createGeometry()

		renderer = new THREE.WebGLRenderer({antialias: true})
		renderer.setSize(window.innerWidth, window.innerHeight)

		document.body.appendChild(renderer.domElement)
	}

	let mainLoop = function() {

		camera.lookAt(new THREE.Vector3(0,0,0))
		camera.position.x = 40 * Math.sin(theta)
		camera.position.z = 40 * Math.cos(theta)
		theta += STEP

		renderer.render(scene, camera)
		requestAnimationFrame(mainLoop)
	}

	setInterval(switchCamera, 3000)
	init()
	mainLoop()
}


let switchCamera = function() {
	if(camera instanceof THREE.PerspectiveCamera) {
		camera = new THREE.OrthographicCamera(-300, 300, 400, -400, 1, 1000)
		camera.zoom = 5
		camera.updateProjectionMatrix()
	} else {
		camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000)
		camera.position.set(0,0,40)
	}
}