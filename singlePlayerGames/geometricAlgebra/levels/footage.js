/*
	General
		Remember, want to make it so you can doodle! Don't be too a priori!
		the basis vectors should be inside the scene
		is there an elegant way to feed back into the scene?
			the "real" ones are frozen in place, when you click them they're cloned
		The thinking is: you are trying to go from t = a to t = a + epsilon
			This tries to avoid numerical analysis. That might be impossible / foolish

	Properties of ideas
		Should be "satisfying" stuff. Look at "most satisfying video"
		Juicey
		Look to Rhythm Paradise for inspiration
		you want to put random things in the littlescene. That's how you make cool demoscene stuff
		It should mostly be about mechanics to be a fun easy thing for people to do in their lives with AR
			Look through mechanics textbooks for examples

	General ideas / mario-esque "areas"/islands
		Quantum mechanics
			/Electromagnetism
			/Optics
			/Electrical engineering
		Planetary motion
		Mechanical engineering
			Henry Segerman's weird gears
			Dice with constant angular momentum spinning in zero gravity
			Bicycle chain
			The machinery you have on the wheels of trains
			What's an example of adding torques?
			fireworks
			ink coming out of spinning pens https://www.youtube.com/watch?v=FOJ7JAUK6EU
		Special relativity?
		Condensed matter / "spatially extended" / the input is a big rectangle of values
			mandelbrot set
		Animals / humans, literally film them
			sport eg spinning tennis ball hitting ground
			Classic: person walking on a train
			A puppy that is enjoying licking a lolly. The lolly moves away ordinarily, but if you can get its jetpack to follow the lolly it can continue licking
			Bee going from flower to flower
			Curling stones
			Diver
			Dancer
			Juggler. Lots of circus skills
			someone going down a helter skelter
			Someone is about to set of a spinning top
				you can change the amount of angular momentum they put into it by changing the size of their bicep

*/

function initWheelScene()
{
	let littleScene = new THREE.Group()
	littleScene.scale.setScalar(2)
	littleScene.position.y += 3.88
	scene.add(littleScene)

	let background = new THREE.Mesh(new THREE.PlaneGeometry(2.5,.9), new THREE.MeshBasicMaterial({color:0x00AAAA}))
	background.position.z -= .01
	littleScene.add(background)

	let muddyTrail = new THREE.Mesh(new THREE.OriginCorneredPlaneBufferGeometry(),new THREE.MeshBasicMaterial({color:0x65370E}))
	muddyTrail.scale.y = .035
	muddyTrail.scale.x = .001
	littleScene.add(muddyTrail)
	muddyTrail.position.x -= .9
	muddyTrail.position.y -= .37

	// littleScene.visible = false

	bestowConnectionPotential(muddyTrail,function(multivec)
	{
		multivec.setScalar(muddyTrail.scale.x)
	} )

	let wheelRadius = .11
	let wheel = new THREE.Mesh(new THREE.PlaneGeometry(wheelRadius*6*2.,wheelRadius*6*2.),new THREE.MeshBasicMaterial({transparent:true}))
	new THREE.TextureLoader().load("data/wheel.png",function(texture){
		wheel.material.map = texture
		wheel.material.needsUpdate = true
	})
	wheel.position.copy(muddyTrail.position)
	wheel.position.y += wheelRadius
	littleScene.add(wheel)

	//https://imgbin.com/png/gNnWnJyC/clown-unicycle-png
	let clown = new THREE.Mesh(new THREE.PlaneGeometry(wheelRadius*6*2.,wheelRadius*6*2.),new THREE.MeshBasicMaterial({transparent:true}))
	new THREE.TextureLoader().load("data/clown.png",function(texture){
		clown.material.map = texture
		clown.material.needsUpdate = true
	})
	littleScene.add(clown)

	let flowerRadius = wheelRadius * .5
	let flower = new THREE.Mesh(new THREE.PlaneGeometry(flowerRadius*2.,flowerRadius*2.),new THREE.MeshBasicMaterial({transparent:true}))
	new THREE.TextureLoader().load("data/flower.png",function(texture){
		flower.material.map = texture
		flower.material.needsUpdate = true
	})
	littleScene.add(flower)


	

	// {
	//	let s = new THREE.Scene()
	
	// 	var texture = new THREE.DataTexture( data, renderer.domElement.width, renderer.domElement.height, THREE.RGBFormat );
	// 	texture.minFilter = THREE.LinearFilter;
	// 	texture.magFilter = THREE.LinearFilter;

	// 	let displayPlane = new THREE.Mesh(new THREE.PlaneGeometry(1,1),new THREE.MeshBasicMaterial({map:texture}))
	// 	displayPlane.scale.y = .4;
	// 	displayPlane.scale.x = camera.aspect * displayPlane.scale.y;
	// 	scene.add(displayPlane)

	//	renderer.render( s, camera );
	// }

	let placeStuckOnWheel = new THREE.Vector3(0.,wheelRadius*0.5,0.)

	let playing = false

	clickables.push(background)
	background.onClick = function()
	{
		if(playing === false)
		{
			playing = true
			wheel.position.x = muddyTrail.position.x
		}
	}

	{	
		let signSize = .14

		var winSign = makeTextSign("Yum!",false,false,true)
		winSign.scale.multiplyScalar(signSize)
		littleScene.add(winSign)
		winSign.depthTest
		winSign.visible = false

		var loseSign = makeTextSign("I'm thirsty!",false,false,true)
		loseSign.scale.multiplyScalar(signSize)
		littleScene.add(loseSign)
		loseSign.depthTest
		loseSign.visible = false
	}

	updateFunctions.push( function()
	{
		{
			if(wheel.position.x > -muddyTrail.position.x)
			{
				playing = false
			}

			let rotationAmount = 0.;
			if(playing)
			{
				rotationAmount += .04
			}
			wheel.rotation.z -= rotationAmount
			let arcLength = rotationAmount * wheelRadius
			wheel.position.x += arcLength
			wheel.updateMatrix()

			flower.position.copy(placeStuckOnWheel)
			flower.rotation.copy(wheel.rotation)
			flower.position.applyMatrix4(wheel.matrix)

			muddyTrail.scale.x = wheel.position.x - muddyTrail.position.x
			muddyTrail.visible = muddyTrail.scale.x !== 0.

			clown.position.copy(wheel.position)

			//DEBUG
			// hummingbird.position.copy(flower.position)

			if(hummingbird.position.distanceTo(flower.position) > .03)
			{
				loseSign.visible = true
				loseSign.position.copy(hummingbird.position)
				hummingbird.material.color.b = Math.sin(frameCount*.1)
				hummingbird.material.color.g = hummingbird.material.color.b
			}
			else
			{
				if(loseSign.visible === false)
				{
					winSign.visible = true
					winSign.position.copy(hummingbird.position)
					winSign.material.color.r = Math.sin(frameCount*.1)
					winSign.material.color.b = Math.sin(frameCount*.1)
				}
			}
		}
	})

	littleScene.hummingbird = hummingbird

	return littleScene
}