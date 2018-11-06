class gAnkylosaurus extends THREE.Group
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
		function addHitboxesAnky(object)
		{
			var material = new THREE.PointsMaterial({ color: 0xFFFFFF });
			var geometry = new THREE.BufferGeometry({})
			var hitbox1 = new THREE.Points(geometry, material);
			var hitbox2 = new THREE.Points(geometry, material);
			var hitbox3 = new THREE.Points(geometry, material);
			var hitbox4 = new THREE.Points(geometry, material);
			var hitbox5 = new THREE.Points(geometry, material);
			var small = { distance: 0.4 };
			//var medium = { distance: 0.3 };
			var large = { distance: 1.0 };

			hitbox1.name = "0";
			hitbox2.name = "1";
			hitbox3.name = "2";
			hitbox4.name = "3";
			hitbox5.name = "4";

			hitbox1.userData = small;
			hitbox2.userData = small;
			hitbox3.userData = small;
			hitbox4.userData = small;
			hitbox5.userData = large;

			hitbox1.visible = false;
			hitbox2.visible = false;
			hitbox3.visible = false;
			hitbox4.visible = false;
			hitbox5.visible = false;

			hitbox1.position.y = 0.3;
			hitbox2.position.y = 0.55;
			hitbox3.position.y = 0.3;
			hitbox4.position.y = 0.3;
			hitbox5.position.y = 0.2;

			hitbox1.position.z = 1.44;
			hitbox2.position.z = 1.0;
			hitbox3.position.z = -1.2;
			hitbox4.position.z = -1.6;
			hitbox5.position.z = 0.0;

			object.add(hitbox1);
			object.add(hitbox2);
			object.add(hitbox3);
			object.add(hitbox4);
			object.add(hitbox5);
			return object;
		}

		if (this._loadState != LoadStates.NOT_LOADING) return;

		this._loadState = LoadStates.LOADING;

		var selfRef = this;

		var mtlLoader = new THREE.MTLLoader();

		mtlLoader.setTexturePath('/Resources/Dinos/Ankylosaurus/');
		mtlLoader.setPath('/Resources/Dinos/Ankylosaurus/');
		mtlLoader.load('anky.mtl', function (materials)
		{
			materials.preload();
			var objLoader = new THREE.OBJLoader();
			objLoader.setMaterials(materials);
			objLoader.setPath('/Resources/Dinos/Ankylosaurus/');

			objLoader.load('anky.obj', function (object)
			{
				object.receiveShadow = false;
				object.castShadow = true;
				selfRef.name = "gAnkylosaurus";
				selfRef.add(object);
			}
			);
		}
		);
		selfRef = addHitboxesAnky(selfRef);
	}
}
