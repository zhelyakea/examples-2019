import { types as typesMST } from 'mobx-state-tree';
import Mosaic from 'models/mosaicList/Mosaic';

const types = {
  indexLayerToRemove: typesMST.maybe(typesMST.number),
  isConfirmRemoveLayer: typesMST.optional(typesMST.boolean, false),
  isConfirmRemovePositions: typesMST.optional(typesMST.boolean, false),
  dimensions: typesMST.array(typesMST.number),
  selectedPosition: typesMST.string,
  mosaic: Mosaic
};

export default types;
