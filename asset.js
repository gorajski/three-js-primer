let scene, camera, renderer

window.onload = () => { 
	
	const STEP = 0.2
	let delay = 0
	let triangles = []

	let createTriangle = function (point1, point2, point3) {
		let material = new THREE.MeshNormalMaterial({side: THREE.DoubleSide}) //, color: 0x7fc5f9, emissive: 0x25673d, emissiveIntensity: 0.4, metalness: 1})
		
		let geometry = new THREE.Geometry()
		geometry.vertices.push(new THREE.Vector3(...point1))
		geometry.vertices.push(new THREE.Vector3(...point2))
		geometry.vertices.push(new THREE.Vector3(...point3))
		geometry.faces.push(new THREE.Face3(0,1,2))
		geometry.computeFaceNormals()
		geometry.computeVertexNormals()
		let triangle = new THREE.Mesh(geometry, material)
		triangle.position.x = -6

		return triangle
	}

	let addTriangles = function() {
		triangles.push(createTriangle(
			[0,0,0],
			[4,0,0],
			[2,2,-2]
		))
		triangles.push(createTriangle(
			[0,0,0],
			[2,2,-2],
			[0,0,-4]
		))
		triangles.push(createTriangle(
			[4,0,0],
			[4,0,-4],
			[2,2,-2]
		))
		triangles.push(createTriangle(
			[4,0,-4],
			[0,0,-4],
			[2,2,-2]
		))
		triangles.push(createTriangle(
			[0,0,0],
			[2,-2,-2],
			[4,0,0]
		))
		triangles.push(createTriangle(
			[0,0,0],
			[0,0,-4],
			[2,-2,-2]
		))
		triangles.push(createTriangle(
			[4,0,-4],
			[4,0,0],
			[2,-2,-2]
		))
		triangles.push(createTriangle(
			[0,0,-4],
			[4,0,-4],
			[2,-2,-2]
		))
	}

	let init = function() {
		scene = new THREE.Scene()
		scene.background = new THREE.Color(0x1111ee)

		camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000)
		camera.position.z = 25

		let directionalLightUp = new THREE.DirectionalLight(0xffffff)
		scene.add(directionalLightUp)

		addTriangles()

		renderer = new THREE.WebGLRenderer({antialias: true})
		renderer.setSize(window.innerWidth, window.innerHeight)

		document.body.appendChild(renderer.domElement)
	}

	let mainLoop = function() {

		triangles.forEach((triangle) => {
			let normal = triangle.geometry.faces[0].normal
			triangle.position.x += normal.x * STEP
			triangle.position.y += normal.y * STEP
			triangle.position.z += normal.z * STEP

			triangle.rotation.x += STEP/2

			scene.add(triangle)
		})

		renderer.render(scene, camera)
		requestAnimationFrame(mainLoop)
	}

	init()
	mainLoop()
}