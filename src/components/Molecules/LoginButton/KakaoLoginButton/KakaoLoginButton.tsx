import { cn } from "@/lib/utils";
import KakaoLogo from "@/assets/svg/common/logoKakaoBlack.svg";
import {
  CommonLoginButtonPrsop,
  LoginButtonInteractiveTypeStyle2,
} from "../LoginButton";

function KakaoLoginButton({
  onClick,
  className,
  ...props
}: CommonLoginButtonPrsop) {
  return (
    <button
      onClick={() => onClick()}
      className={cn(
        "w-full h-[48px] relative bg-[#FEE500] rounded-large-button py-[10px] text-body1-normal-medium",
        LoginButtonInteractiveTypeStyle2,
        className
      )}
      onMouseUp={(e) => e.currentTarget.blur()}
      {...props}
    >
      <KakaoLogo className="absolute left-[24px]" />
      카카오 계정으로 로그인
    </button>
  );
}

export default KakaoLoginButton;
