var hidden, visibilityChange;
if (typeof document.hidden !== "undefined") {
  // Opera 12.10 and Firefox 18 and later support
  hidden = "hidden";
  visibilityChange = "visibilitychange";
} else if (typeof document.msHidden !== "undefined") {
  hidden = "msHidden";
  visibilityChange = "msvisibilitychange";
} else if (typeof document.webkitHidden !== "undefined") {
  hidden = "webkitHidden";
  visibilityChange = "webkitvisibilitychange";
}

const handleVisibilityChange = (ifVisible, ifInvisible) => {
  if (document[hidden]) {
    if (ifInvisible) {
      ifInvisible();
    }
  } else {
    if (ifVisible) {
      ifVisible();
    }
  }
};
const visibilityChangeHandler = (ifVisible, ifInvisible) => {
  const listener = () => handleVisibilityChange(ifVisible, ifInvisible);

  const registerListener = () => {
    console.log("registerListener");
    document.addEventListener(visibilityChange, listener, false);
  };

  const unRegisterListener = () => {
    console.log("unRegisterListener");
    document.removeEventListener(visibilityChange, listener, false);
  };

  console.log("register", registerListener, "unRegister", unRegisterListener);
  return [registerListener, unRegisterListener];
};

export default visibilityChangeHandler;
