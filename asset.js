let scene, camera, renderer
let sphere, target, texture

window.onload = () => { 
	
	let STEP = 0.02
	let theta = 0

	// let randomInRange = function(from,to) {
	// 	let x = Math.random() * (to - from)
	// 	return x + from
	// }

	let createGeometry = function() {
		texture = new THREE.TextureLoader().load('https://upload.wikimedia.org/wikipedia/commons/2/26/Clouds_from_the_sky.jpg')
		texture.wrapS = THREE.RepeatWrapping
		texture.wrapT = THREE.RepeatWrapping
		texture.repeat.set(2,2)

		geometry = new THREE.SphereGeometry(5, 100, 100)
		material = new THREE.MeshBasicMaterial({map: texture, side: THREE.DoubleSide})

		sphere = new THREE.Mesh(geometry, material)

		scene.add(sphere)
	}

	let init = function() {
		scene = new THREE.Scene()
		scene.background = new THREE.Color(0xffffff)

		camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000)

		target = new THREE.Object3D()
		camera.lookAt(target.position)
		// let directionalLightUp = new THREE.DirectionalLight(0xffffff)
		// scene.add(directionalLightUp)

		// let directionalLightDown = new THREE.DirectionalLight(0xabcdef)
		// scene.add(directionalLightDown)
		// directionalLightDown.position.y = -1

		createGeometry()

		renderer = new THREE.WebGLRenderer({antialias: true})
		renderer.setSize(window.innerWidth, window.innerHeight)

		document.body.appendChild(renderer.domElement)
	}

	let mainLoop = function() {
		target.position.x = 10 * Math.sin(theta)
		target.position.z = 10 * Math.cos(theta)
		theta += STEP
		camera.lookAt(target.position)
		renderer.render(scene, camera)
		requestAnimationFrame(mainLoop)
	}

	init()
	mainLoop()
}