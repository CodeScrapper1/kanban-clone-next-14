const { useEffect } = require("react");

const useEventListner = (eventName, handler) => {
  useEffect(() => {
    const eventListner = (e) => handler(e);

    document.addEventListener(eventName, eventListner);

    return () => {
      document.removeEventListener(eventName, eventListner);
    };
  }, [eventName, handler]);
};
export default useEventListner;
