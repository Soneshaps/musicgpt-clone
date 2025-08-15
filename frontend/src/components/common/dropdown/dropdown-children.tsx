import React, { FunctionComponent, ReactNode } from "react";

const DropDownChildren: FunctionComponent<{
  children: ReactNode;
  hideDropdown: () => void;
}> = ({ children, hideDropdown }) => {
  return (
    <>
      {React.Children.map(children, (child, index) =>
        React.isValidElement(child) ? (
          <span
            className="block whitespace-nowrap"
            key={index}
            onClick={async () => {
              if ((child.props as any)?.onClick) {
                await (child.props as any).onClick();
              }

              if (
                (child.props as any).className?.includes("dropdown-item") ||
                (child.props as any).className?.includes("tool-item")
              ) {
                hideDropdown();
              }
            }}
          >
            {child}
          </span>
        ) : null
      )}
    </>
  );
};

export default DropDownChildren;
