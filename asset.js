let scene, camera, renderer, light, particles = []
let STEP = 0.08, theta = 0
const LEFT = 37, RIGHT = 39, UP = 38, DOWN = 40

window.onload = function() {

	let createGeometry = function() {

		[...Array(10)].map(() => {
		  
			let radius = 20*Math.random()+1
			let position = new THREE.Vector3(0,0,radius)
			let frequency = Math.random()
			let phase = new THREE.Vector3(20*Math.random(), 20*Math.random(), 20*Math.random())

			createParticle(position, radius, frequency, phase)
		});
	}

	let createParticle = function(position, radius, frequency, phase) {
		let geometry = new THREE.SphereGeometry(1, 15, 13)
		let material = new THREE.MeshPhongMaterial({side: THREE.DoubleSide, color: 0xf3f3f3, specular: 0xffffff, shininess: 8})
		let particle = new THREE.Mesh(geometry, material)

		particle.position.set(position)
		particle.radius = radius
		particle.frequency = frequency
		particle.phase = phase

		particles.push(particle)
	}

	let createLight = function() {
		light = new THREE.PointLight(0xffffff, 1, 50)
		light.position.set(0,0,0)
		scene.add(light)
	}

	let onKeyDown = function(e) {
		if (e.keyCode == DOWN) {
			camera.position.z += 10*STEP
		} else if (e.keyCode == UP) {
			camera.position.z -= 10*STEP
		}
	}

	let init = function() {
		scene = new THREE.Scene()
		scene.background = new THREE.Color(0x0a0a0a)

		camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight)
		camera.position.set(0, 0, 50)
		scene.add(camera)

		createLight()
		createGeometry()

		renderer = new THREE.WebGLRenderer()
		renderer.shadowMap.enabled = true
		renderer.setSize(window.innerWidth, window.innerHeight)

		document.body.appendChild(renderer.domElement)
		document.addEventListener("keydown", onKeyDown, false)
	}

	let mainLoop = function() {
		theta += STEP

		for(let particle of particles) {
			particle.position.x = particle.radius * Math.sin(particle.frequency * theta + particle.phase.x)
			particle.position.y = particle.radius * Math.sin(particle.frequency * theta + particle.phase.y)
			particle.position.z = particle.radius * Math.sin(particle.frequency * theta + particle.phase.z)

			scene.add(particle)
		}

		renderer.render(scene, camera)
		requestAnimationFrame(mainLoop)
	}

	init()
	mainLoop()

}