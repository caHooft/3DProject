class gDilophosaurus extends THREE.Group
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

		mtlLoader.setTexturePath('/Resources/Dinos/Dilophosaurus/');
		mtlLoader.setPath('/Resources/Dinos/Dilophosaurus/');
		mtlLoader.load('dilo.mtl', function (materials)
		{
			materials.preload();
			var objLoader = new THREE.OBJLoader();
			objLoader.setMaterials(materials);
			objLoader.setPath('/Resources/Dinos/Dilophosaurus/');

			objLoader.load('dilo.obj', function (object)
			{
				object.receiveShadow = false;
				object.castShadow = true;
				selfRef.name = "gDilophosaurus";
				selfRef.add(object);
			}
			);
		}
		);
	}
}
