class gParasaurolophus extends THREE.Group
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

		mtlLoader.setTexturePath('/Resources/Dinos/Parasaurolophus/');
		mtlLoader.setPath('/Resources/Dinos/Parasaurolophus/');
		mtlLoader.load('para.mtl', function (materials)
		{
			materials.preload();
			var objLoader = new THREE.OBJLoader();
			objLoader.setMaterials(materials);
			objLoader.setPath('/Resources/Dinos/Parasaurolophus/');

			objLoader.load('para.obj', function (object)
			{
				object.receiveShadow = false;
				object.castShadow = true;
				selfRef.add(object);
			}
			);
		}
		);
	}
}
