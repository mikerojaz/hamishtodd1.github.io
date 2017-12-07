//gets the mouse from the rift computer

initializers.mobile = function(socket, pdbWebAddress, roomKey, launcher, visiBox, thingsToBeUpdated, renderer, userManager )
{
	//initializing cursor
	// {
	// 	var coneHeight = 0.1;
	// 	var coneRadius = coneHeight * 0.4;
	// 	var cursorGeometry = new THREE.ConeGeometry(coneRadius, coneHeight,31);
	// 	cursorGeometry.computeFaceNormals();
	// 	cursorGeometry.computeVertexNormals();
	// 	cursorGeometry.merge( new THREE.CylinderGeometry(coneRadius / 4, coneRadius / 4, coneHeight / 2, 31 ), (new THREE.Matrix4()).makeTranslation(0, -coneHeight/2, 0) );
	// 	cursorGeometry.applyMatrix( (new THREE.Matrix4()).makeTranslation(0, -coneHeight / 2, 0) );
	// 	cursorGeometry.applyMatrix( (new THREE.Matrix4()).makeRotationZ(TAU/8) );
	// 	var cursor = new THREE.Mesh(
	// 			cursorGeometry, 
	// 			new THREE.MeshLambertMaterial({color:0x888888, side: THREE.DoubleSide })
	// 	);
		
	// 	cursor.grabbing = false;
		
	// 	cursor.followers = [];
	// 	cursor.oldWorldPosition = new THREE.Vector3();
		
	// 	camera.add(cursor);
	// }

	var load = initPoiSphereAndButtonMonitorerAndMovementSystem();
	var poiSphere = load.poiSphere;
	var buttonsHeld = load.buttonsHeld;
	var moveCamera = load.moveCamera;

	socket.on("right", function(value)
	{
		buttonsHeld["right"] = eval(value);
	});
	socket.on("left", function(value)
	{
		buttonsHeld["left"] = eval(value);
	});
	socket.on("forward", function(value)
	{
		buttonsHeld["forward"] = eval(value);
	});
	socket.on("backward", function(value)
	{
		buttonsHeld["backward"] = eval(value);
	});

	camera.position.copy(model.position);

	coreLoops.mobile = function( socket, visiBox, thingsToBeUpdated, userManager, mouse )
	{
		frameDelta = ourClock.getDelta();

		ourOrientationControls.update();

		poiSphere.position.copy(poiSphere.getPoi(camera))

		camera.updateMatrix();
		camera.updateMatrixWorld();

		var offsetPoiSphereLocation = poiSphere.getPoi(camera);
		camera.position.sub(offsetPoiSphereLocation).add(poiSphere.position);

		camera.updateMatrix();
		camera.updateMatrixWorld();
		moveCamera();
		
		for( var thing in thingsToBeUpdated)
		{
			if( thingsToBeUpdated[thing].length !== undefined)
			{
				for(var i = 0, il = thingsToBeUpdated[thing].length; i < il; i++)
					thingsToBeUpdated[thing][i].update();
			}
			else
			{
				thingsToBeUpdated[thing].update();
			}
		}
		
		userManager.sendOurUpdate();
		userManager.checkForDormancy();
	}

	document.addEventListener( 'mousedown', function(event)
	{
		if( THREEx.FullScreen.activated() )
			return;
		
		THREEx.FullScreen.request(renderer.domElement);
	}, false );

	window.addEventListener( 'resize', function(event)
	{
		renderer.setSize( window.innerWidth, window.innerHeight );
		ourStereoEffect.setSize( window.innerWidth, window.innerHeight );

		camera.aspect = renderer.domElement.width / renderer.domElement.height;
		camera.updateProjectionMatrix();
	}, false );

	var ourOrientationControls = new THREE.DeviceOrientationControls(camera);
	var ourStereoEffect = new THREE.StereoEffect( renderer );
	ourStereoEffect.stereoCamera.eyeSep = 0.0065;
	function render()
	{
		coreLoops.mobile( socket, visiBox, thingsToBeUpdated, userManager )

		requestAnimationFrame( render );
		ourStereoEffect.render( scene, camera );
	}
	launcher.render = render;
}