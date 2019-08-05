// General parameters to help with setting up scene

const SCENECONFIG = {
    clearColour: 0x5c5f64,
    ambientLightColour: 0x383838,
    pointLightColour: 0xffffff,
    CameraPos: {
        x: 66,
        y: 60,
        z: 75
    },
    LookAtPos: {
        x: -10,
        y: -10,
        z: -15
    },
    NEAR_PLANE: 0.1,
    FAR_PLANE: 10000,
    FOV: 45,
    GroundWidth: 2000,
    GroundHeight: 1000,
    GroundSegments: 16
};

export { SCENECONFIG };