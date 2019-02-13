import { reaction } from 'mobx';
import { clone } from 'mobx-state-tree';

const reactions = ({ mosaic, editableMosaic, actionMessage, presets, customPresetsPage }) => {
  reaction(
    () => mosaic.isLoadError,
    isLoadError => {
      if (isLoadError) {
        actionMessage.setActionMessage(true, false, 'errorLoadingCreatedLayouts');
      }
    }
  );
  reaction(
    () => mosaic.selectedMosaic,
    selectedMosaic => {
      if (selectedMosaic) {
        editableMosaic.setMosaic(clone(mosaic.getPresetById(selectedMosaic.toString())));
      }
    }
  );
  reaction(
    () => mosaic.isSaved,
    isSaved => {
      if (isSaved) {
        actionMessage.setActionMessage(true, true, 'layoutSuccessfullyAdded');
      }
    }
  );
  reaction(
    () => mosaic.isSaveError,
    isSaveError => {
      if (isSaveError) {
        actionMessage.setActionMessage(true, false, 'errorAddingLayout');
      }
    }
  );
  reaction(
    () => mosaic.isDelete,
    isDelete => {
      if (isDelete) {
        actionMessage.setActionMessage(true, true, 'layoutSuccessfullyDeleted');
      }
    }
  );
  reaction(
    () => mosaic.isDeleteError,
    isDeleteError => {
      if (isDeleteError) {
        actionMessage.setActionMessage(true, false, 'errorDeletingLayout');
      }
    }
  );
  reaction(
    () => mosaic.getCustomPresetsLength,
    customPresetsLength => {
      const presetsOnPage = presets.presetsOnPage;
      const page = customPresetsPage.page;

      if (
        page > 0 &&
        page === customPresetsLength / presetsOnPage &&
        customPresetsLength % presetsOnPage === 0
      ) {
        customPresetsPage.pagePrev();
      }
    }
  );
};

export default reactions;
