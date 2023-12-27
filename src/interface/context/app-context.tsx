import { createContext, useReducer } from "react";
import { C_API, C_Event, C_System } from "@dogma-project/constants-meta";
import { API, User, Node } from "@dogma-project/core-meta/types/types";

class AppState {
  prefix: string = "";
  services: {
    service: C_Event.Type.Service;
    state: C_System.States;
  }[] = [];
  busy: boolean = false;
  loading: boolean = false;
  network: API.NetworkData[] = [];
  online: boolean = false;
  user: User.Model | null = null;
  node: Node.Model | null = null;
}

type action = {
  type: C_API.ApiRequestAction;
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
