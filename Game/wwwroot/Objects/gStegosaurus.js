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
		function addHitboxesSteg(object)
		{
			var material = new THREE.PointsMaterial({ color: 0xFFFFFF });
			var geometry = new THREE.BufferGeometry({})
			var hitbox1 = new THREE.Points(geometry, material);
			var hitbox2 = new THREE.Points(geometry, material);
			var hitbox3 = new THREE.Points(geometry, material);
			//var small = { distance: 0.4 };
			var medium = { distance: 0.75 };
			//var large = { distance: 0.75 };

			hitbox1.name = "0";
			hitbox2.name = "1";
			hitbox3.name = "2";

			hitbox1.userData = medium;
			hitbox2.userData = medium;
			hitbox3.userData = medium;

			hitbox1.visible = false;
			hitbox2.visible = false;
			hitbox3.visible = false;

			hitbox1.position.y = 0.35;
			hitbox2.position.y = 0.55;
			hitbox3.position.y = 0.07;

			hitbox1.position.z = -1.0;
			hitbox2.position.z = -0.3;
			hitbox3.position.z = 0.6;

			object.add(hitbox1);
			object.add(hitbox2);
			object.add(hitbox3);
			return object;
		}
		console.log("steg");
		if (this._loadState != LoadStates.NOT_LOADING) return;

		this._loadState = LoadStates.LOADING;

		var selfRef = this;

		var mtlLoader = new THREE.MTLLoader();

		mtlLoader.setTexturePath('/Resources/Dinos/Stegosaurus/');
		mtlLoader.setPath('/Resources/Dinos/Stegosaurus/');
		mtlLoader.load('steg.mtl', function (materials)
		{
			materials.preload();
			var objLoader = new THREE.OBJLoader();
			objLoader.setMaterials(materials);
			objLoader.setPath('/Resources/Dinos/Stegosaurus/');

			objLoader.load('steg.obj', function (object)
			{
				object.receiveShadow = false;
				object.castShadow = true;
				selfRef.name = "gStegosaurus";
				selfRef.add(object);
			}
			);
		}
		);
		selfRef = addHitboxesSteg(selfRef);
	}
}
