let scene, camera, renderer
let pyramid1, pyramid2, pyramid3, spotLight, plane

window.onload = () => { 
	
	let STEP = 0.01
	let theta = 0

	let randomInRange = function(from,to) {
		let x = Math.random() * (to - from)
		return x + from
	}

	let createGeometry = function() {
		let pyramidTexture = new THREE.TextureLoader().load('https://as2.ftcdn.net/jpg/02/08/05/15/500_F_208051513_sRobBVhkSgvYLxo6pmCavAxwjONTKHT2.jpg')
		let groundTexture = new THREE.TextureLoader().load('https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/016vallesmarineris_reduced0.25.jpg/1024px-016vallesmarineris_reduced0.25.jpg')
		
		let geometry = new THREE.CylinderBufferGeometry(0, 11, 11, 4)
		let material = new THREE.MeshPhongMaterial({ map: pyramidTexture, shininess: 12, side: THREE.DoubleSide })

		pyramid1 = new THREE.Mesh(geometry, material)
		pyramid1.position.set(20, 3.75, -30)
		pyramid1.castShadow = true
		pyramid1.receiveShadow = false

		geometry = new THREE.CylinderBufferGeometry(0, 10, 10, 4)
		pyramid2 = new THREE.Mesh(geometry, material)
		pyramid2.position.set(-10, 3, 4)
		pyramid2.castShadow = true

		geometry = new THREE.CylinderBufferGeometry(0, 15, 15, 4)
		pyramid3 = new THREE.Mesh(geometry, material)
		pyramid3.position.set(0, 7, -13)
		pyramid3.castShadow = true
		pyramid3.receiveShadow = false

		geometry = new THREE.CylinderBufferGeometry(0, 4, 4, 4)
		pyramid4 = new THREE.Mesh(geometry, material)
		pyramid4.position.set(-22, 1, -13)
		pyramid4.castShadow = true
		pyramid4.receiveShadow = false

		geometry = new THREE.BoxGeometry(2000,1,2000)
		material = new THREE.MeshPhongMaterial({map: groundTexture, shininess: 20, side: THREE.DoubleSide})
		plane = new THREE.Mesh(geometry,material)
		plane.position.y = -1
		plane.receiveShadow = true

		scene.add(pyramid1)
		scene.add(pyramid2)
		scene.add(pyramid3)
		scene.add(pyramid4)
		scene.add(plane)
	}

	let init = function() {
		scene = new THREE.Scene()
		scene.background = new THREE.Color(0xaaccff)
		scene.fog = new THREE.Fog(0x000000)

		camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000)
		camera.position.set(0,12,66)

		createGeometry()
		spotLight = new THREE.SpotLight(0xffffff, 1)
		spotLight.position.set(0,500,10)
		spotLight.angle = Math.PI / 2
		spotLight.penumbra = 0.05
		spotLight.decay = 0
		spotLight.distance = 200
		spotLight.intensity = 1.8

		spotLight.castShadow = true
		spotLight.shadow = new THREE.LightShadow(new THREE.PerspectiveCamera(50, 1, 10, 2500))
		spotLight.shadow.bias = 0.0001
		spotLight.shadow.mapSize.width = 2048
		spotLight.shadow.mapSize.height = 2048

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
		spotLight.position.x = 800 * Math.sin(theta)
		spotLight.position.y = 800 * Math.cos(theta)
		theta += STEP

		renderer.render(scene, camera)
		requestAnimationFrame(mainLoop)
	}

	init()
	mainLoop()
}