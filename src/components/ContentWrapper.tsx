import { ReactNode } from "react";

interface ContentWrapperProps {
  children: ReactNode;
}

function ContentWrapper({ children }: ContentWrapperProps) {
  return (
    <div className="max-w-[1100px] flex justify-center w-full flex-col px-margin gap-gutter-vertical mx-auto">
      {children}
    </div>
  );
}

export default ContentWrapper;
