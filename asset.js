let scene, camera, renderer

window.onload = () => { 
	
	const STEP = 0.05;
	let count, shape

	let createGeometry = function () {
		let loader = new THREE.FontLoader()
		let font = loader.parse(fontJSON)

		let titles = "99 bottles of beer on the wall,\n99 bottles of beer.\nTake one down and pass it around,\n98 bottles of beer on the wall.\n\n98 bottles of beer on the wall,\n98 bottles of beer.\nTake one down and pass it around,\n97 bottles of beer on the wall.\n\n3 bottles of beer on the wall,\n3 bottles of beer.\nTake one down and pass it around,\n2 bottles of beer on the wall.\n\n2 bottles of beer on the wall,\n2 bottles of beer.\nTake one down and pass it around,\n1 bottle of beer on the wall.\n\n1 bottle of beer on the wall,\n1 bottle of beer.\nTake one down and pass it around,\nno more bottles of beer on the wall.\n\nNo more bottles of beer on the wall,\nno more bottles of beer.\nGo to the store and buy some more, 99 bottles of beer on the wall.\n"
	
		let geometry = new THREE.TextGeometry(titles, {font: font, size: 1, height: 0.1})

		let material = new THREE.MeshBasicMaterial({color: 0xffffff})
		text = new THREE.Mesh(geometry,material)

		text.position.x = -10
		text.rotation.x = -0.9
		scene.add(text)
	}

	let init = function() {
		count = 0

		// create scene
		scene = new THREE.Scene()
		scene.background = new THREE.Color(0x000000)

		// create camera
		camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 10, 2000)
		camera.position.z = 20

		// create and locate objects in the scene
		createGeometry()

		// create the renderer
		renderer = new THREE.WebGLRenderer({ antialias: true })
		renderer.setSize(window.innerWidth, window.innerHeight)

		document.body.appendChild(renderer.domElement)
	}

	let mainLoop = function() {
		
		text.position.z -= STEP
		text.position.y += STEP / 2

		renderer.render(scene, camera)
		requestAnimationFrame(mainLoop)
	}

	init()
	mainLoop()
}