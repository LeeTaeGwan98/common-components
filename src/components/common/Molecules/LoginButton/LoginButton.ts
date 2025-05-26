import { ButtonHTMLAttributes } from "react";

export interface CommonLoginButtonPrsop
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export const LoginButtonInteractiveTypeStyle1 =
  "hover:bg-label-normal/normal-hover focus:bg-label-normal/normal-focus active:bg-label-normal/normal-active";

export const LoginButtonInteractiveTypeStyle2 =
  "hover:brightness-hover focus:brightness-focus active:brightness-active";
