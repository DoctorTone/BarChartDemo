// General parameters for this app

const APPCONFIG = {
    BAR_COLOUR : 0xfff000,
    BAR_RADIUS: 5,
    BAR_HEIGHT: 10,
    BAR_SEGMENTS: 16,
    NUM_BARS_PER_ROW: 12,
    NUM_ROWS: 5,
    GROUND_WIDTH: 1000,
    GROUND_HEIGHT: 640,
    GROUND_SEGMENTS: 16,
    GROUND_MATERIAL: 0xcbcbcb,
    barStartPos: {
        x: -85,
        y: 0,
        z: 0
    },
    BAR_INC_X: 20,
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
    LABEL_HEIGHT: 2,
    LABEL_TEXTCOLOUR: "rgba(255, 255, 255, 1.0)",
    LABEL_MONTH_OFFSET: {
        x: 0,
        y: 0,
        z: 10
    },
    LABEL_YEAR_OFFSET: {
        x: -15,
        y: 0,
        z: 0
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
    ],
    YEARS: [
        "Year 1",
        "Year 2",
        "Year 3",
        "Year 4",
        "Year 5"
    ]
}

export { APPCONFIG };