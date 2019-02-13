import { types as typesMST } from 'mobx-state-tree';

import actions from './actions';
import types from './types';
import views from './views';

const model = typesMST
  .model(types)
  .actions(actions)
  .views(views);

export default model;
