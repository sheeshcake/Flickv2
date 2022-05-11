import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const COLORS = {
    primary: "#FF002E",     // Red
    disabled: "#C0C0C0",    // Grey
    white: "#fff",
    black: "#000000",
    transparentBlack: "rgba(0,0,0,0.5)",
    blue: "#4096FE",
    gray: "#464646",
    gray1: "#363636",
    lightGray: "#dedede",
    transparentWhite: 'rgba(255, 255, 255, 0.2)',
    transparentBlack: 'rgba(0, 0, 0, 0.4)',
};
export const SIZES = {
    // global sizes
    base: 8,
    font: 14,
    radius: 12,
    padding: 24,

    // font sizes
    largeTitle: 40,
    h1: 30,
    h2: 22,
    h3: 16,
    h4: 14,
    body1: 30,
    body2: 22,
    body3: 16,
    body4: 14,
    body5: 12,

    // app dimensions
    width,
    height
};
export const FONTS = {
    largeTitle: { fontFamily: "Roboto-Black", fontSize: SIZES.largeTitle },
    h1: { fontFamily: "Roboto-Black", fontSize: SIZES.h1, lineHeight: 36 },
    h2: { fontFamily: "Roboto-Bold", fontSize: SIZES.h2, lineHeight: 30 },
    h3: { fontFamily: "Roboto-Bold", fontSize: SIZES.h3, lineHeight: 22 },
    h4: { fontFamily: "Roboto-Bold", fontSize: SIZES.h4, lineHeight: 22 },
    body1: { fontFamily: "Roboto-Regular", fontSize: SIZES.body1, lineHeight: 36 },
    body2: { fontFamily: "Roboto-Regular", fontSize: SIZES.body2, lineHeight: 30 },
    body3: { fontFamily: "Roboto-Regular", fontSize: SIZES.body3, lineHeight: 22 },
    body4: { fontFamily: "Roboto-Regular", fontSize: SIZES.body4, lineHeight: 22 },
    body5: { fontFamily: "Roboto-Regular", fontSize: SIZES.body5, lineHeight: 22 },
    
};
export const categoryContainer = {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: SIZES.base,
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: SIZES.base,
    backgroundColor: COLORS.gray1
};

export const player = {
    rate: 1,
    volume: 100,
    muted: false,
    resizeMode: 'contain',
    duration: 0.0,
    currentTime: 0.0,
    videoWidth: 0,
    videoHeight: 0,
    paused: false,
    fullscreen: true,
    decoration: true,
    isLoading: false,
    seekerFillWidth: 0,
    seekerPosition: 0,
    seekerOffset: 0,
    seeking: false,
    audioTracks: [],
    textTracks: [],
    selectedAudioTrack: undefined,
    selectedTextTrack: undefined,
    srcListId: 0,
    loop: false,
  };

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;
