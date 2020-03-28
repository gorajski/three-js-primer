let scene, camera, renderer, light, cube, cone, plane

window.onload = () => { 
	
	let STEP = 0.1

	let createGeometry = function () {
		let geometry = new THREE.BoxGeometry(5,5,5)
		let material = new THREE.MeshPhongMaterial({color: 0x0f1d89, shininess: 100, side: THREE.DoubleSide})

		cube = new THREE.Mesh(geometry,material)
		cube.position.set(-6,-5,-6)

		geometry = new THREE.ConeGeometry(3,4,20,1,true)
		cone = new THREE.Mesh(geometry, material)
		cone.position.set(7,-5,0)

		geometry = new THREE.PlaneGeometry(1000, 1000, 50, 50)
		material = new THREE.MeshPhongMaterial({color: 0x693421, side: THREE.DoubleSide})
		plane = new THREE.Mesh(geometry,material)
		plane.rotation.x = Math.PI/2
		plane.position.y = -100;

		geometry = new THREE.SphereGeometry(1,30,30)
		material = new THREE.MeshBasicMaterial({color: 0xffd700})
		sphere = new THREE.Mesh(geometry, material)
		sphere.position.set(10,5,0)

		scene.add(cube)
		scene.add(cone)
		scene.add(plane)
		scene.add(sphere)
	}

	let init = function() {
		scene = new THREE.Scene()
		scene.background = new THREE.Color(0x88afef)

		camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000)
		camera.position.z = 25

		light = new THREE.DirectionalLight(0xffffff)
		light.position.set(10,5,0)

		scene.add(light)

		lightHelper = new THREE.DirectionalLightHelper(light, 5, 0x000000)
		scene.add(lightHelper)

		createGeometry()

		renderer = new THREE.WebGLRenderer({antialias: true})
		renderer.setSize(window.innerWidth, window.innerHeight)

		document.body.appendChild(renderer.domElement)
	}

	let mainLoop = function() {
		light.position.x += STEP
		sphere.position.x += STEP
		if (Math.abs(light.position.x) > 10) STEP *= -1

		lightHelper.update()

		renderer.render(scene, camera)
		requestAnimationFrame(mainLoop)
	}

	init()
	mainLoop()
}