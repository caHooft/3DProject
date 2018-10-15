class gTreeBirch extends THREE.Group
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

		mtlLoader.setTexturePath('/Resources/Trees/birchtree/');
		mtlLoader.setPath('/Resources/Trees/birchtree/');
		mtlLoader.load('birhc_tree.mtl', function (materials)
		{
			materials.preload();
			var objLoader = new THREE.OBJLoader();
			objLoader.setMaterials(materials);
			objLoader.setPath('/Resources/Trees/birchtree/');

			objLoader.load('birch_tree.obj', function (object)
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
