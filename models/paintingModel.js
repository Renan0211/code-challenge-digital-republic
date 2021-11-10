const windowMeasures = { width: 2, height: 1.2 };
const doorMeasures = { width: 0.8, height: 1.9 };
const minDifBetweenDoorAndCeiling = 0.3;
const areaPerLiter = 5;
const cans = [0.5, 2.5, 3.6, 18];
const errs = {
  invalidWall: { err: { message: 'Uma das paredes tem tamanho inválido' }, status: 400 },
  tooMuchWindowsOrDoors: { err: { message: 'Muitas portas ou janelas em uma das paredes' }, status: 400 },
};

const validateWallMesure = (walls) => {
  const wallValidations = walls.map((wall) => {
    const { wallMeasures, doorQty } = wall;
    const { width, height } = wallMeasures;
    if (width < 1 || width > 15) return false;
    if (doorQty > 0 && height - doorMeasures.height < minDifBetweenDoorAndCeiling) return false;
    return true;
  });
  if (wallValidations.includes(false)) return false;
  return true;
};

const calculateWallArea = (wallMeasures) => {
  const { width, height } = wallMeasures;
  return width * height;
};

const calculateTotalWallArea = (walls) => {
  let totalWallArea = 0;
  walls.forEach((wall) => {
    const wallArea = calculateWallArea(wall.wallMeasures);
    totalWallArea += wallArea;
  });
  return totalWallArea;
};

const calculateNonPaintingAreaPerWall = (doorQty, windowQty) => {
  const doorArea = doorQty * (doorMeasures.width * doorMeasures.height);
  const windowArea = windowQty * (windowMeasures.width * windowMeasures.height);
  return doorArea + windowArea;
};

const calculateTotalNonPaintingArea = (walls) => {
  let totalNonPaitingArea = 0;
  walls.forEach((wall) => {
    const nonPaintingArea = calculateNonPaintingAreaPerWall(wall.doorQty, wall.windowQty);
    totalNonPaitingArea += nonPaintingArea;
  });
  return totalNonPaitingArea;
};

const calculateNecessaryCans = (litersNecessary) => {
  cans.sort((a, b) => b - a);
  // eslint-disable-next-line no-return-assign
  const necessaryCans = cans.reduce((acc, curr) => {
    acc[curr] = 0;
    return acc;
  }, {});
  let remainingLitters = litersNecessary;
  for (let i = 0; i < cans.length; i += 1) {
    if (remainingLitters - cans[i] >= 0) {
      remainingLitters -= cans[i];
      necessaryCans[cans[i]] += 1;
    }
  }
  return necessaryCans;
};

const validateProportion = (totalWallArea, nonPaintingArea) => nonPaintingArea <= totalWallArea / 2;

const returnNecessaryCans = (walls) => {
  const wallMeasureValidation = validateWallMesure(walls);
  if (!wallMeasureValidation) return errs.invalidWall;
  const totalWallArea = calculateTotalWallArea(walls);
  const nonPaintingArea = calculateTotalNonPaintingArea(walls);
  const proportionValidation = validateProportion(totalWallArea, nonPaintingArea);
  if (!proportionValidation) return errs.tooMuchWindowsOrDoors;
  const paintingArea = totalWallArea - nonPaintingArea;
  const litersNecessary = paintingArea / areaPerLiter;
  const necessaryCans = calculateNecessaryCans(litersNecessary);
  return necessaryCans;
};

module.exports = {
  returnNecessaryCans,
};
