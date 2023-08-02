import { combineReducers, configureStore, } from "@reduxjs/toolkit";
import { default as Leads } from './slice/leads';
import { default as RetreatCenter } from './slice/retreatcenter';
import { default as RetreatCenters } from './slice/retreatcenters';
import { default as User } from './slice/user';
import thunk from "redux-thunk"
import { createStore, applyMiddleware } from 'redux';

const reducers = combineReducers({
    // Appointments,
    Leads,
    RetreatCenter,
    RetreatCenters,
    User,
});

export const store = createStore(reducers, applyMiddleware(thunk))


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;