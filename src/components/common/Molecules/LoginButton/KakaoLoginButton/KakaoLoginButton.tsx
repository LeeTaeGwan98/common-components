import { cn } from "@/lib/utils";
import KakaoLogo from "@/assets/svg/common/logoKakaoBlack.svg";
import {
  type CommonLoginButtonPrsop,
  LoginButtonInteractiveTypeStyle2,
} from "@/components/common/Molecules/LoginButton/LoginButton";

function KakaoLoginButton({
  // onClick,
  className,
  ...props
}: CommonLoginButtonPrsop) {
  return (
    <button
      className={cn(
        "w-full h-[48px] relative bg-[#FEE500] rounded-large-button py-[10px] text-body1-normal-medium",
        LoginButtonInteractiveTypeStyle2,
        className
      )}
      onMouseUp={(e) => e.currentTarget.blur()}
      {...props}
    >
      <KakaoLogo className="absolute left-[24px] size-[24px]" />
      카카오 계정으로 로그인
    </button>
  );
}

export default KakaoLoginButton;
