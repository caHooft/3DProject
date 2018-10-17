class gAnkylosaurus extends THREE.Group
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

		mtlLoader.setTexturePath('/Resources/Dinos/Ankylosaurus/');
		mtlLoader.setPath('/Resources/Dinos/Ankylosaurus/');
		mtlLoader.load('anky.mtl', function (materials)
		{
			materials.preload();
			var objLoader = new THREE.OBJLoader();
			objLoader.setMaterials(materials);
			objLoader.setPath('/Resources/Dinos/Ankylosaurus/');

			objLoader.load('anky.obj', function (object)
			{
				object.receiveShadow = false;
				object.castShadow = true;
				selfRef.name = "gAnkylosaurus";
				selfRef.add(object);
			}
			);
		}
		);
	}
}
