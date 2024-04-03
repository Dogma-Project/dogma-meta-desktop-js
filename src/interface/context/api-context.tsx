import { createContext, useEffect, useState } from "react";
import { API } from "@dogma-project/core-meta/declarations/types";

type ContextType = {
  value: API.Response | null;
  send: (params: Omit<API.Request, "id">) => void;
  request: (
    params: Omit<API.Request, "id">
  ) => Promise<Omit<API.Response, "id">>;
  manager: (
    params: Omit<API.Request, "id">
  ) => Promise<Omit<API.Response, "id">>;
};

export const ApiContext = createContext<ContextType>({
  value: null,
  send: () => null,
  request: () => null,
  manager: () => null,
});

export const ApiProvider = (props: {
  children: React.ReactNode;
  prefix: string;
}) => {
  const [value, setVal] = useState<Omit<API.Response, "id"> | null>(null);

  useEffect(() => {
    window.api.listen((response) => {
      setVal(response);
    });
  }, []);

  const obj: ContextType = {
    value,
    send: (params) => {
      window.api.send({ prefix: props.prefix, data: params });
    },
    request: (params) => {
      return window.api.request({ prefix: props.prefix, data: params });
    },
    manager: (params) => {
      return window.api.manager(params);
    },
  };

  return (
    <ApiContext.Provider value={obj}>{props.children}</ApiContext.Provider>
  );
};
