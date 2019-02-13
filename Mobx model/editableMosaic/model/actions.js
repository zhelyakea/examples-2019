import { destroy } from 'mobx-state-tree';
import Mosaic from 'models/mosaicList/Mosaic';

const actions = self => {
  function setMosaic(mosaic) {
    self.mosaic = Mosaic.create(mosaic);
  }
  function selectPosition(position) {
    self.selectedPosition = position;
  }
  function removeLayerPositions() {
    self.mosaic.layers[self.mosaic.selectedLayer].positions = [];
    self.mosaic.remappingPositionsNum();
  }
  function removeLayer(index) {
    if (self.mosaic.layers.length > 1) {
      destroy(self.mosaic.layers[index]);
      if (self.mosaic.selectedLayer > 0) {
        self.mosaic.selectedLayer -= 1;
      }
      self.mosaic.remappingPositionsNum();
    }
  }

  function openConfirmRemoveLayer(indexLayerToRemove) {
    self.indexLayerToRemove = indexLayerToRemove;
    self.isConfirmRemoveLayer = true;
  }
  function closeConfirmRemoveLayer() {
    self.isConfirmRemoveLayer = false;
  }
  function confirmRemoveLayer() {
    self.isConfirmRemoveLayer = false;
    removeLayer(self.indexLayerToRemove);
  }

  function openConfirmRemovePositions() {
    self.isConfirmRemovePositions = true;
  }
  function closeConfirmRemovePositions() {
    self.isConfirmRemovePositions = false;
  }
  function confirmRemovePositions() {
    self.isConfirmRemovePositions = false;
    removeLayerPositions();
  }
  return {
    setMosaic,
    selectPosition,
    removeLayerPositions,
    removeLayer,
    openConfirmRemoveLayer,
    closeConfirmRemoveLayer,
    confirmRemoveLayer,
    openConfirmRemovePositions,
    closeConfirmRemovePositions,
    confirmRemovePositions
  };
};

export default actions;
