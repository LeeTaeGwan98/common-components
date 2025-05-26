import { cn } from "@/lib/utils";
import AppleLogo from "@/assets/svg/common/logoAppleWhite.svg";
import {
  type CommonLoginButtonPrsop,
  LoginButtonInteractiveTypeStyle1,
} from "@/components/common/Molecules/LoginButton/LoginButton";

function AppleLoginButton({
  onClick,
  className,
  ...props
}: CommonLoginButtonPrsop) {
  return (
    <button
      className={cn(
        "w-full h-[48px] relative bg-black rounded-large-button py-[10px] text-body-1-normal text-[white]",
        LoginButtonInteractiveTypeStyle1,
        className
      )}
      onMouseUp={(e) => e.currentTarget.blur()}
      {...props}
    >
      <AppleLogo className="absolute left-[24px]" />
      Apple 계정으로 로그인
    </button>
  );
}

export default AppleLoginButton;
