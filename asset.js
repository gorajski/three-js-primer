let scene, camera, renderer

window.onload = () => { 
	
	const STEP = 0.05;
	let count, shape

	let init = function() {
		count = 0

		// create scene
		scene = new THREE.Scene()
		scene.background = new THREE.Color(0xeeeeee)

		// create camera
		camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 10, 2000)
		camera.position.z = 20

		// create and locate objects in the scene
		let loader = new THREE.FontLoader()
		let font = loader.parse(fontJSON)

		let geometry = new THREE.TextGeometry("hello world", {font: font, size: 5, height: 2})
		//font - font object loaded by the font loader
		//size - font size
		//height - text depth AKA thickness in the z-axis

		let material = new THREE.MeshBasicMaterial({color: 0x034b59})
		text = new THREE.Mesh(geometry,material)
		text.position.x = -15
		text.position.z = -25
		
		scene.add(text)

		// create the renderer
		renderer = new THREE.WebGLRenderer({ antialias: true })
		renderer.setSize(window.innerWidth, window.innerHeight)

		document.body.appendChild(renderer.domElement)
	}

	let mainLoop = function() {
		
		text.rotation.x += STEP

		renderer.render(scene, camera)
		requestAnimationFrame(mainLoop)
	}

	init()
	mainLoop()
}