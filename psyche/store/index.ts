import { init, RematchRootState } from "@rematch/core";

import * as models from "psyche/store/models";

export const store = init({
  models
});

export type Store = typeof store;
export type Dispatch = typeof store.dispatch;
export type RootState = RematchRootState<typeof models>;

export default store;
