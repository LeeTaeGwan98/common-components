import { DetailCodeType } from "@/api/commonCode/commonCodeAPI";

//상세코드의 그룹코드 추출
export const codeToGetGroupCode = (code: string) => {
  return code.match(/^CO\d{3}/)?.[0] || "";
};

//상세코드를 이름으로 변환
export const codeToName = (codes: DetailCodeType[], detailCodeName: string) => {
  return (
    codes.find((code) => code.commDetailCode === detailCodeName)
      ?.detailCodeName ?? ""
  );
};
