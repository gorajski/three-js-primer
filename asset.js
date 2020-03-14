let scene, camera, renderer

window.onload = () => { 
	
	let STEP = 0.1;
	let shape

	let createGeometry = function () {
		// let geometry = new THREE.BoxGeometry(5,5,5)
		// let geometry = new THREE.SphereGeometry(5, 30, 30)
		let geometry = new THREE.TorusGeometry(5, 2, 10, 12)
		// let material = new THREE.MeshBasicMaterial({color: 0xbbbbbb, wireframe: true})
		let material = new THREE.MeshNormalMaterial() 

		shape = new THREE.Mesh(geometry,material)

		// normals = new THREE.FaceNormalsHelper(sphere, 5)

		scene.add(shape)
		// scene.add(sphere)
		// scene.add(normals)
	}

	let init = function() {
		scene = new THREE.Scene()
		scene.background = new THREE.Color(0x1111ee)

		camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 10, 2000)
		camera.position.z = 20

		createGeometry()

		renderer = new THREE.WebGLRenderer({antialias: true})
		renderer.setSize(window.innerWidth, window.innerHeight)

		document.body.appendChild(renderer.domElement)
	}

	let mainLoop = function() {
		shape.rotation.x += STEP
		shape.rotation.y += STEP
		// normals.update()

		renderer.render(scene, camera)
		requestAnimationFrame(mainLoop)
	}

	init()
	mainLoop()
}