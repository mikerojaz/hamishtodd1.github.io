/*
 * TODO
 * Touchscreen controls
 * Mouse should be projected, shouldn't have dependency on playing field width (but should have dependency on window)
 * 
 * Video should probably just stay to the right, and camera movements should be implemented in the shoot
 * There are things like the footage of sufferers and the polymerase which we want in there too. Separate video.
 * May also "manually" change something, for a bit of fun. Good candidate would be the quasisphere for zika virus. But how to take account of the current shape?
 */

//document.addEventListener( 'touchstart', onDocumentMouseDown, false );
//document.addEventListener( 'touchmove', onDocumentTouchMove, false );
//document.addEventListener( 'touchend', onDocumentMouseUp, false );

//this is called once a frame and must be the only thing that addresses Inputobject, lest functions get different impressions of inputs.
//this function shouldn't actually *do* anything with the data, it's only to be read elsewhere.
function ReadInput() {
	OldMousePosition.copy( MousePosition );
	MousePosition.x = InputObject.mousex;
	MousePosition.y = InputObject.mousey;
	
	Mouse_delta.set( MousePosition.x - OldMousePosition.x, MousePosition.y - OldMousePosition.y);
	
	isMouseDown_previously = isMouseDown;
	isMouseDown = InputObject.isMouseDown;
	
	react_to_video();	
}

document.addEventListener( 'keydown', function(event)
{
	//arrow keys
	if(event.keyCode === 39)
		our_CurrentTime += 3;
	if(event.keyCode === 37)
		our_CurrentTime -= 3;
}, false );

document.addEventListener( 'mousedown', function(event) {
	event.preventDefault();
	InputObject.isMouseDown = true;
}, false);
document.addEventListener( 'mouseup', 	function(event) {
	event.preventDefault();
	InputObject.isMouseDown = false;
	//minimum amount of time so that people don't hammer the screen?
}, false);

document.addEventListener( 'mousemove', function(event) {
	event.preventDefault();
	InputObject.mousex = event.clientX - window.innerWidth / 2 - renderer.domElement.offsetLeft / 2;
	InputObject.mousey = -(event.clientY - window.innerHeight / 2 - renderer.domElement.offsetTop / 2);
	InputObject.mousex *= playing_field_dimension / renderer.domElement.width * 2;
	InputObject.mousey *= playing_field_dimension / renderer.domElement.height;
	InputObject.mousex += camera.position.x;
	InputObject.mousey += camera.position.y;
//	InputObject.mousex += playing_field_dimension / 2;
}, false ); //window?

//remember there can be weirdness for multiple fingers, so make sure any crazy series of inputs are interpretable
//function onDocumentTouchMove( event ) {
//	event.preventDefault();
//	InputObject.mousex = event.changedTouches[0].clientX; //only looking at the first one. TODO multi-touch!
//	InputObject.mousey = event.changedTouches[0].clientY;
//}