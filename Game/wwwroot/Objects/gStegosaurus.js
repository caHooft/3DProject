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
			var hitbox4 = new THREE.Points(geometry, material);
			var hitbox5 = new THREE.Points(geometry, material);
			var hitbox6 = new THREE.Points(geometry, material);
			var hitbox7 = new THREE.Points(geometry, material);
			var small = { distance: 0.2 };
			var medium = { distance: 0.3 };
			var large = { distance: 0.5 };

			hitbox1.name = "0";
			hitbox2.name = "1";
			hitbox3.name = "2";
			hitbox4.name = "3";
			hitbox5.name = "4";
			hitbox6.name = "5";
			hitbox7.name = "6";

			hitbox1.userData = small;
			hitbox2.userData = medium;
			hitbox3.userData = medium;
			hitbox4.userData = medium;
			hitbox5.userData = medium;
			hitbox6.userData = medium;
			hitbox7.userData = large;

			hitbox1.visible = false;
			hitbox2.visible = false;
			hitbox3.visible = false;
			hitbox4.visible = false;
			hitbox5.visible = false;
			hitbox6.visible = false;
			hitbox7.visible = false;

			hitbox1.position.y = 0.4;
			hitbox2.position.y = 0.34;
			hitbox3.position.y = 0.65;
			hitbox4.position.y = 0.8;
			hitbox5.position.y = 0.65;
			hitbox6.position.y = 0.35;
			hitbox7.position.y = 0.2;

			hitbox1.position.z = 1.35;
			hitbox2.position.z = 0.88;
			hitbox3.position.z = 0.65;
			hitbox4.position.z = 0.15;
			hitbox5.position.z = -0.25;
			hitbox6.position.z = -0.6;
			hitbox7.position.z = 0.3;

			object.add(hitbox1);
			object.add(hitbox2);
			object.add(hitbox3);
			object.add(hitbox4);
			object.add(hitbox5);
			object.add(hitbox6);
			object.add(hitbox7);
			return object;
		}
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
