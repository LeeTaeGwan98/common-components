import { cn } from "@/lib/utils";
import NaverLogo from "@/assets/svg/common/logoNaver.svg";
import {
  type CommonLoginButtonPrsop,
  LoginButtonInteractiveTypeStyle2,
} from "@/components/common/Molecules/LoginButton/LoginButton";

function NaverLoginButton({ className, ...props }: CommonLoginButtonPrsop) {
  return (
    <button
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
