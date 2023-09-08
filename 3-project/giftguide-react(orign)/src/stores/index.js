import { createStore, applyMiddleware, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import { createHashHistory } from "history";
import { routerMiddleware } from "connected-react-router";

import reducers from "../reducers";
import rootSaga from "../sagas";

// const history = createHashHistory({});
// history.listen((location, action) => {
//   if (action === "PUSH") {
//     window.scrollTo(0, 0);
//   }
// });

const sagaMiddleware = createSagaMiddleware();
const enhancers = composeWithDevTools(applyMiddleware(sagaMiddleware));
// const middlewares = [sagaMiddleware];
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// composeEnhancers(applyMiddleware(...middlewares))
const store = createStore(reducers, enhancers);

sagaMiddleware.run(rootSaga);

export default store;
