let scene, camera, renderer, light, cube, cone, plane

window.onload = () => { 
	
	let STEP = 0.1

	let createGeometry = function () {
		let geometry = new THREE.BoxGeometry(5,5,5)
		let material = new THREE.MeshPhongMaterial({color: 0xdff913, shininess: 100, side: THREE.DoubleSide})

		cube = new THREE.Mesh(geometry,material)
		cube.rotation.x = 0.6
		cube.rotation.y = 0.6

		scene.add(cube) 
	}

	let init = function() {
		scene = new THREE.Scene()
		scene.background = new THREE.Color(0x000000)

		camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000)
		camera.position.z = 25

		light = new THREE.PointLight(0xffffff, 2, 20, 2)
		light.position.set(0,5,0)

		let ambient = new THREE.AmbientLight(0xeeeeee, 1)

		scene.add(light)
		scene.add(ambient)

		lightHelper = new THREE.PointLightHelper(light, 5, 0x000000)
		scene.add(lightHelper)


		createGeometry()

		renderer = new THREE.WebGLRenderer({antialias: true})
		renderer.setSize(window.innerWidth, window.innerHeight)

		document.body.appendChild(renderer.domElement)
	}

	let mainLoop = function() {
		
		if (Math.abs(light.position.x) > 10) STEP *= -1

		lightHelper.update()

		renderer.render(scene, camera)
		requestAnimationFrame(mainLoop)
	}

	init()
	mainLoop()
}