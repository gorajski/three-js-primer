let scene, camera, renderer

window.onload = () => { 
	
	let STEP = 0.02;
	let particles

	let randomInRange = function(to, from) {
		return Math.random() * (to - from) + from
	}

	let createGeometry = function () {
		let material = new THREE.PointsMaterial({color: 0xffffff, size: 0.2})
		let geometry = new THREE.Geometry()

		for (let i = 1; i <= 1000; i++) {
			let x = randomInRange(-25, 25)
			let y = randomInRange(-25, 25)
			let z = randomInRange(-25, 25)
			geometry.vertices.push(new THREE.Vector3(x,y,z))
		}

		geometry.computeBoundingSphere()
		particles = new THREE.Points(geometry, material)

		scene.add(particles)
	}

	let init = function() {
		scene = new THREE.Scene()
		scene.background = new THREE.Color(0x1111ee)

		camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000)
		camera.position.z = 15

		createGeometry()

		renderer = new THREE.WebGLRenderer({antialias: true})
		renderer.setSize(window.innerWidth, window.innerHeight)

		document.body.appendChild(renderer.domElement)
	}

	let mainLoop = function() {
		// cylinder.rotation.x += STEP

		renderer.render(scene, camera)
		requestAnimationFrame(mainLoop)
	}

	init()
	mainLoop()
}