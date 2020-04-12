let scene, camera, renderer
let cylinder, sphere, plane, light1

window.onload = () => { 
	
	let STEP = 0.1
	let theta = 0

	let createGeometry = function() {
		let geometry = new THREE.CylinderGeometry(5,5,20,32)
		let material = new THREE.MeshPhongMaterial({color: 0x448844, shininess: 100, side: THREE.DoubleSide})

		cylinder = new THREE.Mesh(geometry, material)
		cylinder.position.set(6,0,-2)

		geometry = new THREE.SphereGeometry(5, 30, 30)
		material = new THREE.MeshPhongMaterial({color: 0x693421, side: THREE.DoubleSide})

		sphere = new THREE.Mesh(geometry,material)
		sphere.position.set(-5, 5, 2)

		geometry = new THREE.BoxGeometry(2000,1,2000)
		material = new THREE.MeshPhongMaterial({color: 0xabcdef, side: THREE.DoubleSide})

		plane = new THREE.Mesh(geometry, material)
		plane.position.y = -1

		scene.add(cylinder)
		scene.add(sphere)
		scene.add(plane)
	}

	let init = function() {
		scene = new THREE.Scene()
		scene.background = new THREE.Color(0x000000)

		camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 7, 800)
		camera.position.set(0,10,40)

		light1 = new THREE.SpotLight(0xffffff, 1)
		light1.position.set(0,10,15)

		scene.add(light1)

		createGeometry()

		renderer = new THREE.WebGLRenderer({antialias: true})
		renderer.setSize(window.innerWidth, window.innerHeight)

		document.body.appendChild(renderer.domElement)
	}

	let mainLoop = function() {
		camera.lookAt(new THREE.Vector3(0,0,0))
		camera.position.x = 40 * Math.sin(theta)
		camera.position.z = 40 * Math.cos(theta)
		theta += STEP

		renderer.render(scene, camera)
		requestAnimationFrame(mainLoop)
	}

	init()
	mainLoop()
}