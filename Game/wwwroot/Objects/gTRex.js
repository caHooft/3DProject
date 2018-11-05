class gTRex extends THREE.Group
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
		function addHitboxesTrex(object)
		{
			var material = new THREE.PointsMaterial({ color: 0xFFFFFF });
			var geometry = new THREE.BufferGeometry({})
			var hitbox1 = new THREE.Points(geometry, material);
			var hitbox2 = new THREE.Points(geometry, material);
			var hitbox3 = new THREE.Points(geometry, material);
			var hitbox4 = new THREE.Points(geometry, material);
			var hitbox5 = new THREE.Points(geometry, material);
			var hitbox6 = new THREE.Points(geometry, material);
			//var small = { distance: 0.5 };
			var medium = { distance: 0.5 };
			//var large = { distance: 0.75 };

			hitbox1.name = "0";
			hitbox2.name = "1";
			hitbox3.name = "2";
			hitbox4.name = "3";
			hitbox5.name = "4";
			hitbox6.name = "5";

			hitbox1.userData = medium;
			hitbox2.userData = medium;
			hitbox3.userData = medium;
			hitbox4.userData = medium;
			hitbox5.userData = medium;
			hitbox6.userData = medium;

			hitbox1.visible = false;
			hitbox2.visible = false;
			hitbox3.visible = false;
			hitbox4.visible = false;
			hitbox5.visible = false;
			hitbox6.visible = false;

			hitbox1.position.y = 1.0;
			hitbox2.position.y = 0.85;
			hitbox3.position.y = 0.8;
			hitbox4.position.y = 0.3;
			hitbox5.position.y = 0.7;
			hitbox6.position.y = 0.7;

			hitbox1.position.z = -1.1;
			hitbox2.position.z = -0.5;
			hitbox3.position.z = 0.0;
			hitbox4.position.z = 0.0;
			hitbox5.position.z = 0.55;
			hitbox6.position.z = 1.2;

			object.add(hitbox1);
			object.add(hitbox2);
			object.add(hitbox3);
			object.add(hitbox4);
			object.add(hitbox5);
			object.add(hitbox6);
			return object;
		}
		console.log("trex");
		if (this._loadState != LoadStates.NOT_LOADING) return;

		this._loadState = LoadStates.LOADING;

		var selfRef = this;

		var mtlLoader = new THREE.MTLLoader();

		mtlLoader.setTexturePath('/Resources/Dinos/T-Rex/');
		mtlLoader.setPath('/Resources/Dinos/T-Rex/');
		mtlLoader.load('trex.mtl', function (materials)
		{
			materials.preload();
			var objLoader = new THREE.OBJLoader();
			objLoader.setMaterials(materials);
			objLoader.setPath('/Resources/Dinos/T-Rex/');

			objLoader.load('trex.obj', function (object)
			{
				object.receiveShadow = true;
				object.castShadow = true;
				selfRef.name = "gTRex";
				selfRef.add(object);
			}
			);
		}
		);
		selfRef = addHitboxesTrex(selfRef);
	}
}
