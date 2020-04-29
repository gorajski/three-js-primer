let scene, camera, renderer
let cube1, cube2, spotLight, plane

window.onload = () => { 
	
	let STEP = 0.02
	let theta = 0

	// let randomInRange = function(from,to) {
	// 	let x = Math.random() * (to - from)
	// 	return x + from
	// }

	let createGeometry = function() {
		
		let geometry = new THREE.BoxGeometry(5, 5, 5)
		let material = new THREE.MeshPhongMaterial({color: 0xdff913, shininess: 100, side: THREE.DoubleSide})

		cube1 = new THREE.Mesh(geometry, material)
		cube1.position.set(5, 2, 0)
		cube1.castShadow = true
		cube1.receiveShadow = true

		geometry = new THREE.BoxGeometry(5, 6, 4)
		cube2 = new THREE.Mesh(geometry, material)
		cube2.position.set(-4, 2, 0)
		cube2.castShadow = true

		geometry = new THREE.BoxGeometry(2000,1,2000)
		material = new THREE.MeshPhongMaterial({color: 0x693421, side: THREE.DoubleSide})
		plane = new THREE.Mesh(geometry,material)
		plane.position.y = -1
		plane.receiveShadow = true

		scene.add(cube1)
		scene.add(cube2)
		scene.add(plane)
	}

	let init = function() {
		scene = new THREE.Scene()
		scene.background = new THREE.Color(0x000000)
		scene.fog = new THREE.Fog(0x000000)

		camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000)
		camera.position.set(0,5,40)

		createGeometry()
		spotLight = new THREE.SpotLight(0xffffff, 1)
		spotLight.position.set(0,15,10)
		spotLight.angle = Math.PI / 2
		spotLight.penumbra = 0.05
		spotLight.decay = 2
		spotLight.distance = 200

		spotLight.castShadow = true
		spotLight.shadow = new THREE.LightShadow(new THREE.PerspectiveCamera(50, 1, 10, 2500))
		spotLight.shadow.bias = 0.0001
		spotLight.shadow.mapSize.width = 2048
		spotLight.shadow.mapSize.height = 1024

		let shadowCameraHelper = new THREE.CameraHelper(spotLight.shadow.camera);
		shadowCameraHelper.visible = true;
		scene.add(shadowCameraHelper)

		scene.add(spotLight)


		renderer = new THREE.WebGLRenderer()
		renderer.setSize(window.innerWidth, window.innerHeight)

		renderer.shadowMap.enabled = true
		renderer.shadowMap.type = THREE.PCFShadowMap

		document.body.appendChild(renderer.domElement)
	}

	let mainLoop = function() {
		spotLight.position.x = 10 * Math.sin(theta)
		spotLight.position.z = 10 * Math.cos(theta)
		theta += STEP

		renderer.render(scene, camera)
		requestAnimationFrame(mainLoop)
	}

	init()
	mainLoop()
}