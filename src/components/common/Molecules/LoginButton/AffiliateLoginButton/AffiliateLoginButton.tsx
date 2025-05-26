import { cn } from "@/lib/utils";
import PersonIcon from "@/assets/svg/common/persons.svg";
import {
  type CommonLoginButtonPrsop,
  LoginButtonInteractiveTypeStyle1,
} from "@/components/common/Molecules/LoginButton/LoginButton";

function AffiliateLoginButton({
  onClick,
  className,
  ...props
}: CommonLoginButtonPrsop) {
  return (
    <button
      className={cn(
        "w-full relative border-[1px] rounded-large-button py-[10px] border-label-disable text-body1-normal-medium",
        LoginButtonInteractiveTypeStyle1,
        className
      )}
      onMouseUp={(e) => e.currentTarget.blur()}
      {...props}
    >
      <PersonIcon
        width="24"
        height="24"
        className="absolute left-[24px] fill-[#6B39F6]"
      />
      제휴·단체 계정으로 로그인
    </button>
  );
}

export default AffiliateLoginButton;
