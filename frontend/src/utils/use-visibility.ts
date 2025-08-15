import { useState } from "react";

const useVisibility = (initiallyVisible = false) => {
  const [isVisible, setIsVisible] = useState<boolean>(initiallyVisible);

  return {
    isVisible,
    hide: () => setIsVisible(false),
    show: () => setIsVisible(true),
    toggle: () => setIsVisible((isVisible) => !isVisible),
  };
};
export default useVisibility;
