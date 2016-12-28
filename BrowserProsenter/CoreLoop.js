//A live fish

//TODO for RI
/*
 * Spectation
 * viewport
 * slides
 * Things disappearing and reappearing when you press a button
 * All on the server
 * Lighting for the lattice
 * Scaling, why not?
 * Interpolation between two crystals
 * 
 * A fuckload of objects
 */

function UpdateWorld(Models,Hands, indicatorsound)
{
	UpdateHands(Models,Hands, indicatorsound);
	
	if(debugging)
		for(var i = 0; i < Models.length; i++)
			Models[i].children[0].BoundingBoxAppearance.update(Models[i]);
	
//	if( typeof video !== 'undefined' && video.readyState === video.HAVE_ENOUGH_DATA)
//	{
//		videoImageContext.drawImage( video, 0, 0 );
//		if ( videoTexture ) 
//			videoTexture.needsUpdate = true;
//	}
}

function Render( Models, Controllers, indicatorsound) {
	delta_t = ourclock.getDelta();
//	if(delta_t > 0.1) delta_t = 0.1;
	
	InputObject.processInput( Models );
	UpdateWorld(Models, Controllers, indicatorsound);
	
	//setTimeout( function() { requestAnimationFrame( render );}, 100 ); //debugging only
	requestAnimationFrame( function(){
		Render(Models,Controllers, indicatorsound);
	} );
	if(VRMODE)
		OurVREffect.render( Scene, Camera ); //will be fine if VR is not enabled
	else
		Renderer.render( Scene, Camera );
}
