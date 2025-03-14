import Button from "@/components/common/Atoms/Button/Solid/Button";
import TextField from "@/components/common/Molecules/TextField/TextField";
import { useState, KeyboardEvent } from "react";

function Login() {
  const [idField, setIdField] = useState("");
  const [passwordField, setPasswordField] = useState("");

  const isFieldCheck = idField !== "" && passwordField !== "";

  const handleMessage = () => {
    console.log("로그인 버튼 클릭");
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && isFieldCheck) {
      handleMessage();
    }
  };

  const handleButtonKeyPress = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" && isFieldCheck) {
      handleMessage();
    }
  };

  return (
    <div className="flex h-screen">
      <div className="flex flex-1 bg-primary-normal/[0.08] p-8 items-center justify-center sm:hidden">
        <div className="flex flex-col justify-between items-center h-full">
          {/* 중앙 정렬된 콘텐츠 */}
          <div className="flex flex-col items-center flex-grow justify-center">
            <img src="src/assets/gif/loginback.gif" />
            <div className="text-primary-normal text-heading3-bold text-[30px] flex items-center justify-center mb-[12px]">
              북카롱 통합 관리자
            </div>
            <div className="flex items-center justify-center text-label-neutral text-body1-reading-regular">
              전자책 출판, 비디오북 제작부터 실시간 모니터링까지
            </div>
            <span className="flex items-center justify-center text-label-neutral text-body1-reading-regular">
              통합 대시보드를 통해 간편하게 관리해보세요
            </span>
          </div>

          {/* 하단에 위치한 Copyright */}
          <span className="text-label-assistive text-body1-reading-regular">
            2025. Copyright© by ITSY. All rights reserved
          </span>
        </div>
      </div>
      <div className="flex-1 bg-Background/Normal/Normal p-8 flex items-center justify-center">
        <div className="w-[400px]">
          <div className="mb-[16px] text-subtitle1-bold relative flex items-center gap-2">
            북카롱(Bookarong) 관리자 페이지
            <span className="flex-1 h-[1px] bg-primary-normal"></span>
          </div>

          <div className="flex flex-col gap-[16px]">
            <TextField
              value={idField}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setIdField(e.target.value);
              }}
              isVisible={false}
              placeholder="이메일을 입력해주세요"
              label="아이디"
              maxLength={20}
              style={{
                borderRadius: "4px",
              }}
              onKeyDown={handleKeyPress}
            />
            <TextField
              value={passwordField}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setPasswordField(e.target.value);
              }}
              isVisible={false}
              placeholder="비밀번호를 입력해주세요"
              label="비밀번호"
              type="password"
              maxLength={20}
              style={{
                borderRadius: "4px",
              }}
              onKeyDown={handleKeyPress}
            />
          </div>
          <Button
            className={`w-[400px] h-[48px] mt-[16px] text-body1-normal-bold rounded-radius-admin ${
              isFieldCheck
                ? "bg-primary-normal"
                : "bg-interaction-disable text-label-assistive cursor-not-allowed"
            }`}
            disabled={!isFieldCheck}
            onClick={handleMessage}
            onKeyDown={handleButtonKeyPress}
          >
            관리자 로그인
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Login;
