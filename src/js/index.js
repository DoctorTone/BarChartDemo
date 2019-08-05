import $ from "jquery";
import * as THREE from "three";

import { BaseApp } from "./baseApp";
import { APPCONFIG } from "./appConfig";
import { LabelManager } from "./LabelManager";

class Framework extends BaseApp {
    constructor() {
        super();
        this.barMaterials = [];
        this.labelManager = new LabelManager();
    }

    setContainer(container) {
        this.container = container;
    }

    init(container) {
        this.container = container;
        super.init(container);
    }

    addGroundPlane() {

    }
    
    createBarMaterials() {
        let barMaterial;
        for(let row=0; row<APPCONFIG.NUM_ROWS; ++row) {
            barMaterial = new THREE.MeshLambertMaterial( {color: APPCONFIG.BAR_COLOURS[row]} );
            this.barMaterials.push(barMaterial);
        }
    }

    createScene() {
        // Init base createsScene
        super.createScene();
        // Create root object.
        this.root = new THREE.Object3D();
        this.addToScene(this.root);

        // Add ground
        this.addGroundPlane();

        // Add bars to scene
        const barGeom = new THREE.CylinderBufferGeometry(APPCONFIG.BAR_RADIUS, APPCONFIG.BAR_RADIUS, APPCONFIG.BAR_HEIGHT, APPCONFIG.BAR_SEGMENTS, APPCONFIG.BAR_SEGMENTS);
        const bars = [];
        this.createBarMaterials();
        let barMesh;
        let label;
        let labelProperty;
        
        for(let row=0; row<APPCONFIG.NUM_ROWS; ++row) {
            for(let bar=0; bar<APPCONFIG.NUM_BARS_PER_ROW; ++bar) {
                barMesh = new THREE.Mesh(barGeom, this.barMaterials[row]);
                bars.push(barMesh);
                barMesh.position.set(APPCONFIG.barStartPos.x + (APPCONFIG.BAR_INC_X * bar), APPCONFIG.barStartPos.y, APPCONFIG.barStartPos.z + (APPCONFIG.BAR_INC_Z * row));
                this.root.add(barMesh);
                // Labels
                if (row === 0) {
                    labelProperty = {};
                    labelProperty.position = new THREE.Vector3();
                    labelProperty.position.copy(barMesh.position);
                    labelProperty.position.add(APPCONFIG.LABEL_OFFSET);
                    labelProperty.scale = APPCONFIG.LABEL_SCALE;
                    labelProperty.visibility = true;
                    labelProperty.textColour = APPCONFIG.LABEL_TEXTCOLOUR;
                    labelProperty.multiLine = false;
                    label = this.labelManager.create("monthLabel", APPCONFIG.MONTHS[bar], labelProperty);
                    this.root.add(label.getSprite());
                }
            }
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
