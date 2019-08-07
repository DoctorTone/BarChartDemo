import $ from "jquery";
import * as THREE from "three";
import { LineGeometry } from "three/examples/jsm/lines/LineGeometry";
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial';
import { Line2 } from 'three/examples/jsm/lines/Line2';

import { BaseApp } from "./baseApp";
import { APPCONFIG } from "./appConfig";
import { LabelManager } from "./LabelManager";
import controlkit from "controlkit";

import salesData from "../../data/salesData.json";

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
        const groundGeom = new THREE.PlaneBufferGeometry(APPCONFIG.GROUND_WIDTH, APPCONFIG.GROUND_HEIGHT, APPCONFIG.GROUND_SEGMENTS);
        const groundMat = new THREE.MeshLambertMaterial( {color: APPCONFIG.GROUND_MATERIAL} );
        const ground = new THREE.Mesh(groundGeom, groundMat);
        ground.rotation.x = -Math.PI/2;
        ground.position.y = 0;
        this.root.add(ground);
    }

    createBarMaterials() {
        let barMaterial;
        for(let row=0; row<APPCONFIG.NUM_ROWS; ++row) {
            barMaterial = new THREE.MeshLambertMaterial( {color: APPCONFIG.BAR_COLOURS[row]} );
            this.barMaterials.push(barMaterial);
        }
    }

    createGUI() {
        let yearConfig = {
            Year1: true,
            Year2: true,
            Year3: true,
            Year4: true,
            Year5: true
        };

        let monthConfig = {
            Jan: true,
            Feb: true,
            Mar: true,
            Apr: true,
            May: true,
            Jun: true,
            Jul: true,
            Aug: true,
            Sep: true,
            Oct: true,
            Nov: true,
            Dec: true
        };

        let scaleMonthConfig = {
            Month: 1,
            range: [1, 3]
        };

        let scaleYearConfig = {
            Year: 1,
            range: [1, 3]
        };

        let gui = new controlkit();
        gui.addPanel( {label: "Configuration", enable: false})
            .addSubGroup( {label: "Years", enable: false} )
                .addCheckbox(yearConfig, "Year1", {
                    onChange: () => {
                        this.toggleYear("Year1");
                    }
                })
                .addCheckbox(yearConfig, "Year2", {
                    onChange: () => {
                        this.toggleYear("Year2");
                    }
                })
                .addCheckbox(yearConfig, "Year3", {
                    onChange: () => {
                        this.toggleYear("Year3");
                    }
                })
                .addCheckbox(yearConfig, "Year4", {
                    onChange: () => {
                        this.toggleYear("Year4");
                    }
                })
                .addCheckbox(yearConfig, "Year5", {
                    onChange: () => {
                        this.toggleYear("Year5");
                    }
                })
            .addSubGroup( {label: "Months", enable: false} )
                .addCheckbox(monthConfig, "Jan", {
                    onChange: () => {
                        this.toggleMonth("Jan");
                    }
                })
                .addCheckbox(monthConfig, "Feb", {
                    onChange: () => {
                        this.toggleMonth("Feb");
                    }
                })
                .addCheckbox(monthConfig, "Mar", {
                    onChange: () => {
                        this.toggleMonth("Mar");
                    }
                })
                .addCheckbox(monthConfig, "Apr", {
                    onChange: () => {
                        this.toggleMonth("Apr");
                    }
                })
                .addCheckbox(monthConfig, "May", {
                    onChange: () => {
                        this.toggleMonth("May");
                    }
                })
                .addCheckbox(monthConfig, "Jun", {
                    onChange: () => {
                        this.toggleMonth("Jun");
                    }
                })
                .addCheckbox(monthConfig, "Jul", {
                    onChange: () => {
                        this.toggleMonth("Jul");
                    }
                })
                .addCheckbox(monthConfig, "Aug", {
                    onChange: () => {
                        this.toggleMonth("Aug");
                    }
                })
                .addCheckbox(monthConfig, "Sep", {
                    onChange: () => {
                        this.toggleMonth("Sep");
                    }
                })
                .addCheckbox(monthConfig, "Oct", {
                    onChange: () => {
                        this.toggleMonth("Oct");
                    }
                })
                .addCheckbox(monthConfig, "Nov", {
                    onChange: () => {
                        this.toggleMonth("Nov");
                    }
                })
                .addCheckbox(monthConfig, "Dec", {
                    onChange: () => {
                        this.toggleMonth("Dec");
                    }
                })
            .addSubGroup( {label: "Scale", enable: false} )
                .addSlider(scaleMonthConfig, "Month", "range", {
                    onChange: () => {
                        this.scaleBars(scaleMonthConfig.Month, scaleYearConfig.Year);
                    }
                })
                .addSlider(scaleYearConfig, "Year", "range", {
                    onChange: () => {
                        this.scaleBars(scaleMonthConfig.Month, scaleYearConfig.Year);
                    }
                })

        this.gui = gui;
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
        let yearData;
        let monthData;
        let currentYear;
        let currentGroup;
        // Lines
        let monthlyLinePositions = [];
        
        for(let row=0; row<APPCONFIG.NUM_ROWS; ++row) {
            currentYear = row + 1;
            // Create group
            currentGroup = new THREE.Group();
            currentGroup.name = "Year" + currentYear;
            let linePositions = [];
            for(let bar=0; bar<APPCONFIG.NUM_BARS_PER_ROW; ++bar) {
                // Create mesh
                barMesh = new THREE.Mesh(barGeom, this.barMaterials[row]);
                barMesh.name = currentGroup.name + APPCONFIG.MONTHS[bar];
                bars.push(barMesh);
                barMesh.position.set(APPCONFIG.barStartPos.x + (APPCONFIG.BAR_INC_X * bar), APPCONFIG.barStartPos.y, APPCONFIG.barStartPos.z + (APPCONFIG.BAR_INC_Z * row));

                yearData = salesData["Year" + currentYear];
                monthData = yearData[bar].sales;
                if (monthData === 0) {
                    monthData = 0.001;
                }
                barMesh.scale.set(1, monthData, 1);
                barMesh.position.y += (monthData * 5);
                currentGroup.add(barMesh);

                // Lines
                linePositions.push(barMesh.position.x, barMesh.position.y*2, barMesh.position.z);

                this.root.add(currentGroup);

                // Labels
                if (row === 0) {
                    labelProperty = {};
                    labelProperty.position = new THREE.Vector3();
                    labelProperty.position.copy(barMesh.position);
                    labelProperty.position.y = APPCONFIG.LABEL_HEIGHT;
                    labelProperty.position.add(APPCONFIG.LABEL_MONTH_OFFSET);
                    labelProperty.scale = APPCONFIG.LABEL_SCALE;
                    labelProperty.visibility = true;
                    labelProperty.textColour = APPCONFIG.LABEL_TEXTCOLOUR;
                    labelProperty.multiLine = false;
                    label = this.labelManager.create("monthLabel" + bar, APPCONFIG.MONTHS[bar], labelProperty);
                    this.root.add(label.getSprite());
                }
                if (bar === 0) {
                    labelProperty = {};
                    labelProperty.position = new THREE.Vector3();
                    labelProperty.position.copy(barMesh.position);
                    labelProperty.position.y = APPCONFIG.LABEL_HEIGHT;
                    labelProperty.position.add(APPCONFIG.LABEL_YEAR_OFFSET);
                    labelProperty.scale = APPCONFIG.LABEL_SCALE;
                    labelProperty.visibility = true;
                    labelProperty.textColour = APPCONFIG.LABEL_TEXTCOLOUR;
                    labelProperty.multiLine = false;
                    label = this.labelManager.create("yearLabel" + row, APPCONFIG.YEARS[row], labelProperty);
                    this.root.add(label.getSprite());
                }
            }
            monthlyLinePositions.push(linePositions);
        }

        this.bars = bars;

        // Lines
        const lineColour = new THREE.Color();
        lineColour.setHex(0xdadada);
        let lineColours = [];
        const numPositions = monthlyLinePositions[0].length;
        for(let i=0; i<numPositions; ++i) {
            lineColours.push(lineColour.r, lineColour.g, lineColour.b);
        }

        let lineMat = new LineMaterial( {
            color: 0xffffff,
            linewidth: 10,
            vertexColors: THREE.VertexColors,
            dashed: false
        });

        lineMat.resolution.set( window.innerWidth, window.innerHeight );

        const numLineGeometries = monthlyLinePositions.length;
        let lineGeom;
        let line;
        const scale = 1;
        for(let i=0; i<numLineGeometries; ++i) {
            lineGeom = new LineGeometry();
            lineGeom.setPositions(monthlyLinePositions[i]);
            lineGeom.setColors(lineColours);

            line = new Line2(lineGeom, lineMat);
            line.computeLineDistances();
            line.scale.set(scale, scale, scale);
            this.root.add(line);
        }

        this.createGUI();
    }

    redrawScene(xIncrement, zIncrement) {
        const barsPerRow = APPCONFIG.NUM_BARS_PER_ROW;
        let currentBar;
        let currentLabel;
        for(let row=0; row<APPCONFIG.NUM_ROWS; ++row) {
            for(let bar=0; bar<barsPerRow; ++bar) {
                currentBar = this.bars[(row * barsPerRow) + bar];
                currentBar.position.x = APPCONFIG.barStartPos.x + (xIncrement * bar);
                currentBar.position.z = APPCONFIG.barStartPos.z + (zIncrement * row);
                if (row === 0) {
                    currentLabel = this.labelManager.getLabel("monthLabel" + bar);
                    if (currentLabel) {
                        currentLabel.setXPosition(currentBar.position.x);
                    }
                }
                if (bar === 0) {
                    currentLabel = this.labelManager.getLabel("yearLabel" + row);
                    if (currentLabel) {
                        currentLabel.setZPosition(currentBar.position.z);
                    }
                }
            }
        }
    }

    toggleYear(year) {
        let currentYear = this.getObjectByName(year);
        if (currentYear) {
            currentYear.visible = !currentYear.visible;
        }
    }

    toggleMonth(month) {
        const years = ["Year1", "Year2", "Year3", "Year4", "Year5"];
        let monthName;
        let currentMonth;
        for(let i=0, numYears=years.length; i<numYears; ++i) {
            monthName = years[i] + month;
            currentMonth = this.getObjectByName(monthName);
            if (currentMonth) {
                currentMonth.visible = !currentMonth.visible;
            }
        }
    }

    scaleBars(xScale, zScale) {
        let scaledIncX = APPCONFIG.BAR_INC_X * xScale;
        let scaledIncZ = APPCONFIG.BAR_INC_Z * zScale;
        this.redrawScene(scaledIncX, scaledIncZ);
    }
}

$(document).ready( () => {
    
    const container = document.getElementById("WebGL-Output");
    const app = new Framework();

    app.init(container);
    app.createScene();

    app.run();
});
