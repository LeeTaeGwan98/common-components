import HomeIcon from "@/assets/svg/Sidebar/Home.svg";
import User from "@/assets/svg/Sidebar/User.svg";
import BookIcon from "@/assets/svg/Sidebar/Book.svg";
import VideioIcon from "@/assets/svg/Sidebar/Videobook.svg";
import BoardIcon from "@/assets/svg/Sidebar/Board.svg";
import Manager from "@/assets/svg/Sidebar/Manager.svg";

const SIDEBAR_MENU_ITEM = [
  {
    title: "메인",
    icon: <HomeIcon />,
    path: "/main",
    child: [],
  },
  {
    title: "회원 관리",
    icon: <User />,
    path: "/user-list",
    child: [
      {
        title: "회원 목록",
        path: "/user-list",
      },
      {
        title: "결제 관리",
        path: "/pay",
      },
      {
        title: "탈퇴 사유 관리",
        path: "/withdraw-reasons",
      },
    ],
  },
  {
    title: "전자책 관리",
    icon: <BookIcon />,
    path: "/publish-list",
    child: [
      {
        title: "출판 목록",
        path: "/publish-list",
      },
      {
        title: "표지 관리",
        path: "/cover",
      },
      {
        title: "충전소 관리",
        path: "/charging",
      },
    ],
  },
  {
    title: "비디오북 관리",
    icon: <VideioIcon />,
    path: "/plan",
    child: [
      {
        title: "플랜 관리",
        path: "/plan",
      },
      {
        title: "튜토리얼 관리",
        path: "/tutorial",
      },
      {
        title: "템플릿 관리",
        path: "/template",
      },
    ],
  },
  {
    title: "게시판 관리",
    icon: <BoardIcon />,
    path: "/inquiry",
    child: [
      {
        title: "1:1 문의",
        path: "/inquiry",
      },
      {
        title: "공지사항",
        path: "/notice",
      },
      {
        title: "서비스 가이드",
        path: "/service-guide",
      },
      {
        title: "쳇봇 관리",
        path: "/chatbot",
      },
    ],
  },
  {
    title: "관리자",
    icon: <Manager />,
    path: "/terms",
    child: [
      {
        title: "약관 관리",
        path: "/terms",
      },
      {
        title: "계정 관리",
        path: "/account",
      },
      {
        title: "공통 코드 관리",
        path: "/common-code",
      },
    ],
  },
];

export default SIDEBAR_MENU_ITEM;
