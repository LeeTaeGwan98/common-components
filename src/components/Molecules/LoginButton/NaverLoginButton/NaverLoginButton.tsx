import { cn } from "@/lib/utils";
import NaverLogo from "@/assets/svg/logoNaver.svg";
import {
  CommonLoginButtonPrsop,
  LoginButtonInteractiveTypeStyle2,
} from "../LoginButton";

function NaverLoginButton({
  onClick,
  className,
  ...props
}: CommonLoginButtonPrsop) {
  return (
    <button
      onClick={() => onClick()}
      className={cn(
        "w-full h-[48px] relative bg-[#03CF5D] rounded-large-button py-[10px] text-body-1-normal text-[white]",
        LoginButtonInteractiveTypeStyle2,
        className
      )}
      onMouseUp={(e) => e.currentTarget.blur()}
      {...props}
    >
      <NaverLogo className="absolute left-[24px] fill-[#fff]" />
      네이버 계정으로 로그인
    </button>
  );
}

export default NaverLoginButton;
