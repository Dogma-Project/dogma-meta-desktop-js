import { createContext, useReducer } from "react";
import {
  API,
  User,
  Node,
  Event,
} from "@dogma-project/core-meta/declarations/types";

import { C_API } from "@dogma-project/core-meta/src/constants";

class AppState {
  prefix: string = "";
  services: {
    service: Event.Type.Service;
    state: Event.ServiceState;
  }[] = [];
  busy: boolean = false;
  loading: boolean = false;
  network: API.NetworkData[] = [];
  online: boolean = false;
  user: User.Model | null = null;
  node: Node.Model | null = null;
}

type action = {
  type: API.RequestAction;
  value: object;
};

type ContextType = {
  state: AppState;
  dispatch: React.Dispatch<action>;
};

const defaultValue = new AppState();

export const AppContext = createContext<ContextType>({
  state: defaultValue,
  dispatch: () => null,
});

export const AppContextProvider = (props: { children: React.ReactNode }) => {
  const tasksReducer = (state: AppState, action: action) => {
    switch (action.type) {
      case C_API.ApiRequestAction.set: {
        return { ...state, ...action.value };
      }
      default: {
        console.log("reducer", "unknown type");
        return state;
        // throw Error("Unknown action: " + action.type);
      }
    }
  };

  const [state, dispatch] = useReducer(tasksReducer, defaultValue);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {props.children}
    </AppContext.Provider>
  );
};
