export interface TransportItem {
  type: "subway" | "bus";
  text: string;
  description: string;
}

export interface InfoItem {
  title: string;
  content: string[] | TransportItem[];
  isTransport?: boolean;
}

export const hospitalInfo: InfoItem[] = [
  {
    title: "주소",
    content: ["서울특별시 성북구 성북로 11"],
  },
  {
    title: "전화번호",
    content: ["02-123-4567"],
  },
  {
    title: "교통편",
    isTransport: true,
    content: [
      {
        type: "subway",
        text: "4호선",
        description: "한성대입구역 하차",
      },
      {
        type: "bus",
        text: "147번",
        description: "한성대입구역 하차",
      },
      {
        type: "bus",
        text: "341번",
        description: "한성대입구역 하차",
      },
      {
        type: "bus",
        text: "360번",
        description: "한성대입구역 하차",
      },
    ],
  },
];
