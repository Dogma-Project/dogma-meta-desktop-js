import { createContext, useEffect, useRef, useState } from "react";
import { API } from "@dogma-project/core-meta/types/types";
import { API_PATH } from "../const";

type ContextType = {
  isReady: number;
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

export const WebsocketContext = createContext<ContextType>({
  isReady: 0,
  value: null,
  send: () => null,
  request: () => null,
  manager: () => null,
});

export const ApiProvider = (props: {
  children: React.ReactNode;
  prefix: string;
}) => {
  const [isReady, setIsReady] = useState(0);
  const [value, setVal] = useState<Omit<API.Response, "id"> | null>(null);
  // const ws = useRef<Socket | null>(null);

  const ws = useRef<null>(null);

  useEffect(() => {
    // const socket = io(API_PATH, {
    //   path: "/io",
    // });

    // socket.on("connect", () => {
    //   setIsReady(1);
    // });
    // socket.on("disconnect", () => {
    //   setIsReady(0);
    // });
    // // socket.on("foo", onFooEvent);

    // socket.on("notify", (response: Omit<API.Response, "id">) => {
    //   setVal(response);
    // });

    // // handle errors

    // ws.current = socket;
  }, []);

  const obj = {
    isReady,
    value,
    send: (params: Omit<API.Request, "id">) => {
      // !!isReady &&
        // !!props.prefix &&
        // ws.current?.emit("push", {
        //   prefix: props.prefix,
        //   data: params,
        // });
    },
    request: (
      params: Omit<API.Request, "id">,
      cb: (response: Omit<API.Response, "id">) => void
    ) => {
      // !!isReady &&
        // !!props.prefix &&
        // ws.current?.emit(
        //   "request",
        //   {
        //     prefix: props.prefix,
        //     data: params,
        //   },
        //   cb
        // );
    },
    manager: (
      params: Omit<API.Request, "id">,
      cb: (response: Omit<API.Response, "id">) => void
    ) => {
      if (isReady) {
        // ws.current?.emit("manager", params, cb);
      }
    },
  };

  return (
    <WebsocketContext.Provider value={obj}>
      {props.children}
    </WebsocketContext.Provider>
  );
};
