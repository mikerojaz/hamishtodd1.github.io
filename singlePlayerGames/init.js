/*
	One axis can be thought of "time" and the other as some kind of "behaviour"

	We have two "binary fields", one is what you want to touch, one you want to avoid
	NO, NOT THAT. That'll lock you into some mathematical elegance bullshit
	Think of the objects, objects you want to avoid. You need control over those.
	Since they're points, their movements are curves

	It's similar to an "irritating stick" thing

	Could be super great because moving through "complex movements" is the interesting thing to do spatially
	And you have some control of that

	Under each hand, a bullet hell shmup. Lots of red blobs. Your fingers specify the location of your avatar in 4D space, move your finger and your avatar moves to that place (has a max speed though). Move one finger and the other might find that the red blobs surrounding it converge on it. Cool because it’s extremely similar to having time control. Could start it out such that one side just has horizontal stripes, all you need to do is move the thing up and down.
	If it was really time travel, when you “moved back” your thing would retrace its steps.
	Ok so you want the points to travel in circles, ellipses and sine waves. Wanna adjust those directly as the designer. Probably means corrugated planes, simple equations
	Start out with it being the case that there are no “enemies” on one of the sides, it is just like a timeline
	Start out with just some randomly oriented planes
	For any plane, can calculate its intersection with another plane, which is a point. Expand that point into a circle, and you’re done.
	3DS / Switch? Tablet is obvious, phone. Could use twin sticks
	Parabola = ellipse with focus at infinity. Blah blah, this is all somewhere else
*/

function initButtons()
{
	var buttonBindings = {};
	bindButton = function( buttonName, ourFunction, functionDescription )
	{
		if(buttonBindings[buttonName] !== undefined)
		{
			console.error("attempted to bind a button that already has a binding")
		}

		console.log("\n",buttonName + ": " + functionDescription)
		buttonBindings[buttonName] = ourFunction;
	}

	var buttonIndexGivenName = {
		"enter":13,
		"alt":18,
		"shift":16,

		"left":37,
		"up":38,
		"right":39,
		"down":12,
		"space":32,

		"[":219,
		"]":221
	}
	var keycodeArray = "0123456789abcdefghijklmnopqrstuvwxyz";
	//don't use ctrl or other things that conflict
	document.addEventListener( 'keydown', function(event)
	{
		for( var buttonName in buttonBindings )
		{
			if( event.keyCode === buttonIndexGivenName[buttonName] )
			{
				buttonBindings[buttonName]();
			}
		}

		var arrayposition;
		if( 48 <= event.keyCode && event.keyCode <= 57 )
		{
			arrayposition = event.keyCode - 48;
		}
		if( 65 <= event.keyCode && event.keyCode <= 90 )
		{
			arrayposition = event.keyCode - 55;
		}
		if( buttonBindings[ keycodeArray[arrayposition] ] !== undefined )
		{
			buttonBindings[ keycodeArray[arrayposition] ]();
		}
	}, false );
}

(function init()
{
	initButtons()

	var renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setClearColor(0xFFFFFF) //youtube
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.BasicShadowMap;
	document.body.appendChild( renderer.domElement );

	function render()
	{
		{
			frameDelta = clock.getDelta();
			
			mouse.updateFromAsyncAndCheckClicks();

			for(var i = 0; i < objectsToBeUpdated.length; i++)
			{
				objectsToBeUpdated[i].update();
			}

			frameCount++;
		}

		requestAnimationFrame( render );
		renderer.render( scene, camera );
	}

	initCameraAndRendererResizeSystem(renderer);
	var stage = initSurroundings();
	initMouse();

	initRotationGame()

	render();
})();