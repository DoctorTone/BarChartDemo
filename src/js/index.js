import $ from "jquery";
import * as THREE from "three";

import { BaseApp } from "./baseApp";
import { APPCONFIG } from "./appConfig";

class Framework extends BaseApp {
    constructor() {
        super();
    }

    setContainer(container) {
        this.container = container;
    }

    init(container) {
        this.container = container;
        super.init(container);
    }

    createScene() {
        // Init base createsScene
        super.createScene();
        // Create root object.
        this.root = new THREE.Object3D();
        this.addToScene(this.root);

        // Add bars to scene
        const barGeom = new THREE.CylinderBufferGeometry(APPCONFIG.BAR_RADIUS, APPCONFIG.BAR_RADIUS, APPCONFIG.BAR_HEIGHT, APPCONFIG.BAR_SEGMENTS, APPCONFIG.BAR_SEGMENTS);
        const barMat = new THREE.MeshLambertMaterial( {color: APPCONFIG.BAR_COLOUR} );
        const bars = [];
        let barMesh;
        for(let i=0; i<APPCONFIG.NUM_BARS_PER_ROW; ++i) {
            barMesh = new THREE.Mesh(barGeom, barMat);
            bars.push(barMesh);
            barMesh.position.set(APPCONFIG.barStartPos.x + (APPCONFIG.BAR_INC_X * i), APPCONFIG.barStartPos.y, APPCONFIG.barStartPos.z);
            this.root.add(barMesh);
        }
    }
}

$(document).ready( () => {
    
    const container = document.getElementById("WebGL-Output");
    const app = new Framework();

    app.init(container);
    app.createScene();

    app.run();
});
