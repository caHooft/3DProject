class gHero extends THREE.Group
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
		if (this._loadState != LoadStates.NOT_LOADING) return;

		this._loadState = LoadStates.LOADING;

		var selfRef = this;

		var sphereGeometry = new THREE.DodecahedronGeometry(heroRadius, 1);
		var sphereMaterial = new THREE.MeshStandardMaterial({ color: 0xe5f2f2, shading: THREE.FlatShading })
		jumping = false;
		heroSphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
		heroSphere.receiveShadow = true;
		heroSphere.castShadow = true;
		this.add(heroSphere);
		heroSphere.position.y = heroBaseY;
		heroSphere.position.z = 4.8;
		currentLane = middleLane;
		heroSphere.position.x = currentLane;

	}
}

