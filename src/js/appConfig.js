// General parameters for this app

const APPCONFIG = {
    BAR_COLOUR : 0xfff000,
    BAR_RADIUS: 5,
    BAR_HEIGHT: 15,
    BAR_SEGMENTS: 16,
    NUM_BARS_PER_ROW: 12,
    NUM_ROWS: 5,
    barStartPos: {
        x: -85,
        y: 0,
        z: 0
    },
    BAR_INC_X: 15,
    BAR_INC_Z: -15,
    BAR_COLOURS: [
        0xff0000,
        0x00ff00,
        0x0000ff,
        0xffff00,
        0x00ffff
    ],
    LABEL_SCALE: {
        x: 20,
        y: 5,
        z: 1
    },
    LABEL_TEXTCOLOUR: "rgba(255, 165, 0, 1.0)",
    LABEL_OFFSET: {
        x: 0,
        y: -5,
        z: 10
    },
    MONTHS: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ]
}

export { APPCONFIG };