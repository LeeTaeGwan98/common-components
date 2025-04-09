import { cn } from "@/lib/utils";
import {
  type CommonLoginButtonPrsop,
  LoginButtonInteractiveTypeStyle1,
} from "@/components/common/Molecules/LoginButton/LoginButton";

function AnotherLoginButton({ className, ...props }: CommonLoginButtonPrsop) {
  return (
    <button
      className={cn(
        "w-full h-[48px] text-label-alternative text-label1-normal-bold underline rounded-large-button",
        LoginButtonInteractiveTypeStyle1,
        className
      )}
      onMouseUp={(e) => e.currentTarget.blur()}
      {...props}
    >
      다른 방법으로 로그인
    </button>
  );
}

export default AnotherLoginButton;
