import { Dimensions } from "react-native";

export const { width, height } = Dimensions.get("screen");

const guidelineBaseWidth = 360;
const guidelineBaseHeight = 640;

const horizontalScale = (size: number) => (width / guidelineBaseWidth) * size;
const verticalScale = (size: number) => (height / guidelineBaseHeight) * size;
const moderateScale = (size: number, factor = 0.5) =>
  size + (horizontalScale(size) - size) * factor;

export { horizontalScale, moderateScale, verticalScale };

export const PADDING_HORIZONTAL = horizontalScale(20);
