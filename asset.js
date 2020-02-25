let scene, camera, renderer
let torus
let increment = 0.1;

window.onload = () => { 

	let createTorus = function() {
		let geometry = new THREE.TorusGeometry(5,1,15,15,Math.PI)
		// Torus Properties:
		// The "center of gravity" to its outermost edge
		// The thickness of the tube AKA cross-sectional diameter
		// The radius segments count AKA # of segments around the circumference of the small circle
		// The tubular segments count AKA # of segments around the circumference of the large circle
		// The arc AKA fractional cut of the torus around the large circle

		let material = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true})
		torus = new THREE.Mesh(geometry, material)
		scene.add(torus)
	}

	let init = function() {
		// create scene
		scene = new THREE.Scene()
		scene.background = new THREE.Color(0x000000)
		
		// create and locate the camera
		camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000)
		camera.position.z = 20

		// create and locate the objects on the scene
		createTorus()

		// create the renderer
		renderer = new THREE.WebGLRenderer({ antialias: true })
		renderer.setSize(window.innerWidth, window.innerHeight)

		document.body.appendChild(renderer.domElement)
	}

	let mainLoop = function() {
		torus.rotation.x += increment
		torus.rotation.y += increment

		// let axes = new THREE.AxesHelper( 5 )
		// scene.add(axes)

		renderer.render(scene, camera)
		requestAnimationFrame(mainLoop)
	}

	init()
	mainLoop()
}