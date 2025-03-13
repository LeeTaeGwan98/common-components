// 간격 설정 / 사용방법 ex) p-screenRsponsive-xs-margin
// https://www.figma.com/design/FWqkzrbBBd96Fcb3ftzwDl/%EA%B3%B5%ED%86%B5-%EB%94%94%EC%9E%90%EC%9D%B8-%EC%8B%9C%EC%8A%A4%ED%85%9C?node-id=2892-677060&t=DZWVeH09Ti0cuQlF-4

const spacing = {
  // APP Responsive
  "screenRsponsive-xs-margin": "16px",
  "screenRsponsive-xs-gutter-horizon": "8px",
  "screenRsponsive-xs-gutter-vertical": "20px",
  "screenRsponsive-sm-margin": "16px",
  "screenRsponsive-sm-gutter-horizon": "8px",
  "screenRsponsive-sm-gutter-vertical": "20px",
  "screenRsponsive-md-margin": "24px",
  "screenRsponsive-md-gutter-horizon": "16px",
  "screenRsponsive-md-gutter-vertical": "28px",
  "screenRsponsive-lg-margin": "24px",
  "screenRsponsive-lg-gutter-horizon": "20px",
  "screenRsponsive-lg-gutter-vertical": "32px",

  // Space
  "space-default": "20px",
  "space-top-vertical": "88px", // 탑네비게이션이 없는 상태의 타이틀 공간입니다.
  "space-bottom-vertical": "32px", // 하단의 빈공간입니다.
  "space-title-vertical": "32px", // 타이틀 상,하 공간입니다.
  "space-toast-vertical": "8px", // 토스트와 토스트 사이 값입니다.
  "space-toastBottom-vertical": "12px", // 토스트와 바텀네비게이션, 메인액션 버튼 사이 값입니다.
  "space-button-vertical": "8px", // 버튼과 버튼 사이 값입니다.
  "space-control": "16px", // 컨트롤과 컨트롤 사이 값입니다.
  "space-buttonIcon": "16px", // 아이콘버튼과 아이콘버튼 사이 값입니다.
  "space-adminDefault": "48px",

  // Size
  "size-divider": "24px",
  "size-image-max": "480px",
  "size-content-max-width": "600px",
  "size-content-min-width": "200px",
  "size-desktop-max-width": "1100px",
  "size-xs-min-width": "328px",
  "size-sm-min-width": "552px",
  "size-md-min-width": "874px",
  "size-lg-min-width": "784px",

  // Web Responsive
  top: "var(--top)",
  bottom: "var(--bottom)",
  margin: "var(--margin)",
  "content-horizon-margin": "var(--content-horizon-margin)",
  "content-vertical-margin": "var(--content-vertical-margin)",
  "dialog-max-width": "var(--dialog-max-width)",
  "dialog-height": "var(--dialog-height)",
  "gutter-horizon": "var(--gutter-horizon)",
  "gutter-vertical": "var(--gutter-vertical)",
  "table-min-width": "var(--table-min-width)",
  "detailTable-min-width": "var(--detailTable-min-width)",
  "tableText-min-width": "var(--tableText-min-width)",
};

export default spacing;

// Todo: Wep Responsive부분은 추후 추가
