import { createStore, combineReducers } from "redux";

import userReducer from "./userReducer";
import chaptersReducer from "./chaptersReducer";
import mangaReducer from "./mangaReducer";
import waitingListReducer from "./waitingListReducer";

const rootReducer = combineReducers({
    data: userReducer,
    manga: mangaReducer,
    chapters: chaptersReducer,
    waiting: waitingListReducer
});

const store = createStore(rootReducer);

window['store'] = store;

export default store;