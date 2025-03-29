import BreadcrumbContainer from "@/components/BreadcrumbContainer";
import IconButton from "@/components/common/Atoms/Button/IconButton/IconButton";
import {
  TableContainer,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/common/Tables";
import { Link } from "react-router-dom";
import { CHATBOT_DETAIL, CHATBOT_REGISTRATION } from "@/Constants/ServiceUrl";
import ThreeDot from "@/assets/svg/common/threeDot.svg";
import ExcelImage from "@/assets/Image/Excel.png";
import Button from "@/components/common/Atoms/Button/Solid/Button";
import SelectBox from "@/components/common/Molecules/SelectBox/SelectBox";
import { SelectContent, SelectGroup, SelectItem } from "@/components/ui/select";
import TextField from "@/components/common/Molecules/TextField/TextField";
import { useState } from "react";

const data = [
  {
    genre: "열두글자열두글자열두글자",
    category: "열두글자열두글자열두글자",
    question: "문의제목문의제목문의제목문의제목",
    answer: "문의답변문의답변문의답변문의답변 ",
    state: "exposure",
  },
  {
    genre: "열두글자열두글자열두글자",
    category: "열두글자열두글자열두글자",
    question: "문의제목문의제목문의제목문의제목",
    answer: "문의답변문의답변문의답변문의답변 ",
    state: "nonExposure",
  },
];
const Chatbot = () => {
  const [searchWord, setSearchWord] = useState<string>("");
  return (
    <BreadcrumbContainer
      breadcrumbNode={<>게시판 관리 / 챗봇 관리</>}
      button={
        <Link to={CHATBOT_REGISTRATION}>
          <Button className="rounded-radius-admin w-[180px] h-[48px]">
            등록
          </Button>
        </Link>
      }
    >
      <div className="flex justify-end gap-[12px] mb-[12px]">
        <SelectBox
          placeholder="모든 상태"
          className="w-[240px]"
          size="large"
          defaultValue="ALL"
        >
          <SelectContent>
            <SelectGroup>
              <SelectItem value="ALL">모든상태</SelectItem>
              <SelectItem value="true">노출</SelectItem>
              <SelectItem value="false">비노출</SelectItem>
            </SelectGroup>
          </SelectContent>
        </SelectBox>

        <div className="w-[240px]">
          <TextField
            value={searchWord}
            onChange={(e) => {
              setSearchWord(e.target.value);
            }}
            onKeyDown={() => {}}
            searchIcon
            placeholder="검색어를 입력해주세요"
          />
        </div>

        <SelectBox
          placeholder="10개 씩"
          className="w-[108px]"
          size="large"
          defaultValue="10"
        >
          <SelectContent>
            <SelectGroup>
              <SelectItem value="10">10개 씩</SelectItem>
              <SelectItem value="20">20개 씩</SelectItem>
              <SelectItem value="30">30개 씩</SelectItem>
            </SelectGroup>
          </SelectContent>
        </SelectBox>

        <button>
          <img src={ExcelImage} className="size-[48px]" />
        </button>
      </div>

      <TableContainer>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell isHeader>유형</TableCell>
              <TableCell isHeader>카테고리</TableCell>
              <TableCell isHeader>질문</TableCell>
              <TableCell isHeader>답변</TableCell>
              <TableCell isHeader>상태</TableCell>
              <TableCell isHeader>상세정보</TableCell>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.map((item) => {
              return (
                <TableRow>
                  <TableCell>{item.genre}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.question}</TableCell>
                  <TableCell>{item.answer}</TableCell>

                  <TableCell>
                    {(() => {
                      switch (item.state) {
                        case "exposure":
                          return (
                            <div className="w-full flex justify-center items-center">
                              <div className="w-fit border border-none rounded-[4px] py-[6px] px-[12px] bg-primary-normal/10 text-label1-normal-bold text-primary-normal">
                                노출
                              </div>
                            </div>
                          );
                        case "nonExposure":
                          return (
                            <div className="w-full flex justify-center items-center">
                              <div className="w-fit border border-none rounded-[4px] py-[6px] px-[12px] bg-fill-normal text-label1-normal-bold text-label-alternative">
                                비노출
                              </div>
                            </div>
                          );

                        default:
                          return null;
                      }
                    })()}
                  </TableCell>

                  <TableCell>
                    <Link to={CHATBOT_DETAIL}>
                      <IconButton
                        icon={
                          <ThreeDot className="size-[24px] fill-label-alternative" />
                        }
                      />
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </BreadcrumbContainer>
  );
};

export default Chatbot;
