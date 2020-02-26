let scene, camera, renderer
let torusArray = []
let increment = 0.1;

window.onload = () => { 

	let createTorus = function() {
		let radius = 0.4 + 0.25 * Math.random()
		let thickness = 0.14 + 0.15 * Math.random()

		let geometry = new THREE.TorusGeometry(radius,thickness,8,16)

		let red = Math.floor(255 * Math.random())
		let green = Math.floor(255 * Math.random())
		let blue = Math.floor(255 * Math.random())
		let material = new THREE.MeshBasicMaterial({color: `rgb(${red},${green},${blue})`})

		let torus = new THREE.Mesh(geometry, material)

		torus.position.x = -20 + 40 * Math.random()
		torus.position.y = -6 + 24 * Math.random()
		torus.rotation.x = Math.PI * Math.random()
		torus.rotation.y = Math.PI * Math.random()

		return torus
	}

	let init = function() {
		// create scene
		scene = new THREE.Scene()
		scene.background = new THREE.Color(0x000000)
		
		// create and locate the camera
		camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 10, 2000)
		camera.position.z = 20

		// create and locate the objects on the scene
		for (let i = 0; i < 20; i++) {
			let torus = createTorus()
			torusArray.push(torus)
			scene.add(torus)
		}

		// create the renderer
		renderer = new THREE.WebGLRenderer({ antialias: true })
		renderer.setSize(window.innerWidth, window.innerHeight)

		document.body.appendChild(renderer.domElement)
	}

	let mainLoop = function() {
		
		torusArray.forEach( (torus) => {
			torus.rotation.x += increment
			torus.position.y -= increment

			if (torus.position.y < -16) torus.position.y = 16
		})

		// let axes = new THREE.AxesHelper( 5 )
		// scene.add(axes)

		renderer.render(scene, camera)
		requestAnimationFrame(mainLoop)
	}

	init()
	mainLoop()
}