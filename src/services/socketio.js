import React from "react";
import io from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { getAuth } from "firebase/auth";
import visibilityChangeHandler from "./visiblityCheck";

const useSocket = () => {
  const dispatch = useDispatch();
  const storeSocket = useSelector((state) => state.connection.socket);
  const isAuth = useSelector((state) => state.auth.isAuth);

  React.useEffect(() => {
    let i18nSocket;

    const [regVisibilityChangeListener, unRegVisibilityChangeListener] =
      visibilityChangeHandler(() => {
        console.log("visible");
        if (i18nSocket && i18nSocket.disconnected) {
          i18nSocket.connect();
        }
      }, null);

    if (isAuth && !storeSocket) {
      // if login, create socket
      i18nSocket = io.connect("https://i18n-manager.daniel-chan.ml/i18n", {
        // i18nSocket = io.connect("http://127.0.0.1:3001/i18n", {
        timeout: 2000,
      });
      dispatch.connection.setSocket({ socket: i18nSocket });

      // auth for further action
      i18nSocket.on("connect", async () => {
        // get token
        const auth = getAuth();
        const user = auth.currentUser;
        const token = await user?.getIdToken(true);
        // use the token to authenticate
        i18nSocket.emit("authentication", { token: token });
      });

      // authenticated, the socket is ready to use
      i18nSocket.on("authenticated", () => {
        console.log("You are authenticated to socket.io");
        dispatch.connection.setToConnected();
      });

      // connection error
      i18nSocket.on("connect_error", (error) => {
        console.log("Cannot connect to socket.io", error);
        dispatch.connection.setToDisconnected();
      });

      // disconnected, retry
      i18nSocket.on("disconnect", (reason) => {
        dispatch.connection.setToDisconnected();
        if (reason === "io server disconnect") {
          // the disconnection was initiated by the server, you need to reconnect manually
          i18nSocket.connect();
        }
        // else the socket will automatically try to reconnect
      });

      // reconnected
      i18nSocket.io.on("reconnect", (error) => {
        console.log("Reconnected");
        dispatch.connection.setToConnected();
      });

      i18nSocket.on("getI18nData", (response) => {
        console.log("getI18nData", response);
        dispatch.i18n.getProjectsData(response);
      });

      i18nSocket.on("createNewMainKey", (response) => {
        console.log("createNewMainKey", response);
        dispatch.i18n.createNewMainKey(response);
      });

      i18nSocket.on("changeMainKeyName", (response) => {
        console.log("changeMainKeyName", response);
        dispatch.i18n.changeMainKeyName(response);
      });

      i18nSocket.on("deleteMainKey", (response) => {
        console.log("deleteMainKey", response);
        dispatch.i18n.deleteMainKey(response);
      });

      i18nSocket.on("createNewNestedKey", (response) => {
        console.log("createNewNestedKey", response);
        dispatch.i18n.createNewNestedKey(response);
      });

      i18nSocket.on("updateNestedKey", (response) => {
        console.log("updateNestedKey", response);
        dispatch.i18n.updateNestedKey(response);
      });

      i18nSocket.on("updateNestedKeyValue", (response) => {
        console.log("updateNestedKeyValue", response);
        dispatch.i18n.updateNestedKeyValue(response);
      });

      i18nSocket.on("deleteNestedKeyValue", (response) => {
        console.log("deleteNestedKeyValue", response);
        dispatch.i18n.deleteNestedKeyValue(response);
      });
    } else {
      // logout, disconnect the socket
      i18nSocket?.close();
    }

    regVisibilityChangeListener();
    return () => {
      unRegVisibilityChangeListener();
    };
  }, [isAuth, storeSocket, dispatch]);
};

export default useSocket;
