import HomeIcon from "@/assets/svg/Sidebar/Home.svg";
import User from "@/assets/svg/Sidebar/User.svg";
import BookIcon from "@/assets/svg/Sidebar/Book.svg";
import VideioIcon from "@/assets/svg/Sidebar/Videobook.svg";
import BoardIcon from "@/assets/svg/Sidebar/Board.svg";
import Manager from "@/assets/svg/Sidebar/Manager.svg";
import {
  ACCOUNT,
  CHARGING,
  CHATBOT,
  COMMON_CODE,
  COVER,
  INQUIRY,
  MAIN,
  NOTICE,
  PAY,
  PLAN,
  PUBLISH_LIST,
  SERVICE_GUIDE,
  TEMPLATE,
  TERMS,
  TUTORIAL,
  USER_LIST,
  VIDEOIMAGE,
  WITHDRAWL_REASON,
} from "@/Constants/ServiceUrl";

enum MENU_CODE {
  회원관리 = "CO003001",
  전자책관리 = "CO003002",
  비디오북관리 = "CO003003",
  게시판관리 = "CO003004",
  약관관리 = "CO003005",
  공통코드관리 = "CO003006",
  관리자계정관리 = "CO003007",
}

const SIDEBAR_MENU_ITEM = [
  {
    title: "메인",
    icon: <HomeIcon />,
    path: MAIN,
    child: [],
  },
  {
    title: "회원 관리",
    icon: <User />,
    path: USER_LIST,
    code: MENU_CODE.회원관리,
    child: [
      {
        title: "회원 목록",
        path: USER_LIST,
      },
      {
        title: "결제 관리",
        path: PAY,
      },
      {
        title: "탈퇴 사유 관리",
        path: WITHDRAWL_REASON,
      },
    ],
  },
  {
    title: "전자책 관리",
    icon: <BookIcon />,
    path: PUBLISH_LIST,
    code: MENU_CODE.전자책관리,
    child: [
      {
        title: "출판 목록",
        path: PUBLISH_LIST,
      },
      {
        title: "표지 관리",
        path: COVER,
      },
      {
        title: "충전소 관리",
        path: CHARGING,
      },
    ],
  },
  {
    title: "비디오북 관리",
    icon: <VideioIcon />,
    path: PLAN,
    code: MENU_CODE.비디오북관리,
    child: [
      {
        title: "플랜 관리",
        path: PLAN,
      },
      {
        title: "튜토리얼 관리",
        path: TUTORIAL,
      },
      {
        title: "템플릿 관리",
        path: TEMPLATE,
      },
      {
        title: "무료 이미지 관리",
        path: VIDEOIMAGE,
      },
    ],
  },
  {
    title: "게시판 관리",
    icon: <BoardIcon />,
    path: INQUIRY,
    code: MENU_CODE.게시판관리,
    child: [
      {
        title: "1:1 문의",
        path: INQUIRY,
      },
      {
        title: "공지사항",
        path: NOTICE,
      },
      {
        title: "서비스 가이드",
        path: SERVICE_GUIDE,
      },
      {
        title: "쳇봇 관리",
        path: CHATBOT,
      },
    ],
  },
  {
    title: "관리자",
    icon: <Manager />,
    path: TERMS,
    child: [
      {
        title: "약관 관리",
        path: TERMS,
        code: MENU_CODE.약관관리,
      },
      {
        title: "계정 관리",
        path: ACCOUNT,
        code: MENU_CODE.관리자계정관리,
      },
      {
        title: "공통 코드 관리",
        path: COMMON_CODE,
        code: MENU_CODE.공통코드관리,
      },
    ],
  },
];

export default SIDEBAR_MENU_ITEM;
