export class Engine {

  private scene: THREE.Scene
  private camera: THREE.Camera
  private renderer: THREE.WebGLRenderer
  private controls: THREE.OrbitControls

  private box: THREE.Mesh

  public constructor () {

    // Scene
    this.scene = new THREE.Scene()

    // Camera
    this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 )
    this.camera.position.set( 0, 20, 40 )   

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    
    this.renderer.setClearColor( 0x242424 )
    this.renderer.setPixelRatio( window.devicePixelRatio )
    this.renderer.setSize( window.innerWidth, window.innerHeight )

    this.renderer.gammaInput = true
    this.renderer.gammaOutput = true

    this.renderer.shadowMap.enabled = true
    this.renderer.shadowMap.renderReverseSided = false

    document.body.appendChild( this.renderer.domElement )
    
    // Orbit Controls
    this.controls = new THREE.OrbitControls( this.camera, this.renderer.domElement )
 
    // Ground Mesh
    let ground = new THREE.Mesh(
      new THREE.BoxBufferGeometry( 10, 0.5, 10 ),
      new THREE.MeshPhongMaterial({ color: 0xeeeeee, flatShading: true, shininess: 0 })
    )
    ground.position.y = -0.25
    ground.receiveShadow = true

    this.scene.add( ground )

    // Box Mesh
    this.box = new THREE.Mesh(
      new THREE.BoxBufferGeometry( 2, 4, 2 ),
      new THREE.MeshPhongMaterial({ color: 'lime', flatShading: true, shininess: 0 })
    )
    this.box.castShadow = true
    this.box.position.y = 2

    this.scene.add( this.box )

    // Hemisphere Light
    let hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 )
    hemiLight.groundColor.setHSL( 0.1, 0.2, 0.2 )
    this.scene.add( hemiLight )
    
    let hemiLightHelper = new THREE.HemisphereLightHelper( hemiLight, 10 )
    this.scene.add( hemiLightHelper )
  
    // Directional Light
    let d = 50
    let dirLight = new THREE.DirectionalLight( 0xffffff, 0.5 )
    dirLight.color.setHSL( 0.1, 1, 0.95 )
    dirLight.position.set( -1, 1.75, 1 )
    dirLight.position.multiplyScalar( 30 )
    dirLight.castShadow = true
    dirLight.shadow.mapSize.width = 2048
    dirLight.shadow.mapSize.height = 2048
    dirLight.shadow.camera.left = -d
    dirLight.shadow.camera.right = d
    dirLight.shadow.camera.top = d
    dirLight.shadow.camera.bottom = -d
    dirLight.shadow.camera.far = 3500
    dirLight.shadow.bias = -0.0001
    this.scene.add( dirLight )
    
    let dirLightHeper = new THREE.DirectionalLightHelper( dirLight, 10 ) 
    this.scene.add( dirLightHeper )

    // Listener
    this.addListener()
    this.update()

  }

  private update (): void {
    
    requestAnimationFrame( () => { this.update() } )

    this.box.rotation.y += 0.05

    this.renderer.render( this.scene, this.camera )

  }

  private addListener (): void {

    window.addEventListener( 'resize', () => { this.onResize() }, false )
    window.addEventListener( 'keydown', ( event: KeyboardEvent ) => { this.onKeyDown( event ) }, false )

  }

  private onResize (): void {

    this.camera['aspect'] = window.innerWidth / window.innerHeight
    this.camera['updateProjectionMatrix']()
    this.renderer.setSize( window.innerWidth, window.innerHeight )

  }

  private onKeyDown ( event: KeyboardEvent ): void {


  }

}