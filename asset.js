let scene, camera, renderer

window.onload = () => { 
	
	let STEP = 0.06;
	let cube, sphere

	let createGeometry = function () {
		// let material = new THREE.LineBasicMaterial({color: 0xffffff, linewidth: 1})
		// let material = new THREE.LineDashedMaterial({color: 0xffffff, linewidth: 1, dashSize: 2, gapSize: 1})
		let material = new THREE.PointsMaterial({color: 0xffffff})
		let geometry = new THREE.CylinderGeometry(3,2,4)

		// cylinder = new THREE.Line(geometry,material)
		cylinder = new THREE.Points(geometry,material)
		cylinder.position.z = -10
		cylinder.position.x = -5

		// cylinder.computeLineDistances()		// uncomment for Line materials


		geometry = new THREE.SphereGeometry(3, 30, 30)

		// sphere = new THREE.Line(geometry, material)
		sphere = new THREE.Points(geometry, material)
		sphere.position.z = 0
		sphere.position.x = 5

		// sphere.computeLineDistances()		// uncomment for Line materials

		scene.add(cylinder)
		scene.add(sphere)
	}

	let init = function() {
		scene = new THREE.Scene()
		scene.background = new THREE.Color(0x1111ee)

		camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000)
		camera.position.z = 15

		createGeometry()

		renderer = new THREE.WebGLRenderer({antialias: true})
		renderer.setSize(window.innerWidth, window.innerHeight)

		document.body.appendChild(renderer.domElement)
	}

	let mainLoop = function() {
		cylinder.rotation.x += STEP
		cylinder.rotation.y += STEP
		sphere.rotation.x += STEP
		sphere.rotation.y += STEP

		renderer.render(scene, camera)
		requestAnimationFrame(mainLoop)
	}

	init()
	mainLoop()
}