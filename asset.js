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
		camera.position.y = 5
		camera.position.x = 10
		camera.rotation.x = -0.15


		// create and locate objects in the scene
		let geometry = new THREE.Geometry()
		geometry.vertices.push(new THREE.Vector3(0,0,0))
		geometry.vertices.push(new THREE.Vector3(5,2,0))
		geometry.vertices.push(new THREE.Vector3(3,-0.9,8))
		geometry.vertices.push(new THREE.Vector3(3,-0.9,-8))

		geometry.faces.push(new THREE.Face3(0,1,2))
		geometry.faces.push(new THREE.Face3(0,1,3))

		let material = new THREE.MeshBasicMaterial({color: 0xff0000, side: THREE.DoubleSide, wireframe: false})
		
		shape = new THREE.Mesh(geometry,material)
		
		
		scene.add(shape)

		// create the renderer
		renderer = new THREE.WebGLRenderer({ antialias: true })
		renderer.setSize(window.innerWidth, window.innerHeight)

		document.body.appendChild(renderer.domElement)
	}

	let mainLoop = function() {
		shape.geometry.vertices[2].y += 0.12 * Math.sin(count)
		shape.geometry.vertices[3].y += 0.12 * Math.sin(count)
		shape.geometry.verticesNeedUpdate = true
		count += STEP

		renderer.render(scene, camera)
		requestAnimationFrame(mainLoop)
	}

	init()
	mainLoop()
}