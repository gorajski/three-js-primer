let scene, camera, renderer, particles = []
let STEP = 0.2, theta = 0
const LEFT = 37, RIGHT = 39, UP = 38, DOWN = 40

window.onload = function() {

	let randomInRange = (from, to) => {
		let x = Math.random() * (to - from)
		return x + from
	}

	class Particle {
		constructor() {
			let geometry = new THREE.SphereGeometry(0.5, 30, 30)
			let material = new THREE.MeshPhongMaterial(
				{color: 0xffffff, shininess: 100, specular: 0xafeeee, side: THREE.DoubleSide}
			)
			this.mesh = new THREE.Mesh(geometry, material)
			this.mesh.position.x = randomInRange(-15,15)
			this.mesh.position.y = randomInRange(-5,5)
			this.mesh.position.z = randomInRange(-10,10)
			this.radius = this.mesh.position.x

			this.theta = 0
			this.dTheta = 2 * Math.PI / randomInRange(150, 200)
			this.yFactor = randomInRange(0, Math.PI)
		}

		move() {
			this.mesh.position.x = this.radius * Math.sin(this.theta)
			this.mesh.position.y = this.radius * Math.sin(this.theta + this.yFactor)
			this.mesh.position.z = this.radius * Math.cos(this.theta)
			this.theta += this.dTheta
		}
	}

	let createGeometry = () => {
		for(let i = 1; i <= 10; i++) {
			let p = new Particle()
			particles.push(p)
			scene.add(p.mesh)
		}
	}

	let createLights = function() {
		let light1 = new THREE.PointLight(0xffffff, 2, 30, 2)
		let light2 = new THREE.PointLight(0xffffff, 2, 30, 2)
		let light3 = new THREE.PointLight(0xffffff, 2, 30, 2)
		light1.position.set(0,0,0)
		light2.position.set(0,10,0)
		light3.position.set(0,-10,0)
		scene.add(light1)
		scene.add(light2)
		scene.add(light3)
	}

	let onKeyDown = function(e) {
		if (e.keyCode == DOWN) {
			camera.position.z += 1*STEP
		} else if (e.keyCode == UP) {
			camera.position.z -= 1*STEP
		}
	}

	let init = function() {
		scene = new THREE.Scene()
		scene.background = new THREE.Color(0x000000)

		camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 1000)
		camera.position.set(0, 0, 20)
		scene.add(camera)

		createLights()
		createGeometry()

		renderer = new THREE.WebGLRenderer()
		renderer.setSize(window.innerWidth, window.innerHeight)

		document.body.appendChild(renderer.domElement)
		document.addEventListener("keydown", onKeyDown, false)
	}

	let mainLoop = function() {
		particles.forEach(p => p.move())

		renderer.render(scene, camera)
		requestAnimationFrame(mainLoop)
	}

	init()
	mainLoop()

}