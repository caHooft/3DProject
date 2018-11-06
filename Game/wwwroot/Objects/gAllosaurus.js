class gAllosaurus extends THREE.Group
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
		function addHitboxesAllo(object)
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
			var hitbox10 = new THREE.Points(geometry, material);
			var hitbox11 = new THREE.Points(geometry, material);
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
			hitbox9.name = "8";
			hitbox10.name = "9";
			hitbox11.name = "10";

			hitbox1.userData = medium;
			hitbox2.userData = large;
			hitbox3.userData = large;
			hitbox4.userData = large;
			hitbox5.userData = large;
			hitbox6.userData = medium;
			hitbox7.userData = medium;
			hitbox8.userData = small;
			hitbox9.userData = small;
			hitbox10.userData = small;
			hitbox11.userData = small;

			hitbox1.visible = false;
			hitbox2.visible = false;
			hitbox3.visible = false;
			hitbox4.visible = false;
			hitbox5.visible = false;
			hitbox6.visible = false;
			hitbox7.visible = false;
			hitbox8.visible = false;
			hitbox9.visible = false;
			hitbox10.visible = false;
			hitbox11.visible = false;

			hitbox1.position.y = 1.1;
			hitbox2.position.y = 0.75;
			hitbox3.position.y = 0.4;
			hitbox4.position.y = 0.8;
			hitbox5.position.y = 0.8;
			hitbox6.position.y = 0.2;
			hitbox7.position.y = 0.5;
			hitbox8.position.y = 1.05;
			hitbox9.position.y = 1.05;
			hitbox10.position.y = 1.05;
			hitbox11.position.y = 1.05;

			hitbox1.position.z = 1.22;
			hitbox2.position.z = 0.7;
			hitbox3.position.z = 0.8;
			hitbox4.position.z = 0.37;
			hitbox5.position.z = -0.05;
			hitbox6.position.z = 0;
			hitbox7.position.z = 0;
			hitbox8.position.z = -0.45;
			hitbox9.position.z = -0.9;
			hitbox10.position.z = -1.33;
			hitbox11.position.z = -1.7;

			object.add(hitbox1);
			object.add(hitbox2);
			object.add(hitbox3);
			object.add(hitbox4);
			object.add(hitbox5);
			object.add(hitbox6);
			object.add(hitbox7);
			object.add(hitbox8);
			object.add(hitbox9);
			object.add(hitbox10);
			object.add(hitbox11);
			return object;
		}

		if (this._loadState != LoadStates.NOT_LOADING) return;

		this._loadState = LoadStates.LOADING;

		var selfRef = this;

		var mtlLoader = new THREE.MTLLoader();

		mtlLoader.setTexturePath('/Resources/Dinos/Allosaurus/');
		mtlLoader.setPath('/Resources/Dinos/Allosaurus/');
		mtlLoader.load('allo.mtl', function (materials)
		{
			materials.preload();
			var objLoader = new THREE.OBJLoader();
			objLoader.setMaterials(materials);
			objLoader.setPath('/Resources/Dinos/Allosaurus/');

			objLoader.load('allo.obj', function (object)
			{
				object.receiveShadow = true;
				object.castShadow = true;
				selfRef.name = "gAllosaurus";
				selfRef.add(object);
			}
			);
		}
		);
		selfRef = addHitboxesAllo(selfRef);
	}
}
