let scene, camera, renderer, light, spotLight1, helper, spotLightTarget1

window.onload = () => { 
	
	let STEP = 0.33
	let theta = 0

	let createCube = function(size, color, position) {
		let geometry = new THREE.BoxGeometry(...size)
		let material = new THREE.MeshPhongMaterial({color: color, side: THREE.DoubleSide})

		let cube = new THREE.Mesh(geometry,material)
		cube.position.set(...position)

		scene.add(cube)
	}

	let init = function() {
		scene = new THREE.Scene()
		scene.background = new THREE.Color(0x000000)

		camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000)
		camera.position.set(0,7,14)

		spotLight1 = new THREE.SpotLight(0xffffff, 0.8, 200, Math.PI / 16, 0.075, 2)
		spotLight1.position.set(15,20,0)
		scene.add(spotLight1)

		spotLight2 = new THREE.SpotLight(0xffffff, 0.8, 200, Math.PI / 16, 0.075, 2)
		spotLight2.position.set(-15,20,0)
		scene.add(spotLight2)

		spotLightTarget1 = new THREE.Object3D()
		scene.add(spotLightTarget1)
		spotLight1.target = spotLightTarget1

		spotLightTarget2 = new THREE.Object3D()
		scene.add(spotLightTarget2)
		spotLight2.target = spotLightTarget2

		createCube([2000,1,2000], 0x693421, [0,0,0])
		createCube([5,2,5], 0x33f933, [-2,1,-6])
		createCube([5,3,5], 0xe36933, [-5,2,1])
		createCube([5,3,5], 0x7329f3, [-10,1,-6])
		createCube([5,3,5], 0xe32913, [8,0.5,2])
		createCube([6,2,6], 0x0111f3, [7,1,-7])
		createCube([6,2,6], 0x44444f, [1,0,6])

		renderer = new THREE.WebGLRenderer({antialias: true})
		renderer.setSize(window.innerWidth, window.innerHeight)

		document.body.appendChild(renderer.domElement)
	}

	let mainLoop = function() {
		
		spotLightTarget1.position.x += STEP
		spotLightTarget2.position.x -= STEP
		if (spotLightTarget1.position.x > 20 || spotLightTarget1.position.x < -10) STEP *= -1


		renderer.render(scene, camera)
		requestAnimationFrame(mainLoop)
	}

	init()
	mainLoop()
}