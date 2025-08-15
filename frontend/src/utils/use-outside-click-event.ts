"use client";

import { RefObject, useCallback, useEffect } from "react";

const useOutsideClickEvent = (
  refElement: RefObject<HTMLElement>,
  onOutsideClick: () => void,
) => {
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        refElement.current &&
        !refElement.current.contains(event?.target as any)
      ) {
        onOutsideClick();
      }
    },
    [onOutsideClick, refElement],
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);
};

export default useOutsideClickEvent;
