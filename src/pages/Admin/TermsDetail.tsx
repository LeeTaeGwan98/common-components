import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getDetailTermsList, patchTermsList } from "@/api/terms";
import BreadcrumbContainer from "@/components/BreadcrumbContainer";
import Button from "@/components/common/Atoms/Button/Solid/Button";
import Divider from "@/components/common/Atoms/Divider/Divider";
import DatePicker from "@/components/common/Molecules/DatePicker/DatePicker";
import TextBox from "@/components/common/Molecules/TextBox/TextBox";
import TextField from "@/components/common/Molecules/TextField/TextField";
import SelectBox from "@/components/common/Molecules/SelectBox/SelectBox";
import { SelectContent, SelectGroup, SelectItem } from "@/components/ui/select";

function TermsDetail() {
  const { id } = useParams();

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["termsDetailGet", id],
    queryFn: () => getDetailTermsList(id),
    staleTime: 1000000000,
    gcTime: 1000000000,
  });

  const termInfo = data?.data.data;

  const [termsField, setTermsField] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [contentsField, setContentsField] = useState("");

  const PatchTerms = useMutation({
    mutationFn: (obj: { title: string; content: string }) =>
      patchTermsList(obj, id),
    onSuccess(res, obj) {
      console.log("patch 요청 성공", res);
      alert("저장이 완료되었습니다.");
    },
    onError(error) {
      console.error("patch 요청 실패", error);
      alert("저장에 실패했습니다.");
    },
  });

  return (
    <BreadcrumbContainer
      breadcrumbNode={
        <>
          관리자 / 약관 관리 <Divider vertical className="h-[20px] mx-[12px]" />{" "}
          상세
        </>
      }
    >
      <div className="flex w-full items-center justify-center text-label-alternative text-label1-normal-bold">
        <div className="w-[1004px]">
          {/* 구분 */}
          <SelectBox
            placeholder="약관 구분을 선택해주세요"
            className="min-w-[240px]"
            size="large"
            defaultValue="ALL"
            label="구분"
          >
            <SelectContent>
              <SelectGroup>
                <SelectItem value="ALL">모든상태</SelectItem>
                <SelectItem value="true">노출</SelectItem>
                <SelectItem value="false">비노출</SelectItem>
              </SelectGroup>
            </SelectContent>
          </SelectBox>
          {/* 이용약관명 */}
          <div className="gap-gutter-horizon">
            이용약관명
            <TextField
              className="w-full mt-[8px] border border-label-assistive rounded-radius-admin p-[12px] placeholder-label-assistive text-body1-normal-regular text-label-normal"
              placeholder="이용약관명을 입력해주세요"
              value={isLoading ? "" : termInfo?.title ?? ""}
              onChange={(e) => setTermsField(e.target.value)}
              isVisible={false}
            />
          </div>

          {/* 적용일 */}
          <div className="mt-[32px]">
            <div className="mb-[8px]">적용일</div>
            <DatePicker date={selectedDate} setDate={setSelectedDate} />
          </div>

          {/* 내용 */}
          <div className="mt-[32px]">
            <div className="mb-[8px]">내용</div>
            <TextBox
              className="h-[424px] border border-label-assistive rounded-radius-admin p-[12px] placeholder-label-assistive text-body1-normal-regular text-label-normal overflow-y-auto"
              placeholder="내용을 입력해주세요"
              value={isLoading ? "" : termInfo?.content ?? ""}
              onChange={(e) => setContentsField(e.target.value)}
            />
          </div>

          {/* 버튼 */}
          <div className="mt-[32px] flex justify-end space-x-4">
            <Button
              onClick={() => {
                console.log("취소 버튼 클릭");
              }}
              className="bg-white border border-line-normal-normal rounded-radius-admin w-[180px] h-[48px] text-label-normal text-body1-normal-medium"
            >
              취소
            </Button>

            <Button
              onClick={() => {
                if (!termsField?.trim() || !contentsField.trim()) {
                  alert("이용약관명과 내용을 입력해주세요.");
                  return;
                }

                PatchTerms.mutate({
                  title: termsField,
                  content: contentsField,
                });
              }}
              className="bg-white border border-line-normal-normal rounded-radius-admin w-[180px] h-[48px] text-primary-normal text-body1-normal-medium"
            >
              저장
            </Button>
          </div>
        </div>
      </div>
    </BreadcrumbContainer>
  );
}

export default TermsDetail;
