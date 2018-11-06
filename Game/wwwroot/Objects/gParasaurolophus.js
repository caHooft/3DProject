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
		function addHitboxesPara(object)
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
			var hitbox9 = new THREE.Points(geometry, material);
			var small = { distance: 0.25 };
			var medium = { distance: 0.5 };
			var large = { distance: 0.75 };

			hitbox1.name = "0";
			hitbox2.name = "1";
			hitbox3.name = "2";
			hitbox4.name = "3";
			hitbox5.name = "4";
			hitbox6.name = "5";
			hitbox7.name = "6";
			hitbox8.name = "7";
			hitbox9.name = "8";

			hitbox1.userData = small;
			hitbox2.userData = small;
			hitbox3.userData = large;
			hitbox4.userData = large;
			hitbox5.userData = medium;
			hitbox6.userData = small;
			hitbox7.userData = small;
			hitbox8.userData = small;
			hitbox9.userData = small;

			hitbox1.visible = false;
			hitbox2.visible = false;
			hitbox3.visible = false;
			hitbox4.visible = false;
			hitbox5.visible = false;
			hitbox6.visible = false;
			hitbox7.visible = false;
			hitbox8.visible = false;
			hitbox9.visible = false;

			hitbox1.position.y = 1.1;
			hitbox2.position.y = 0.8;
			hitbox3.position.y = 0.42;
			hitbox4.position.y = 0.75;
			hitbox5.position.y = 0.92;
			hitbox6.position.y = 1.2;
			hitbox7.position.y = 0.95;
			hitbox8.position.y = 1.2;
			hitbox9.position.y = 1.2;

			hitbox1.position.z = 1.35;
			hitbox2.position.z = 1.35;
			hitbox3.position.z = 0.38;
			hitbox4.position.z = 0.38;
			hitbox5.position.z = -0.22;
			hitbox6.position.z = -0.74;
			hitbox7.position.z = -0.74;
			hitbox8.position.z = -1.21;
			hitbox9.position.z = -1.7;

			object.add(hitbox1);
			object.add(hitbox2);
			object.add(hitbox3);
			object.add(hitbox4);
			object.add(hitbox5);
			object.add(hitbox6);
			object.add(hitbox7);
			object.add(hitbox8);
			object.add(hitbox9);
			return object;
		}

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
				selfRef.name = "gParasaurolophus";
				selfRef.add(object);
			}
			);
		}
		);
		selfRef = addHitboxesPara(selfRef);
	}
}
