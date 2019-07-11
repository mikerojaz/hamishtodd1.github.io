async function initLayeredSimulation()
{
	let threeDDimensions = new THREE.Vector3(16,16,16);
	let textureDimensions = new THREE.Vector2(threeDDimensions.x,threeDDimensions.y*threeDDimensions.z);

	let initialState = new window.Float32Array( textureDimensions.x * textureDimensions.y * 4 );

	for ( let row = 0; row < threeDDimensions.y; row ++ )
	for ( let column = 0; column < threeDDimensions.x; column ++ )
	for ( let slice = 0; slice < threeDDimensions.z; slice ++ )
	{
		let firstIndex = ((row * threeDDimensions.x + column) * threeDDimensions.z + slice) * 4;

		initialState[ firstIndex + 0 ] = clamp(1 - 0.07 * new THREE.Vector3(row,column,slice).multiplyScalar(2.).distanceTo(threeDDimensions),0,1);
		initialState[ firstIndex + 1 ] = 0.;
		initialState[ firstIndex + 2 ] = 0.;
		initialState[ firstIndex + 3 ] = 0.;

		// if(  < 9. )
		// {
		// 	initialState[ firstIndex + 0 ] = 1.;
		// }
	}

	rightHand.controllerModel.visible = false;

	let displayMaterial = new THREE.ShaderMaterial( {
		blending: 0, //prevent default premultiplied alpha values
		uniforms:
		{
			simulationTexture: { value: null },
		},
		vertexShader:	[
			'precision highp float;',
			'varying vec2 vUV;',

			'void main (void) {',
				'vUV = uv;', //necessary? Needs to be vec2
				'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
			'}'
		].join( '\n' ),
		fragmentShader:	[
			'precision highp float;',
			'varying vec2 vUV;',
			'uniform sampler2D simulationTexture;',

			'void main (void) {',
				'vec3 simulationRgb = texture2D(simulationTexture, vUV).rgb;',

				'float shadeOfGrey = clamp(simulationRgb.r,0.,1.);',

				'gl_FragColor = vec4( shadeOfGrey, shadeOfGrey, shadeOfGrey, 1.0 );',
			'}'
		].join( '\n' )
	} );

	let numStepsPerFrame = 1;
	await Simulation(textureDimensions,"layeredSimulation", "periodic", initialState, numStepsPerFrame, displayMaterial.uniforms.simulationTexture )

	let displayMesh = new THREE.Mesh(
		new THREE.PlaneBufferGeometry( 0.3 * textureDimensions.x / textureDimensions.y, 0.3 ),
		displayMaterial );
	scene.add( displayMesh );
	displayMesh.position.copy(handControllers[0].position)
}

async function initGrayScottSimulation()
{
	let dimensions = new THREE.Vector2(1024,1024);

	let initialState = new window.Float32Array( dimensions.x * dimensions.y * 4 );
	for ( let row = 0; row < dimensions.y; row ++ )
	for ( let column = 0; column < dimensions.x; column ++ )
	{
		let firstIndex = (row * dimensions.x + column) * 4;

		initialState[ firstIndex + 0 ] = 0.;
		initialState[ firstIndex + 1 ] = 0.;
		initialState[ firstIndex + 2 ] = 0.;
		initialState[ firstIndex + 3 ] = 0.;

		if( 40 < column && column < 60 )
		{
			initialState[ firstIndex + 0 ] = 1.;
		}
		if( 40 < row && row < 60 )
		{
			initialState[ firstIndex + 1 ] = 1.;
		}
	}

	let displayMaterial = new THREE.ShaderMaterial( {
		blending: 0, //prevent default premultiplied alpha values
		uniforms:
		{
			simulationTexture: { value: null },
		},
		vertexShader: [
			'precision highp float;',
			'varying vec2 vUV;',

			'void main (void) {',
				'vUV = uv;', //necessary? Needs to be varying vec2
				'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
			'}'
		].join( '\n' ),
		fragmentShader: [
			'precision highp float;',
			'varying vec2 vUV;',
			'uniform sampler2D simulationTexture;',

			'void main (void) {',
				'vec2 uv = texture2D(simulationTexture, vUV).rg;',

				'gl_FragColor = vec4( uv, 0., 1.0 );',
			'}'
		].join( '\n' )
	} );

	let numStepsPerFrame = 100;
	await Simulation(dimensions,"grayScottSimulation", "periodic", initialState, numStepsPerFrame, displayMaterial.uniforms.simulationTexture )

	let displayMesh = new THREE.Mesh(
		new THREE.PlaneBufferGeometry( 0.3 * dimensions.x / dimensions.y, 0.3 ),
		displayMaterial );
	scene.add( displayMesh );
	displayMesh.position.copy(handControllers[0].position)
}

async function initBasicSimulation()
{
	let dimensions = new THREE.Vector2(11,7);

	let initialState = new window.Float32Array( dimensions.x * dimensions.y * 4 );
	for ( let row = 0; row < dimensions.y; row ++ )
	for ( let column = 0; column < dimensions.x; column ++ )
	{
		let firstIndex = (row * dimensions.x + column) * 4;

		initialState[ firstIndex + 0 ] = Math.random();
		initialState[ firstIndex + 1 ] = 0.;
		initialState[ firstIndex + 2 ] = 0.;
		initialState[ firstIndex + 3 ] = 0.;

		if( column == 1 )
		{
			initialState[ firstIndex + 0 ] = 0.;
		}
		if( row == 2 )
		{
			initialState[ firstIndex + 0 ] = 0.;
		}
	}

	let displayMaterial = new THREE.ShaderMaterial( {
		blending: 0, //prevent default premultiplied alpha values
		uniforms:
		{
			simulationTexture: { value: null },
		},
		vertexShader:	[
			'precision highp float;',
			'varying vec2 vUV;',

			'void main (void) {',
				'vUV = uv;', //necessary? Needs to be vec2
				'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
			'}'
		].join( '\n' ),
		fragmentShader:	[
			'precision highp float;',
			'varying vec2 vUV;',
			'uniform sampler2D simulationTexture;',

			'void main (void) {',
				'vec3 simulationRgb = texture2D(simulationTexture, vUV).rgb;',

				'float shadeOfGrey = clamp(simulationRgb.r,0.,1.);',

				'gl_FragColor = vec4( shadeOfGrey, shadeOfGrey, shadeOfGrey, 1.0 );',
			'}'
		].join( '\n' )
	} );

	let numStepsPerFrame = 1;
	await Simulation(dimensions,"basicSimulation", "clamped", initialState, numStepsPerFrame, displayMaterial.uniforms.simulationTexture )

	let displayMesh = new THREE.Mesh(
		new THREE.PlaneBufferGeometry( 0.3 * dimensions.x / dimensions.y, 0.3 ),
		displayMaterial );
	scene.add( displayMesh );
	displayMesh.position.copy(handControllers[0].position)
}

async function Simulation( dimensions, simulationShaderFilename, boundaryConditions, initialState, numStepsPerFrame, simulationTexture)
{
	let wrap = boundaryConditions === "periodic" ? THREE.RepeatWrapping : THREE.ClampToEdgeWrapping;

	let params = {
		minFilter: THREE.NearestFilter,
		magFilter: THREE.NearestFilter,
		wrapS: wrap,
		wrapT: wrap,
		format: THREE.RGBAFormat,
		stencilBuffer: false,
		depthBuffer: false,
		premultiplyAlpha: false,
		type: THREE.FloatType // THREE.HalfFloat for speed
	};
	let pingFramebuffer = new THREE.WebGLRenderTarget( dimensions.x, dimensions.y, params );
	let pongFramebuffer = new THREE.WebGLRenderTarget( dimensions.x, dimensions.y, params );

	let initialStateTexture = new THREE.DataTexture( initialState, dimensions.x, dimensions.y, THREE.RGBAFormat );
	initialStateTexture.wrapS = wrap;
	initialStateTexture.wrapT = wrap;
	initialStateTexture.type = params.type;
	initialStateTexture.needsUpdate = true;

	let simulationMaterial = new THREE.ShaderMaterial( { //not raw coz you need position
		uniforms:
		{
			"oldState":	{ value: null },
			"deltaTime":{ value: null },
			"dimensions":{ value: dimensions } //worth knowing so you can get the surrounding ones
		},
		vertexShader: [
			'varying vec2 vUV;',

			'void main (void) {',
				'vUV = position.xy * 0.5 + 0.5;',
				'gl_Position = vec4(position, 1.0 );',
			'}'
		].join( '\n' ),
		blending: 0, //prevent default premultiplied alpha values
		depthTest: false
	} );

	await assignShader(simulationShaderFilename, simulationMaterial, "fragment");

	let ping = true;
	let simScene = new THREE.Scene();
	let simCamera = new THREE.OrthographicCamera();
	simCamera.position.z = 1;
	renderer.clearColor( 0xffffff ); //hmm
	let simulationMesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 2, 2 ), simulationMaterial );
	simScene.add( simulationMesh );

	let initial = true;
	updateFunctions.push( function()
	{
		let nonSimulationRenderTarget = renderer.getRenderTarget();

		for( let i = 0; i < numStepsPerFrame; i++ )
		{
			if( initial )
			{
				simulationMaterial.uniforms.oldState.value = initialStateTexture;
				initial = false;
			}
			else
			{
				simulationMaterial.uniforms.oldState.value = ping ? pingFramebuffer.texture : pongFramebuffer.texture;
			}

			simulationMaterial.uniforms.deltaTime.value = frameDelta;

			var renderTarget = ping ? pongFramebuffer : pingFramebuffer
			renderer.setRenderTarget( renderTarget );
			renderer.render( simScene, simCamera );
			simulationMaterial.uniforms.oldState.value = renderTarget.texture;
			
			ping = !ping;
		}

		simulationTexture.value = renderTarget.texture;

		renderer.setRenderTarget( nonSimulationRenderTarget );
	} );
}