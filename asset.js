let scene, camera, renderer
let sphere

window.onload = () => { 
	
	let STEP = 0.035
	let theta = 0
	const RADIUS = 5, BASE_X = -16.5, BASE_Y = -20

	let createGeometry = function() {
		let material = new THREE.MeshPhongMaterial({color: 0x0450fb, shininess: 100, side: THREE.DoubleSide})

		for(let i = 0; i < 4; i++) {
			for(let j = 0; j < 4; j++) {
				let geometry = new THREE.SphereGeometry(RADIUS,30,30)
				let sphere = new THREE.Mesh(geometry,material)
				sphere.position.x = BASE_X + j * 2 * (RADIUS+0.5)
				sphere.position.y = BASE_Y
				sphere.position.z = -2*RADIUS * i
				scene.add(sphere)
			}
		}

	}

	let createTargetSphere = function() {
		let material = new THREE.MeshPhongMaterial({color: 0x00ff18, shininess: 100, side: THREE.DoubleSide})
		let geometry = new THREE.SphereGeometry(RADIUS,30,30)
		sphere = new THREE.Mesh(geometry, material)
		sphere.position.set(0,0,0)

		scene.add(sphere)
	}



	let init = function() {
		scene = new THREE.Scene()
		scene.background = new THREE.Color(0xffffff)

		camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 7, 1000)
		camera.position.set(0,10,60)

		spotlight = new THREE.SpotLight(0xffffff, 1.2)
		spotlight.position.set(0,5000,0)

		toplight = new THREE.HemisphereLight(0x111111, 0x000000, 1)

		scene.add(spotlight)
		// scene.add(toplight)

		createGeometry()
		createTargetSphere()

		renderer = new THREE.WebGLRenderer({antialias: true})
		renderer.setSize(window.innerWidth, window.innerHeight)

		document.body.appendChild(renderer.domElement)
	}

	let mainLoop = function() {

		camera.position.set(sphere.position.x, sphere.position.y, sphere.position.z + 15)

		sphere.position.y = 30*Math.sin(theta)
		sphere.position.z = 30*Math.cos(theta)

		theta += STEP

		renderer.render(scene, camera)
		requestAnimationFrame(mainLoop)
	}

	init()
	mainLoop()
}




		// camera.lookAt(new THREE.Vector3(0,0,0))
		// camera.position.x = 40 * Math.sin(theta)
		// camera.position.z = 40 * Math.cos(theta)