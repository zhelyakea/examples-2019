import { onSnapshot } from 'mobx-state-tree';

import EditableMosaic from './index';

const editableMosaicState = {
  isConfirmRemoveLayer: false,
  isConfirmRemovePositions: false,
  dimensions: [1, 2, 3, 4, 5, 6, 8, 9, 10, 12],
  selectedPosition: '',
  mosaic: {
    id: '1000',
    layers: [
      {
        dimension: 3,
        positions: []
      }
    ]
  }
};
const mosaicState = {
  id: '1',
  selectedLayer: 2,
  lowLayersVisibility: true,
  layers: [
    {
      dimension: 4,
      positions: [
        {
          i: '4',
          x: 0,
          y: 1,
          w: 2,
          h: 2,
          role: 0
        },
        {
          i: '3',
          x: 2,
          y: 1,
          w: 2,
          h: 2,
          role: 0
        }
      ]
    },
    {
      dimension: 4,
      positions: [
        {
          i: '2',
          x: 0,
          y: 1,
          w: 2,
          h: 2,
          role: 0
        },
        {
          i: '1',
          x: 2,
          y: 1,
          w: 2,
          h: 2,
          role: 0
        }
      ]
    },
    {
      dimension: 4,
      positions: [
        {
          i: '6',
          x: 0,
          y: 1,
          w: 2,
          h: 2,
          role: 0
        },
        {
          i: '5',
          x: 2,
          y: 1,
          w: 2,
          h: 2,
          role: 0
        }
      ]
    }
  ]
};

it('check setMosaic', () => {
  const editableMosaic = EditableMosaic.create(editableMosaicState);

  onSnapshot(editableMosaic, snapshot => {
    expect(snapshot).toMatchSnapshot();
  });
  editableMosaic.setMosaic(mosaicState);
});
it('check selectPosition', () => {
  const editableMosaic = EditableMosaic.create(editableMosaicState);

  onSnapshot(editableMosaic, snapshot => {
    expect(snapshot).toMatchSnapshot();
  });
  editableMosaic.selectPosition('1');
  expect(editableMosaic.selectedPosition).toBe('1');
});
it('check removeLayerPositions', () => {
  const editableMosaicWithPresetState = { ...editableMosaicState, mosaic: mosaicState };
  const editableMosaic = EditableMosaic.create(editableMosaicWithPresetState);

  onSnapshot(editableMosaic, snapshot => {
    expect(snapshot).toMatchSnapshot();
  });
  editableMosaic.removeLayerPositions();
  const {
    mosaic: { layers, selectedLayer }
  } = editableMosaic;
  const { positions } = layers[selectedLayer];

  expect(positions.length).toBe(0);
});
it('check removeLayer', () => {
  const editableMosaicWithPresetState = { ...editableMosaicState, mosaic: mosaicState };
  const editableMosaic = EditableMosaic.create(editableMosaicWithPresetState);

  onSnapshot(editableMosaic, snapshot => {
    expect(snapshot).toMatchSnapshot();
  });
  editableMosaic.removeLayer(1);
  const mosaic = editableMosaic.mosaic;

  expect(mosaic.layers.length).toBe(2);
  expect(mosaic.selectedLayer).toBe(1);
});
it('check openConfirmRemoveLayer', () => {
  const editableMosaic = EditableMosaic.create(editableMosaicState);

  editableMosaic.openConfirmRemoveLayer(1);

  expect(editableMosaic.indexLayerToRemove).toBe(1);
  expect(editableMosaic.isConfirmRemoveLayer).toBe(true);
});
it('check closeConfirmRemoveLayer', () => {
  const editableMosaic = EditableMosaic.create(editableMosaicState);

  editableMosaic.closeConfirmRemoveLayer();

  expect(editableMosaic.isConfirmRemoveLayer).toBe(false);
});
it('check confirmRemoveLayer', () => {
  const editableMosaicWithPresetState = {
    ...editableMosaicState,
    indexLayerToRemove: 1,
    mosaic: mosaicState
  };
  const editableMosaic = EditableMosaic.create(editableMosaicWithPresetState);

  onSnapshot(editableMosaic, snapshot => {
    expect(snapshot).toMatchSnapshot();
  });
  editableMosaic.confirmRemoveLayer();

  expect(editableMosaic.mosaic.layers.length).toBe(2);
  expect(editableMosaic.isConfirmRemoveLayer).toBe(false);
});

it('check openConfirmRemovePositions', () => {
  const editableMosaic = EditableMosaic.create(editableMosaicState);

  editableMosaic.openConfirmRemovePositions();

  expect(editableMosaic.isConfirmRemovePositions).toBe(true);
});
it('check closeConfirmRemovePositions', () => {
  const editableMosaic = EditableMosaic.create(editableMosaicState);

  editableMosaic.closeConfirmRemovePositions();

  expect(editableMosaic.isConfirmRemovePositions).toBe(false);
});
it('check confirmRemovePositions', () => {
  const editableMosaicWithPresetState = { ...editableMosaicState, mosaic: mosaicState };
  const editableMosaic = EditableMosaic.create(editableMosaicWithPresetState);

  onSnapshot(editableMosaic, snapshot => {
    expect(snapshot).toMatchSnapshot();
  });
  editableMosaic.confirmRemovePositions();
  const {
    mosaic: { layers, selectedLayer }
  } = editableMosaic;
  const { positions } = layers[selectedLayer];

  expect(positions.length).toBe(0);
});
