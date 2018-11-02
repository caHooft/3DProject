class gRaptor extends THREE.Group
{
	constructor()
	{
		super();

		this._loadState = LoadStates.NOT_LOADING;

		this.init();
	}

	get loadState()
	{
		return this._loadState;
	}

	init()
	{
		if (this._loadState != LoadStates.NOT_LOADING) return;

		this._loadState = LoadStates.LOADING;

		var selfRef = this;

		var mtlLoader = new THREE.MTLLoader();

		mtlLoader.setTexturePath('/Resources/Dinos/Velociraptor/');
		mtlLoader.setPath('/Resources/Dinos/Velociraptor/');
		mtlLoader.load('raptor.mtl', function (materials)
		{
			materials.preload();
			var objLoader = new THREE.OBJLoader();
			objLoader.setMaterials(materials);
			objLoader.setPath('/Resources/Dinos/Velociraptor/');

			objLoader.load('raptor.obj', function (object)
			{
				object.receiveShadow = true;
				object.castShadow = true;
				object.scale.set(0.25, 0.25, 0.25);
				selfRef.name = "gRaptor";
				selfRef.add(object);
			}
			);
		}
		);
	}
}

// class gRaptor extends THREE.Group
// {
// 	constructor()
// 	{
// 		super();

// 		this._loadState = LoadStates.NOT_LOADING;

// 		this.init();
// 	}

// 	get loadState()
// 	{
// 		return this._loadState;
// 	}

// 	init()
// 	{
// 		if (this._loadState != LoadStates.NOT_LOADING) return;

// 		this._loadState = LoadStates.LOADING;

// 		var selfRef = this;

// 		var jsonloader = new THREE.JSONLoader();

// 		jsonloader.load('/Resources/Dinos/AnimatedRaptor/Raptoranimated.js', function (geometry, materials)
// 		{

// 		})
// 	}
// }
