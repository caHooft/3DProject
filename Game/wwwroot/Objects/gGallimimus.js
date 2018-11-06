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
		function addHitboxesGalli(object)
		{
			var material = new THREE.PointsMaterial({ color: 0xFFFFFF });
			var geometry = new THREE.BufferGeometry({})
			var hitbox1 = new THREE.Points(geometry, material);
			var hitbox2 = new THREE.Points(geometry, material);
			var hitbox3 = new THREE.Points(geometry, material);
			var small = { distance: 0.3 };
			//var medium = { distance: 0.3 };
			var large = { distance: 0.4 };

			hitbox1.name = "0";
			hitbox2.name = "1";
			hitbox3.name = "2";

			hitbox1.userData = small;
			hitbox2.userData = large;
			hitbox3.userData = large;

			hitbox1.visible = false;
			hitbox2.visible = false;
			hitbox3.visible = false;

			hitbox1.position.y = 0.55;
			hitbox2.position.y = 0.25;
			hitbox3.position.y = 0.25;

			hitbox1.position.z = 0.5;
			hitbox2.position.z = 0.0;
			hitbox3.position.z = -0.25;

			object.add(hitbox1);
			object.add(hitbox2);
			object.add(hitbox3);
			return object;
		}

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
				selfRef.name = "gGallimimus";
				selfRef.add(object);
			}
			);
		}
		);
		selfRef = addHitboxesGalli(selfRef);
	}
}
