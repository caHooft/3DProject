class gGallimimus extends THREE.Group
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

		mtlLoader.setTexturePath('/Resources/Dinos/Gallimimus/');
		mtlLoader.setPath('/Resources/Dinos/Gallimimus/');
		mtlLoader.load('galli.mtl', function (materials)
		{
			materials.preload();
			var objLoader = new THREE.OBJLoader();
			objLoader.setMaterials(materials);
			objLoader.setPath('/Resources/Dinos/Gallimimus/');

			objLoader.load('galli.obj', function (object)
			{
				object.receiveShadow = true;
				object.castShadow = true;
				// object.scale.set(0.001, 0.001, 0.001);
				selfRef.add(object);
			}
			);
		}
		);
	}
}
