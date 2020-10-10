let scene, camera, renderer, light, plane
let STEP = 0.02, theta = 0

window.onload = function() {

	let createGeometry = function() {
		let texture = new THREE.TextureLoader().load('https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Adrar_sands.JPG/1280px-Adrar_sands.JPG')
		let material = new THREE.MeshLambertMaterial({map: texture})
		let geometry = new THREE.BoxGeometry(1000, 1, 1000)
		plane = new THREE.Mesh(geometry, material)
		plane.position.y = -1
		plane.receiveShadow = true

		scene.add(plane)
		scene.add(createPyramid(115, 9, 0, 20, 25))
		scene.add(createPyramid(50, 14, -20, 30, 40))
		scene.add(createPyramid(-20, 9, 0, 20, 25))
		scene.add(createPyramid(-60, 4, -35, 10, 10))
	}

	let createPyramid = function(x, y, z, height, width) {
		let texture = new THREE.TextureLoader().load('https://upload.wikimedia.org/wikipedia/commons/3/3b/Tuff_ohyaishi02.jpg')
		let geometry = new THREE.CylinderGeometry(0, width, height, 4)
		let material = new THREE.MeshLambertMaterial({map: texture})
		let p = new THREE.Mesh(geometry, material)
		p.position.set(x, y, z)
		p.castShadow = true
		p.receiveShadow = true
		return p
	}

	let init = function() {
		scene = new THREE.Scene()
		scene.background = new THREE.Color(0xbbddff)

		camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000)
		camera.position.set(0, 7, 90)
		camera.lookAt(new THREE.Vector3(-60,4,-35))

		createGeometry()

		light = new THREE.DirectionalLight(0xffffff, 1)
		light.castShadow = true

		light.shadow = new THREE.LightShadow(new THREE.PerspectiveCamera(60, 2, 10, 2000))
		light.shadow.bias = 0.00001
		light.shadow.mapSize.width = 2048
		light.shadow.mapSize.height = 1024
		light.position.set(180, 90, 0)

		scene.add(light)

		renderer = new THREE.WebGLRenderer()
		renderer.shadowMap.enabled = true
		renderer.setSize(window.innerWidth, window.innerHeight)
		
		document.body.appendChild(renderer.domElement)
	}

	let mainLoop = function() {
		light.position.x = 200 * Math.cos(theta)
		light.position.y = 200 * Math.sin(theta)
		theta += STEP

		renderer.render(scene, camera)
		requestAnimationFrame(mainLoop)
	}

	init()
	mainLoop()

}