let scene, camera, renderer
let box, sphere

window.onload = () => { 
	
	let STEP = 0.03

	// let randomInRange = function(from,to) {
	// 	let x = Math.random() * (to - from)
	// 	return x + from
	// }

	let createGeometry = function() {
		let texture = new THREE.TextureLoader().load('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc8xREH3RMFHT9i58G87JY-a37q4g2JvIPAhgLxYLD8IDIE6V3')

		// let material = new THREE.MeshBasicMaterial({map: texture})
		let material = new THREE.MeshPhongMaterial({map: texture})
		let geometry = new THREE.BoxGeometry(4,4,4)
		box = new THREE.Mesh(geometry, material)

		scene.add(box)

		texture = new THREE.TextureLoader().load('https://upload.wikimedia.org/wikipedia/commons/c/c1/Expanded_metal.jpg')
		geometry = new THREE.SphereGeometry(4,30,30)
		// material = new THREE.MeshBasicMaterial({map: texture})
		material = new THREE.MeshPhongMaterial({map: texture})
		sphere = new THREE.Mesh(geometry, material)
		sphere.position.set(-7,2,-2)

		scene.add(sphere)
	}

	let init = function() {
		scene = new THREE.Scene()
		scene.background = new THREE.Color(0xffffff)

		camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000)
		camera.position.set(0,0,20)

		let directionalLightUp = new THREE.DirectionalLight(0xffffff)
		scene.add(directionalLightUp)

		let directionalLightDown = new THREE.DirectionalLight(0xabcdef)
		scene.add(directionalLightDown)
		directionalLightDown.position.y = -1

		createGeometry()

		renderer = new THREE.WebGLRenderer({antialias: true})
		renderer.setSize(window.innerWidth, window.innerHeight)

		document.body.appendChild(renderer.domElement)
	}

	let mainLoop = function() {
		box.rotation.x += STEP
		box.rotation.y += STEP
		sphere.rotation.x += STEP
		sphere.rotation.y += STEP

		renderer.render(scene, camera)
		requestAnimationFrame(mainLoop)
	}

	init()
	mainLoop()
}