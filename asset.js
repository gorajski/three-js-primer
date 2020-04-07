let scene, camera, renderer, light, cube, cone, plane

window.onload = () => { 
	
	let STEP = 0.01
	let theta = 0

	let createGeometry = function () {
		let geometry = new THREE.BoxGeometry(5,5,5)
		let material = new THREE.MeshPhongMaterial({color: 0xdff913, shininess: 100, side: THREE.DoubleSide})

		cube = new THREE.Mesh(geometry,material)
		cube.position.set(5, 0 , 0)

		geometry = new THREE.BoxGeometry(2000, 1, 2000)
		material = new THREE.MeshPhongMaterial({color: 0x693421, side: THREE.DoubleSide})
		plane = new THREE.Mesh(geometry, material)
		plane.position.y = -1

		scene.add(cube)
		scene.add(plane)

	}

	let init = function() {
		scene = new THREE.Scene()
		scene.background = new THREE.Color(0x000000)

		camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000)
		camera.position.set(0,10,20)

		spotLight = new THREE.SpotLight(0xffffff, 1)
		spotLight.position.set(15,20,10)
		spotLight.angle = Math.PI / 20
		spotLight.penumbra = 0.05
		spotLight.decay = 2
		spotLight.distance = 200

		scene.add(spotLight)

		createGeometry()

		renderer = new THREE.WebGLRenderer({antialias: true})
		renderer.setSize(window.innerWidth, window.innerHeight)

		document.body.appendChild(renderer.domElement)
	}

	let mainLoop = function() {
		
		spotLight.angle += STEP
		if (spotLight.angle > Math.PI/2 || spotLight.angle < 0) STEP *= -1


		renderer.render(scene, camera)
		requestAnimationFrame(mainLoop)
	}

	init()
	mainLoop()
}