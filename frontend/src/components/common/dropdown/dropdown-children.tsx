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
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              if ((child.props as any)?.onClick) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                await (child.props as any).onClick();
              }

              if (
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (child.props as any).className?.includes("dropdown-item") ||
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
