const roundToTwoDecimals = (number) => {
    return Math.round(number * 100) / 100;
};

module.exports = roundToTwoDecimals;