class gStegosaurus extends THREE.Group
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

		mtlLoader.setTexturePath('/Resources/Dinos/Stegosaurus/stegosaurus/');
		mtlLoader.setPath('/Resources/Dinos/Stegosaurus/stegosaurus/');
		mtlLoader.load('steg.mtl', function (materials)
		{
			materials.preload();
			var objLoader = new THREE.OBJLoader();
			objLoader.setMaterials(materials);
			objLoader.setPath('/Resources/Dinos/Stegosaurus/stegosaurus/');

			objLoader.load('steg.obj', function (object)
			{
				object.receiveShadow = true;
				object.castShadow = true;
				selfRef.add(object);
			}
			);
		}
		);
	}
}