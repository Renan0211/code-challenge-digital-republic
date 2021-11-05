const windowMeasures = { width: 2, height: 1.2 };
const doorMeasures = { width: 0.8, height: 1.9 };
const minDifBetweenDoorAndCeiling = 0.3;
const areaPerLiter = 5;
const cans = [0.5, 2.5, 3.6, 18];

const validateWallMesure = (wallMeasures, includesDoor) => {
  const { width, height } = wallMeasures;
  if (width < 1 || width > 15) return false;
  if (includesDoor && height - doorMeasures.height < minDifBetweenDoorAndCeiling) return false;
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

const returnNecessaryCans = (walls) => {
  const totalWallArea = calculateTotalWallArea(walls);
};
