class gSpinosaurus extends THREE.Group
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
		function addHitboxesSpino(object)
		{
			var material = new THREE.PointsMaterial({ color: 0xFFFFFF });
			var geometry = new THREE.BufferGeometry({})
			var hitbox1 = new THREE.Points(geometry, material);
			var hitbox2 = new THREE.Points(geometry, material);
			var hitbox3 = new THREE.Points(geometry, material);
			var hitbox4 = new THREE.Points(geometry, material);
			var hitbox5 = new THREE.Points(geometry, material);
			var hitbox6 = new THREE.Points(geometry, material);
			var small = { distance: 0.35 };
			var medium = { distance: 0.5 };
			var large = { distance: 0.75 };

			hitbox1.name = "0";
			hitbox2.name = "1";
			hitbox3.name = "2";
			hitbox4.name = "3";
			hitbox5.name = "4";
			hitbox6.name = "5";

			hitbox1.userData = medium;
			hitbox2.userData = large;
			hitbox3.userData = small;
			hitbox4.userData = small;
			hitbox5.userData = small;
			hitbox6.userData = small;

			hitbox1.visible = false;
			hitbox2.visible = false;
			hitbox3.visible = false;
			hitbox4.visible = false;
			hitbox5.visible = false;
			hitbox6.visible = false;

			hitbox1.position.y = 1.0;
			hitbox2.position.y = 1.2;
			hitbox3.position.y = 0.25;
			hitbox4.position.y = 1.0;
			hitbox5.position.y = 1.0;
			hitbox6.position.y = 1.0;

			hitbox1.position.z = 1.1;
			hitbox2.position.z = 0.0;
			hitbox3.position.z = -0.37;
			hitbox4.position.z = -0.95;
			hitbox5.position.z = -1.5;
			hitbox6.position.z = -2.05;

			object.add(hitbox1);
			object.add(hitbox2);
			object.add(hitbox3);
			object.add(hitbox4);
			object.add(hitbox5);
			object.add(hitbox6);
			return object;
		}

		if (this._loadState != LoadStates.NOT_LOADING) return;

		this._loadState = LoadStates.LOADING;

		var selfRef = this;

		var mtlLoader = new THREE.MTLLoader();

		mtlLoader.setTexturePath('/Resources/Dinos/Spinosaurus/');
		mtlLoader.setPath('/Resources/Dinos/Spinosaurus/');
		mtlLoader.load('spino.mtl', function (materials)
		{
			materials.preload();
			var objLoader = new THREE.OBJLoader();
			objLoader.setMaterials(materials);
			objLoader.setPath('/Resources/Dinos/Spinosaurus/');

			objLoader.load('spino.obj', function (object)
			{
				object.receiveShadow = false;
				object.castShadow = true;
				selfRef.name = "gSpinosaurus";
				selfRef.add(object);
			}
			);
		}
		);
		selfRef = addHitboxesSpino(selfRef);
	}
}
