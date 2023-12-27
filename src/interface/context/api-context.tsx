import { createContext, useEffect, useState } from "react";
import { API } from "@dogma-project/core-meta/types/types";

type ContextType = {
  value: API.Response | null;
  send: (params: Omit<API.Request, "id">) => void;
  request: (
    params: Omit<API.Request, "id">,
    cb: (response: Omit<API.Response, "id">) => void
  ) => void;
  manager: (
    params: Omit<API.Request, "id">,
    cb: (response: Omit<API.Response, "id">) => void
  ) => void;
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

  const obj = {
    value,
    send: (params: Omit<API.Request, "id">) => {
      window.api.send(params);
    },
    request: (
      params: Omit<API.Request, "id">
    ): Promise<Omit<API.Response, "id">> => {
      return window.api.request(params);
    },
    manager: (
      params: Omit<API.Request, "id">
    ): Promise<Omit<API.Response, "id">> => {
      return window.api.manager(params);
    },
  };

  return (
    <ApiContext.Provider value={obj}>{props.children}</ApiContext.Provider>
  );
};
