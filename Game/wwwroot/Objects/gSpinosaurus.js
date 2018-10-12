class gSpinosaurus extends THREE.Group
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

		mtlLoader.setTexturePath('/Resources/Dinos/Spinosaurus/');
		mtlLoader.setPath('/Resources/Dinos/Spinosaurus/');
		mtlLoader.load('spino.mtl', function (materials)
		{
			materials.preload();
			var objLoader = new THREE.OBJLoader();
			objLoader.setMaterials(materials);
			objLoader.setPath('/Resources/Dinos/Spinosaurus/');

			objLoader.load('spino.obj', function (object)
			{
				object.receiveShadow = false;
				object.castShadow = true;
				object.scale.set(0.1, 0.1, 0.1);
				selfRef.add(object);
			}
			);
		}
		);
	}
}
