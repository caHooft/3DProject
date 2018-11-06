class gBrachiosaurus extends THREE.Group
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
		function addHitboxesBrac(object)
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
			var hitbox12 = new THREE.Points(geometry, material);
			var hitbox13 = new THREE.Points(geometry, material);
			var hitbox14 = new THREE.Points(geometry, material);
			var hitbox15 = new THREE.Points(geometry, material);
			var small = { distance: 0.25 };
			var medium = { distance: 0.85 };
			var large = { distance: 1.00 };

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
			hitbox12.name = "11";
			hitbox13.name = "12";
			hitbox14.name = "13";
			hitbox15.name = "14";

			hitbox1.userData = small;
			hitbox2.userData = small;
			hitbox3.userData = small;
			hitbox4.userData = small;
			hitbox5.userData = small;
			hitbox6.userData = small;
			hitbox7.userData = small;
			hitbox8.userData = small;
			hitbox9.userData = small;
			hitbox10.userData = small;
			hitbox11.userData = small;
			hitbox12.userData = small;
			hitbox13.userData = medium;
			hitbox14.userData = medium;
			hitbox15.userData = large;

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
			hitbox12.visible = false;
			hitbox13.visible = false;
			hitbox14.visible = false;
			hitbox15.visible = false;

			hitbox1.position.x = 0.4;
			hitbox2.position.x = 0.4;
			hitbox3.position.x = 0.4;
			hitbox4.position.x = -0.4;
			hitbox5.position.x = -0.4;
			hitbox6.position.x = -0.4;
			hitbox7.position.x = 0.4;
			hitbox8.position.x = 0.4;
			hitbox9.position.x = 0.4;
			hitbox10.position.x = -0.4;
			hitbox11.position.x = -0.4;
			hitbox12.position.x = -0.4;
			hitbox13.position.x = 0.0;
			hitbox14.position.x = 0.0;
			hitbox15.position.x = 0.0;

			hitbox1.position.y = 0;
			hitbox2.position.y = 0.45;
			hitbox3.position.y = 0.9;
			hitbox4.position.y = 0;
			hitbox5.position.y = 0.45;
			hitbox6.position.y = 0.9;
			hitbox7.position.y = 0;
			hitbox8.position.y = 0.45;
			hitbox9.position.y = 0.9;
			hitbox10.position.y = 0;
			hitbox11.position.y = 0.45;
			hitbox12.position.y = 0.9;
			hitbox13.position.y = 1.6;
			hitbox14.position.y = 1.7;
			hitbox15.position.y = 1.9;

			hitbox1.position.z = 1.1;
			hitbox2.position.z = 1.05;
			hitbox3.position.z = 1.0;
			hitbox4.position.z = -0.7;
			hitbox5.position.z = -0.7;
			hitbox6.position.z = -0.7;
			hitbox7.position.z = -0.7;
			hitbox8.position.z = -0.7;
			hitbox9.position.z = -0.7;
			hitbox10.position.z = 1.1;
			hitbox11.position.z = 1.05;
			hitbox12.position.z = 1.0;
			hitbox13.position.z = 0.18;
			hitbox14.position.z = -0.33;
			hitbox15.position.z = 0.7;

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
			object.add(hitbox12);
			object.add(hitbox13);
			object.add(hitbox14);
			object.add(hitbox15);
			return object;
		}


		if (this._loadState != LoadStates.NOT_LOADING) return;

		this._loadState = LoadStates.LOADING;

		var selfRef = this;

		var mtlLoader = new THREE.MTLLoader();

		mtlLoader.setTexturePath('/Resources/Dinos/Brachiosaurus/');
		mtlLoader.setPath('/Resources/Dinos/Brachiosaurus/');
		mtlLoader.load('brac.mtl', function (materials)
		{
			materials.preload();
			var objLoader = new THREE.OBJLoader();
			objLoader.setMaterials(materials);
			objLoader.setPath('/Resources/Dinos/Brachiosaurus/');

			objLoader.load('brac.obj', function (object)
			{
				object.receiveShadow = false;
				object.castShadow = true;
				selfRef.name = "gBrachiosaurus";
				selfRef.add(object);
			}
			);
		}
		);
		selfRef = addHitboxesBrac(selfRef);
	}
}
