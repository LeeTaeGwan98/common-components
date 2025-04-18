import { getGroupCodes } from "@/api/commonCode/commonCodeAPI";
import {
  tutorialThumbnailUpload,
  tutorialVideoUpload,
} from "@/api/tutorial/tutorialAPI";
import BreadcrumbContainer from "@/components/BreadcrumbContainer";
import OutlinedButton from "@/components/common/Atoms/Button/Outlined/OutlinedButton";
import Button from "@/components/common/Atoms/Button/Solid/Button";
import Divider from "@/components/common/Atoms/Divider/Divider";
import Segement from "@/components/common/Atoms/Segement/Segement";
import { customToast } from "@/components/common/Atoms/Toast/Toast";
import FileInput from "@/components/common/BookaroongAdmin/FileInput";
import Title from "@/components/common/BookaroongAdmin/Title";
import AdminTitle from "@/components/common/Molecules/AdminTitle/AdminTitle";
import SelectBox from "@/components/common/Molecules/SelectBox/SelectBox";
import TextField from "@/components/common/Molecules/TextField/TextField";
import ContentWrapper from "@/components/ContentWrapper";
import TutorialDelModal from "@/components/modal/tutorial/TutorialDelModal";
import { SelectContent, SelectItem } from "@/components/ui/select";
import {
  COMMON_GROUP_CODE_MAPPING,
  COMMON_GROUP_CODE_UNION_TYPE,
} from "@/Constants/CommonGroupCode";
import { useModalStore } from "@/store/modalStore";
import { SelectGroup } from "@radix-ui/react-select";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

interface TutorialDataStyleProps {
  type: "create" | "detail"; //등록/상세 여부
  //튜토리얼명
  tutorialName: string;
  setTutorialName: Dispatch<SetStateAction<string>>;
  //카테고리
  category: string;
  setCategory: Dispatch<SetStateAction<string>>;
  //영상 파일 아이디
  setVideoFileId: Dispatch<SetStateAction<number>>;
  //튜토리얼 썸네일 아이디
  setTutorialTumbnailId: Dispatch<SetStateAction<number>>;
  //비노출 여부
  isExposure: boolean;
  setIsNoExposure: Dispatch<SetStateAction<boolean>>;
  //삭제 버튼 클릭
  onclickDelete?: () => void;
  //저장 버튼 클릭
  onClickSave: () => void;
  // 저장되어 있는 썸네일 이름
  thumnailUploadedName?: string;
  // 저장되어 있는 비디오 이름
  videoUploadedName?: string;
  uploadedVideoUrl?: string | null;
}

function TutorialDataTemplate({
  type,
  tutorialName,
  setTutorialName,
  category,
  setCategory,
  setVideoFileId,
  setTutorialTumbnailId,
  isExposure,
  setIsNoExposure,
  onclickDelete,
  onClickSave,
  thumnailUploadedName,
  videoUploadedName,
  uploadedVideoUrl,
}: TutorialDataStyleProps) {
  const { id } = useParams(); // id 값 추출
  const [videoFile, setVideoFile] = useState<File | null>(null); //영상 파일
  const [tumbnailFile, setTumbnailFile] = useState<File | null>(null); //썸네일 파일
  //튜토리얼 공통 카테고리 가져오기
  const { data: codeInfo } = useSuspenseQuery({
    queryKey: [
      "chatbotCategoryGroupCodes",
      COMMON_GROUP_CODE_MAPPING.튜토리얼카테고리,
    ],
    queryFn: () => getGroupCodes([COMMON_GROUP_CODE_MAPPING.튜토리얼카테고리]),
    select: (data) => data.data.data,
  });
  const keys = Object.keys(codeInfo) as COMMON_GROUP_CODE_UNION_TYPE[];
  const categoryCodes = codeInfo[keys[0]]; // 카테고리 코드들

  //튜토리얼 비디오 업로드
  const { mutate: tutorialVideoUploadFn } = useMutation({
    mutationFn: (file: File) => tutorialVideoUpload(file),
    onSuccess(data) {
      setVideoFileId(data.data.data.fileId);
    },
    onError() {
      customToast({
        title: "튜토리얼 비디오 업로드중 에러가 발생했습니다.",
      });
    },
  });

  //튜토리얼 썸네일 업로드
  const { mutate: tutorialThumbnailUploadFn } = useMutation({
    mutationFn: (file: File) => tutorialThumbnailUpload(file),
    onSuccess(data) {
      setTutorialTumbnailId(data.data.data.fileId);
    },
    onError() {
      customToast({
        title: "튜토리얼 썸네일 업로드중 에러가 발생했습니다.",
      });
    },
  });

  //저장 버튼 활성화 여부
  const formValid = tumbnailFile && category && videoFile && tutorialName;

  // console.log(!formValid);

  //비디오
  const video = useMemo(() => {
    if (videoFile) {
      return (
        <video
          className="w-full h-[565px]"
          controls
          src={URL.createObjectURL(videoFile)}
        />
      );
    } else if (uploadedVideoUrl) {
      return (
        <video className="w-full h-[565px]" controls src={uploadedVideoUrl} />
      );
    }
    return null;
  }, [videoFile, uploadedVideoUrl]);

  //비디오 url 생성
  useEffect(() => {
    return () => {
      if (videoFile) {
        URL.revokeObjectURL(URL.createObjectURL(videoFile));
      }
    };
  }, [videoFile]);
  const { openModal } = useModalStore();

  const handleDeleteModal = () => {
    openModal(<TutorialDelModal id={Number(id)} />);
  };

  return (
    <BreadcrumbContainer
      breadcrumbNode={
        <div className="flex justify-center items-center">
          <>비디오북 관리 / 튜토리얼 관리</>
          <Divider vertical className="h-[20px] mx-[12px]" />
          <>{type === "detail" ? "상세" : "등록"}</>
        </div>
      }
      button={
        type === "detail" ? (
          <div>
            <Button
              className="w-[180px]"
              size="large"
              onClick={handleDeleteModal}
            >
              삭제
            </Button>
          </div>
        ) : (
          <></>
        )
      }
    >
      <ContentWrapper>
        {/* 튜토리얼명 */}
        <TextField
          label="튜토리얼명"
          placeholder="튜토리얼 제목을 입력해주세요"
          value={tutorialName}
          onChange={(e) => {
            setTutorialName(e.target.value);
          }}
          maxLength={30}
        />
        <div className="flex *:flex-1 gap-gutter-horizontal">
          {/* 카테고리 */}
          <SelectBox
            size="large"
            label="카테고리"
            placeholder="카테고리를 선택해주세요"
            value={category}
            onValueChange={(value) => {
              setCategory(value);
            }}
          >
            <SelectContent>
              <SelectGroup>
                {categoryCodes.map((code, index) => {
                  return (
                    <SelectItem key={index} value={code.commDetailCode}>
                      {code.detailCodeName}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </SelectBox>
          {/* 영상 파일 */}
          <FileInput
            accept="video/mp4"
            files={videoFile ? [videoFile] : []}
            setFiles={(files) => {
              if (Array.isArray(files) && files.length > 0) {
                setVideoFile(files[0]);
                //튜토리얼 영상 파일 업로드
                tutorialVideoUploadFn(files[0]);
              }
            }}
          >
            <TextField
              slot={{ inputClassName: "cursor-pointer -z-10" }}
              label="영상 파일"
              placeholder="파일을 첨부해주세요"
              readOnly={true}
              buttonElement={
                <OutlinedButton size="small" className="">
                  파일 업로드
                </OutlinedButton>
              }
              value={videoFile?.name ?? videoUploadedName ?? ""}
            />
          </FileInput>
        </div>
        <div className="flex *:flex-1 gap-gutter-horizontal">
          {/* 노출 상태 */}
          <div>
            <Title label={"노출 상태"} />
            <Segement
              className="w-full"
              itemClassName="text-body1-normal-medium"
              size="large"
              setSelected={setIsNoExposure}
              selected={isExposure}
              textList={["노출", "비노출"]}
            />
          </div>

          {/* 튜토리얼 썸네일 */}
          <FileInput
            accept="image/png,image/jpeg"
            files={tumbnailFile ? [tumbnailFile] : []}
            setFiles={(files) => {
              if (Array.isArray(files) && files.length > 0) {
                setTumbnailFile(files[0]);
                //튜토리얼 썸네일 업로드
                tutorialThumbnailUploadFn(files[0]);
              }
            }}
          >
            <TextField
              slot={{ inputClassName: "cursor-pointer" }}
              label="튜토리얼 썸네일"
              placeholder="파일을 첨부해주세요"
              readOnly={true}
              buttonElement={
                <OutlinedButton size="small">파일 업로드</OutlinedButton>
              }
              value={tumbnailFile?.name ?? thumnailUploadedName ?? ""}
            />
          </FileInput>
        </div>
        {/* 비디오 */}
        {video}
        {/* 하단 버튼 */}
        <div className="flex justify-end gap-[12px]">
          <OutlinedButton
            className="max-w-[180px] w-full"
            size="large"
            type="assistive"
          >
            취소
          </OutlinedButton>
          <OutlinedButton
            className="max-w-[180px] w-full"
            type="secondary"
            size="large"
            disable={!formValid}
            onClick={() => {
              if (!formValid) return;
              onClickSave();
            }}
          >
            저장
          </OutlinedButton>
        </div>
      </ContentWrapper>
    </BreadcrumbContainer>
  );
}

export default TutorialDataTemplate;
