let scene, camera, renderer

window.onload = () => { 

	const STEP = 0.05;
	let shape

	let init = function() {
		// create scene
		scene = new THREE.Scene()
		scene.background = new THREE.Color(0x1c1155)

		// create camera
		camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 10, 2000)
		camera.position.z = 20

		// create and locate objects in the scene
		let geometry = new THREE.Geometry()
		geometry.vertices.push(new THREE.Vector3(3,0,0))
		geometry.vertices.push(new THREE.Vector3(0,5,0))
		geometry.vertices.push(new THREE.Vector3(0,0,2))
		geometry.vertices.push(new THREE.Vector3(1,2,-2))

		geometry.faces.push(new THREE.Face3(0,1,2))
		geometry.faces.push(new THREE.Face3(1,2,3))
		geometry.faces.push(new THREE.Face3(0,1,3))

		let material = new THREE.MeshBasicMaterial({color: 0xffffff, side: THREE.DoubleSide, wireframe: true})
		
		shape = new THREE.Mesh(geometry,material)
		
		scene.add(shape)

		// create the renderer
		renderer = new THREE.WebGLRenderer({ antialias: true })
		renderer.setSize(window.innerWidth, window.innerHeight)

		document.body.appendChild(renderer.domElement)
	}

	let mainLoop = function() {
		shape.rotation.x += STEP
		shape.rotation.y += STEP

		renderer.render(scene, camera)
		requestAnimationFrame(mainLoop)
	}

	init()
	mainLoop()
}