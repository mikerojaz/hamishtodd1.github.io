/*
	TODO
		"mirror along long edge"

		Switch direction of time / "processing"
			detect region and change appropriately
			It's linked to what direction time flows in -> what direction symbols are read in
			Physicist: bottom to top
			Coder(me): Top to bottom
			Arabic layperson: right to left
			Non-arabic layperson: left to right

		subtitle language
		video speed
*/

async function initMenu()
{
	let menu = new THREE.Group()
	scene.add(menu)

	let menuFader = new THREE.Mesh(unchangingUnitSquareGeometry, new THREE.MeshBasicMaterial({color:0x020202, transparent:true, opacity:0.}))
	menuFader.scale.set(100.,100.,1.)
	scene.add(menuFader)

	let menuEntries = []

	{
		let titleObject = makeTextSign("Menu")
		let title = titleObject.children[0]
		title.scale.copy(titleObject.scale)
		title.scale.multiplyScalar(.4)
		menu.add(title)

		let intendedFaderOpacity = 0.
		let intendedMenuPosition = new THREE.Vector3(0.,0.,.001)
		function updateFromMenuMode()
		{
			if(menuMode)
			{
				intendedMenuPosition.y = (menu.children.length-1) / 2. * 1.1
				intendedMenuPosition.x = 0.
				intendedFaderOpacity = .5

				for(let i = 0; i < menuEntries.length; i++)
					menu.add(menuEntries[i])
			}
			else
			{
				let halfMenuTitleWidth = title.scale.x / 2.
				let halfMenuTitleHeight = title.scale.y / 2.
				let padding = .25
				intendedMenuPosition.x =  camera.rightAtZZero - (halfMenuTitleWidth  + padding)
				intendedMenuPosition.y = -camera.topAtZZero   + (halfMenuTitleHeight + padding)
				intendedFaderOpacity = 0.

				for(let i = 0; i < menuEntries.length; i++)
					menu.remove(menuEntries[i])
			}
		}
		updateFunctions.push(function()
		{
			updateFromMenuMode()

			menu.position.lerp(intendedMenuPosition,.1)
			menuFader.material.opacity += (intendedFaderOpacity - menuFader.material.opacity ) * .1
		})

		var menuMode = false
		updateFromMenuMode()
		menu.position.copy(intendedMenuPosition)
		menuFader.material.opacity = intendedFaderOpacity

		function toggleMenuMode()
		{
			menuMode = !menuMode
		}
		bindButton("esc",toggleMenuMode)
		title.onClick = toggleMenuMode
		clickables.push(title)
	}

	{
		let sandboxObject = makeTextSign("Sandbox mode")
		let sandbox = sandboxObject.children[0]
		sandbox.scale.copy(sandboxObject.scale)
		menuEntries.push(sandbox)
		sandbox.onClick = function()
		{
			modeDependentReactionToResult = function(){}
			dismantleCurrentGoal()
			dismantleCurrentGoal = function(){}
			menuMode = false

			log("TODO Clear scope completely, just basis vectors")
		}
	}

	{
		// let randomize = makeTextSign("Random puzzle")
		// menuEntries.push(randomize)
	}

	{
		let fullscreenButton = makeTextSign("Fullscreen")
		menuEntries.push(fullscreenButton)

		function potentiallyGoFullScreen(clientX,clientY)
		{
			if(!menuMode)
				return

			raycaster.updateFromClientCoordinates(event.clientX,event.clientY)
			let clickPosition = raycaster.intersectZPlane(0.)
			fullscreenButton.worldToLocal(clickPosition)

			if( -.5 < clickPosition.x && clickPosition.x < .5 &&
				-.5 < clickPosition.y && clickPosition.y < .5 )
			{
				//commence mozilla black box
				let doc = window.document;
				let docEl = doc.documentElement;

				let requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
				let cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

				if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
					requestFullScreen.call(docEl);
				}
				else {
					cancelFullScreen.call(doc);
				}
			}
		}

		let raycaster = new THREE.Raycaster()
		document.addEventListener( 'mousedown', function(event)
		{
			potentiallyGoFullScreen(event.clientX,event.clientY)
		}, false );
		document.addEventListener( 'touchstart', function(event)
		{
			potentiallyGoFullScreen(event.changedTouches[0].clientX,event.changedTouches[0].clientY)
		}, { passive: false } );
	}

	//best laid out using markup dude, do NOT think about this any further
	{
		let creditsSignObject = makeTextSign("Credits")
		let creditsSign = creditsSignObject.children[0]
		creditsSign.scale.copy(creditsSignObject.scale)
		menuEntries.push(creditsSign)
		
		creditsSign.onClick = function()
		{
			credits.position.x = 0.;
		}

		{
			var credits = new THREE.Mesh(new THREE.PlaneGeometry(100.,100.))
			credits.position.x = 1000.;
			scene.add(credits)

			credits.position.z = camera.position.z / 2.
			let strings = [
				"Creator",
				"Hamish Todd",
				"gap",
				"Playtesters",
				"Pontus Grandstrom",
				"Ivan Erofeev",
				"Nina Erofeev", //check surname
				"Matt Hare",
				"(Your name goes here!)",
			]
			for(let i = 0; i < strings.length; i++)
			{
				if(strings[i] !== "gap")
				{
					let sign = makeTextSign(strings[i])
					sign.scale.multiplyScalar(.4)
					sign.position.y = ((strings.length-1) / 2. - i) * .4
					sign.position.z = .001
					credits.add(sign)
				}
			}

			clickables.push(credits)
			credits.onClick = function()
			{
				credits.position.x = 1000;
			}
		}
	}

	{
		let backObject = makeTextSign("Back to game")
		var back = backObject.children[0]
		back.scale.copy(backObject.scale)
		back.onClick = toggleMenuMode
		menuEntries.push(back)
	}

	for(let i = 0; i < menuEntries.length; i++)
	{
		menuEntries[i].position.y = -1 - i
		menuEntries[i].position.y *= .9
		menuEntries[i].scale.multiplyScalar(.7)
		clickables.push(menuEntries[i])
	}
}