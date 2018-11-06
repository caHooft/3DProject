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
			var hitbox7 = new THREE.Points(geometry, material);
			var hitbox8 = new THREE.Points(geometry, material);
			var small = { distance: 0.25 };
			var medium = { distance: 0.3 };
			var large = { distance: 0.4 };

			hitbox1.name = "0";
			hitbox2.name = "1";
			hitbox3.name = "2";
			hitbox4.name = "3";
			hitbox5.name = "4";
			hitbox6.name = "5";
			hitbox7.name = "6";
			hitbox8.name = "7";

			hitbox1.userData = medium;
			hitbox2.userData = medium;
			hitbox3.userData = large;
			hitbox4.userData = large;
			hitbox5.userData = medium;
			hitbox6.userData = medium;
			hitbox7.userData = small;
			hitbox8.userData = small;

			hitbox1.visible = false;
			hitbox2.visible = false;
			hitbox3.visible = false;
			hitbox4.visible = false;
			hitbox5.visible = false;
			hitbox6.visible = false;
			hitbox7.visible = false;
			hitbox8.visible = false;

			hitbox1.position.y = 1.2;
			hitbox2.position.y = 1.0;
			hitbox3.position.y = 0.9;
			hitbox4.position.y = 0.9;
			hitbox5.position.y = 0.2;
			hitbox6.position.y = 0.5;
			hitbox7.position.y = 0.95;
			hitbox8.position.y = 0.95;

			hitbox1.position.z = 1.15;
			hitbox2.position.z = 0.76;
			hitbox3.position.z = 0.35;
			hitbox4.position.z = 0.0;
			hitbox5.position.z = 0.0;
			hitbox6.position.z = 0.0;
			hitbox7.position.z = -0.5;
			hitbox8.position.z = -0.85;

			object.add(hitbox1);
			object.add(hitbox2);
			object.add(hitbox3);
			object.add(hitbox4);
			object.add(hitbox5);
			object.add(hitbox6);
			object.add(hitbox7);
			object.add(hitbox8);
			return object;
		}

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
