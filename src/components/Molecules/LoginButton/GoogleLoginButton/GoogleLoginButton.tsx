import { cn } from "@/lib/utils";
import GoogleLogo from "@/assets/svg/logoGoogleColor.svg";
import {
  CommonLoginButtonPrsop,
  LoginButtinInteractiveTypeStyle1,
} from "@/stories/Molecules/LoginButton/LoginButton";

function GoogleLoginButton({
  onClick,
  className,
  ...props
}: CommonLoginButtonPrsop) {
  return (
    <button
      onClick={() => onClick()}
      className={cn(
        "w-full h-[48px] relative border-[1px] rounded-large-button py-[10px] border-color-alias-label-disable text-body-1-normal font-medium",
        LoginButtinInteractiveTypeStyle1,
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
