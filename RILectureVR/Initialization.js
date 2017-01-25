//the first init
socket.on('OnConnect_Message', function(msg)
{	
	var Renderer = new THREE.WebGLRenderer({ antialias: true }); //antialiasing would be nice and we're only aiming for 30fps
	Renderer.setClearColor( 0xACDFFC );
	Renderer.setPixelRatio( window.devicePixelRatio );
	Renderer.setSize( window.innerWidth, window.innerHeight );
	Renderer.sortObjects = false;
	Renderer.shadowMap.enabled = true;
	Renderer.shadowMap.cullFace = THREE.CullFaceBack;
	document.body.appendChild( Renderer.domElement );
	window.addEventListener( 'resize', function(){
		console.log("resizing")
	    Renderer.setSize( window.innerWidth, window.innerHeight );
	    Camera.aspect = window.innerWidth / window.innerHeight;
	    Camera.updateProjectionMatrix();
	}, false );
	
	Scene = new THREE.Scene();
	
	//FOV should depend on whether you're talking VR
	Camera = new THREE.PerspectiveCamera( 50, //will be changed by VR
			Renderer.domElement.width / Renderer.domElement.height, //window.innerWidth / window.innerHeight,
			0.001, 700);
	spectatorScreenIndicator = new THREE.Line(new THREE.Geometry());
	for(var i = 0; i < 5; i++)
		spectatorScreenIndicator.geometry.vertices.push(new THREE.Vector3());
	spectatorScreenIndicator.visible = false;
	Camera.add( spectatorScreenIndicator );
	Scene.add(Camera);
	
	VRMODE = 0;
	OurVREffect = new THREE.VREffect( Renderer );
	OurVRControls = new THREE.VRControls( Camera );
	
	Add_stuff_from_demo();
	
	var OurFontLoader = new THREE.FontLoader();
	OurFontLoader.load(  "gentilis.js", 
		function ( reponse ) { gentilis = reponse; },
		function ( xhr ) {},
		function ( xhr ) { console.error( "couldn't load font" ); }
	);
	
	var Controllers = Array(2);
	for(var i = 0; i < 2; i++)
	{
		Controllers[ i ] = new THREE.Object3D();
		Controllers[ i ].Gripping = 0;
		Scene.add( Controllers[ i ] );
	}
	var handModelLink = "http://hamishtodd1.github.io/BrowserProsenter/Data/glove.obj"
	if ( WEBVR.isAvailable() === true ) //Hah and when all browsers have VR?
	{
		//actually people might want to spectate in google cardboard
		//you just need to move the hands to be in the right position relative to wherever they're looking
		document.body.appendChild( WEBVR.getButton( OurVREffect ) );
		
		spectatorScreenIndicator.visible = true;
		spectatorScreenIndicator.frustumCulled = false;
		
		handModelLink = "http://hamishtodd1.github.io/BrowserProsenter/Data/external_controller01_left.obj"
	}
	var OurOBJLoader = new THREE.OBJLoader();
	OurOBJLoader.load( handModelLink,
		function ( object ) 
		{
			if ( WEBVR.isAvailable() === true )
			{
				console.log("yo")
				Controllers[ LEFT_CONTROLLER_INDEX ].add(new THREE.Mesh( object.children[0].geometry, new THREE.MeshPhongMaterial({color:0x000000}) ) )
				Controllers[ LEFT_CONTROLLER_INDEX ].children[0].position.y += 0.043;
				Controllers[ LEFT_CONTROLLER_INDEX ].children[0].position.z -= 0.036;
				Controllers[ LEFT_CONTROLLER_INDEX ].children[0].rotation.x += 0.5;
				
				Controllers[1-LEFT_CONTROLLER_INDEX].add(new THREE.Mesh( object.children[0].geometry, new THREE.MeshPhongMaterial({color:0x000000}) ) )
				Controllers[1-LEFT_CONTROLLER_INDEX].children[0].position.y += 0.043;
				Controllers[1-LEFT_CONTROLLER_INDEX].children[0].position.z -= 0.036;
				Controllers[1-LEFT_CONTROLLER_INDEX].children[0].rotation.x += 0.5;
				Controllers[1-LEFT_CONTROLLER_INDEX].scale.x *= -1;
				Controllers[1-LEFT_CONTROLLER_INDEX].children[0].material.side = THREE.BackSide;
			}
			else{				
				object.children[0].scale.setScalar( 0.0006 );
				object.children[0].rotation.y = TAU/2;
				object.children[0].rotation.z =-1;
				object.children[0].geometry.center();
				
				Controllers[ LEFT_CONTROLLER_INDEX ].add( object.children[0].clone() );
				
				Controllers[1-LEFT_CONTROLLER_INDEX ].add( object.children[0].clone() );
				Controllers[1-LEFT_CONTROLLER_INDEX ].scale.x *= -1;
				Controllers[1-LEFT_CONTROLLER_INDEX ].children[0].material = Controllers[ LEFT_CONTROLLER_INDEX ].children[0].material.clone();
				Controllers[1-LEFT_CONTROLLER_INDEX ].children[0].material.side = THREE.BackSide;
				Controllers[1-LEFT_CONTROLLER_INDEX ].children[0].material.needsUpdate = true;
			}
		},
		function ( xhr ) {}, function ( xhr ) { console.error( "couldn't load OBJ" ); } );
	
	var presentation = { holdables: {} };
	
	//"grippable objects"
	presentation.createNewHoldable = function( holdableName )
	{
		this.holdables[holdableName] = new THREE.Object3D();
		this.holdables[holdableName].rotateable = true;
		inputObject.holdableStates[holdableName] = {
			position: this.holdables[holdableName].position.clone(), //TODO no clones, one less copy to make, same for controllers
			quaternion: this.holdables[holdableName].quaternion.clone()
		};
		return this.holdables[holdableName];
	}
	
	init_axes();
	init_poly_arrays();
//	qcTablet.init();
//	init_cubes();
//	init_extruding_polyhedra_and_house();
//	init_golden_lattice();
//	initCCMV();
	initSolidVirusModels( presentation );
//	initHoneycombs();
//	initFishUniverse();
//	init_atoms();
	initSymmetryDemonstration( presentation );
	
	initPresentation( presentation );

	Render( presentation.holdables, Controllers, presentation );
});

function Make_collisionbox(Model)
{
	Model.children[0].BoundingBoxAppearance = new THREE.BoxHelper(Model.children[0]);
	if(debugging)
		Model.children[0].BoundingBoxAppearance.visible = true;
	else
		Model.children[0].BoundingBoxAppearance.visible = false;
	
	Scene.add( Model.children[0].BoundingBoxAppearance );
}