import calcIndents from 'helpers/calcIndents';

const views = self => ({
  get getLayersPositions() {
    return self.mosaic.layers
      .map(({ positions }) => positions.map(({ i }) => i))
      .reduce((accum, item) => accum.concat(item), [])
      .sort((prev, curr) => prev - curr);
  },
  get getPosition() {
    return (
      self.mosaic.layers
        .get(self.mosaic.selectedLayer)
        .positions.find(({ i }) => i === self.selectedPosition) || {}
    );
  },
  get getSupportedDimensions() {
    const dimensions = self.dimensions;
    const layer = self.mosaic.layers.get(self.mosaic.selectedLayer);
    const { positions, dimension } = layer;
    const supportedDimensions = calcIndents(dimensions, positions, dimension);

    return supportedDimensions;
  },
  get layersMoreThanOne() {
    return self.mosaic.layers.length > 1;
  },
  get layersLessThanThree() {
    return self.mosaic.layers.length < 3;
  },
  get getLowestVisible() {
    const lowestVisibleLayer = self.mosaic.layers.find(({ visible }, index) => visible);

    if (lowestVisibleLayer) {
      const lowestVisibleLayerIndex = self.mosaic.layers.indexOf(lowestVisibleLayer);

      if (lowestVisibleLayerIndex < self.mosaic.selectedLayer) {
        return lowestVisibleLayerIndex;
      }
    }
    return self.mosaic.selectedLayer;
  }
});

export default views;
