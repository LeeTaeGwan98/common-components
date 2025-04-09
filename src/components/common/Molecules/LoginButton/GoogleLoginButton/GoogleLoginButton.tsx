import { cn } from "@/lib/utils";
import GoogleLogo from "@/assets/svg/common/logoGoogleColor.svg";
import {
  type CommonLoginButtonPrsop,
  LoginButtonInteractiveTypeStyle1,
} from "@/components/common/Molecules/LoginButton/LoginButton";

function GoogleLoginButton({ className, ...props }: CommonLoginButtonPrsop) {
  return (
    <button
      className={cn(
        "w-full h-[48px] relative border-[1px] rounded-large-button py-[10px] border-label-disable text-body1-normal-medium",
        LoginButtonInteractiveTypeStyle1,
        className
      )}
      onMouseUp={(e) => e.currentTarget.blur()}
      {...props}
    >
      <GoogleLogo width="24" height="24" className="absolute left-[24px]" />
      Google 계정으로 로그인
    </button>
  );
}

export default GoogleLoginButton;
