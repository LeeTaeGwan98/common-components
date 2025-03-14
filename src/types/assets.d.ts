declare module "*.png" {
  const value: string;
  export default value;
}

declare module "*.svg" {
  const value: React.FC<React.SVGProps<SVGSVGElement>>;
  export default value;
}

// URL로 가져오는 SVG 모듈 선언 CustomToolbar.tsx에서 쓰임
declare module "*.svg?url" {
  const content: string;
  export default content;
}
