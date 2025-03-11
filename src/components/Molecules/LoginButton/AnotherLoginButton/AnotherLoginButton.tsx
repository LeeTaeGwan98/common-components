import { cn } from "@/lib/utils";
import {
  CommonLoginButtonPrsop,
  LoginButtinInteractiveTypeStyle1,
} from "../LoginButton";

function AnotherLoginButton({
  onClick,
  className,
  ...props
}: CommonLoginButtonPrsop) {
  return (
    <button
      className={cn(
        "w-full h-[48px] text-label-alternative text-label-1-normal font-bold underline rounded-large-button",
        LoginButtinInteractiveTypeStyle1,
        className
      )}
      onClick={() => onClick()}
      onMouseUp={(e) => e.currentTarget.blur()}
      {...props}
    >
      다른 방법으로 로그인
    </button>
  );
}

export default AnotherLoginButton;
