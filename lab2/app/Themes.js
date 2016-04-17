import {cyan500, cyan700, lightBlack, pinkA200, grey100, grey500,
        darkBlack, white, grey300, grey600, fullWhite, pinkA100,
        pinkA400, cyan300, lightGreenA200} from 'material-ui/lib/styles/colors'
import ColorManipulator from 'material-ui/lib/utils/color-manipulator'
import Spacing from 'material-ui/lib/styles/spacing'
import zIndex from 'material-ui/lib/styles/zIndex'

export const brightBlueTheme = {
    spacing: Spacing,
    zIndex: zIndex,
    fontFamily: 'Roboto, "PingFang SC Light", "Microsoft YaHei", sans-serif',
    palette: {
        primary1Color: cyan500,
        primary2Color: cyan700,
        primary3Color: lightBlack,
        accent1Color: pinkA200,
        accent2Color: grey100,
        accent3Color: grey500,
        textColor: darkBlack,
        alternateTextColor: white,
        canvasColor: white,
        borderColor: grey300,
        disabledColor: ColorManipulator.fade(darkBlack, 0.3),
        pickerHeaderColor: cyan500,
    }
}

export const darkRedTheme = {
    spacing: Spacing,
    fontFamily: 'Roboto, "PingFang SC Light", "Microsoft YaHei", sans-serif',
    palette: {
        primary1Color: pinkA200,
        primary2Color: pinkA200,
        primary3Color: grey600,
        accent1Color: cyan700,
        accent2Color: cyan300,
        accent3Color: pinkA100,
        textColor: fullWhite,
        alternateTextColor: '#303030',
        canvasColor: '#303030',
        borderColor: ColorManipulator.fade(fullWhite, 0.3),
        disabledColor: ColorManipulator.fade(fullWhite, 0.3),
        pickerHeaderColor: ColorManipulator.fade(fullWhite, 0.12),
        clockCircleColor: ColorManipulator.fade(fullWhite, 0.12),
    }
}

export const darkGreenTheme = {
    spacing: Spacing,
    fontFamily: 'Roboto, "PingFang SC Light", "Microsoft YaHei", sans-serif',
    palette: {
        primary1Color: lightGreenA200,
        primary2Color: lightGreenA200,
        primary3Color: grey600,
        accent1Color: pinkA200,
        accent2Color: pinkA400,
        accent3Color: pinkA100,
        textColor: fullWhite,
        alternateTextColor: '#303030',
        canvasColor: '#303030',
        borderColor: ColorManipulator.fade(fullWhite, 0.3),
        disabledColor: ColorManipulator.fade(fullWhite, 0.3),
        pickerHeaderColor: ColorManipulator.fade(fullWhite, 0.12),
        clockCircleColor: ColorManipulator.fade(fullWhite, 0.12),
    }
}

