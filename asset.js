let scene, camera, renderer

window.onload = () => { 
	
	let STEP = 0.02;
	let cube, sphere, cone

	let createGeometry = function () {
		let material = new THREE.MeshStandardMaterial({side: THREE.DoubleSide, color: 0x7fc5f9, emissive: 0x25673d, emissiveIntensity: 0.4, metalness: 0.1, roughness: 0.5})
		
		let geometry = new THREE.BoxGeometry(3,3,3)
		cube = new THREE.Mesh(geometry, material)
		cube.position.x = -6

		geometry = new THREE.SphereGeometry(3,90,90)
		sphere = new THREE.Mesh(geometry, material)
		sphere.position.x = 0

		geometry = new THREE.ConeGeometry(3,4,90,1,true)
		cone = new THREE.Mesh(geometry,material)
		cone.position.x = 7

		scene.add(cube)
		scene.add(sphere)
		scene.add(cone)
	}

	let init = function() {
		scene = new THREE.Scene()
		scene.background = new THREE.Color(0x1111ee)

		camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000)
		camera.position.z = 15

		let directionalLightUp = new THREE.DirectionalLight(0xffffff)
		scene.add(directionalLightUp)

		createGeometry()

		renderer = new THREE.WebGLRenderer({antialias: true})
		renderer.setSize(window.innerWidth, window.innerHeight)

		document.body.appendChild(renderer.domElement)
	}

	let mainLoop = function() {
		sphere.rotation.x += STEP
		sphere.rotation.y += STEP
		cube.rotation.x += STEP
		cube.rotation.y += STEP
		cone.rotation.x += STEP
		cone.rotation.y += STEP

		renderer.render(scene, camera)
		requestAnimationFrame(mainLoop)
	}

	init()
	mainLoop()
}