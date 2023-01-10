import { RefObject } from "react";
import { Layout } from "react-grid-layout";

export interface LayoutType {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  minW: number;
  maxW: number;
}

export const updateLayout = (
  layout: Layout[],
  itemsRef: RefObject<HTMLDivElement>
) => {
  let index = 0;
  const newItems = [...layout];

  console.log(layout);

  if (document.readyState === "complete") {
    if (itemsRef.current?.children[1].children) {
      for (const element of itemsRef.current.children[1].children) {
        const content = element.children[0] as HTMLDivElement;
        if (content.offsetHeight !== 0) {
          const newHeight = content.offsetHeight / 24;
          newItems[index] = { ...newItems[index], h: newHeight };
          index++;
        }
      }
    }
  }
  return newItems;
};

export const initalData = {
    sm: [  { i: "a", x: 0, y: 1, w: 2, h: 100 / 24, minW: 1, maxW: 3 },
  { i: "b", x: 1, y: 2, w: 1, h: 100 / 24, minW: 1, maxW: 3 },
  { i: "c", x: 2, y: 3, w: 2, h: 100 / 24, minW: 1, maxW: 3 }],
    md: [  { i: "a", x: 0, y: 1, w: 2, h: 100 / 24, minW: 1, maxW: 3 },
  { i: "b", x: 1, y: 2, w: 1, h: 100 / 24, minW: 1, maxW: 3 },
  { i: "c", x: 2, y: 3, w: 2, h: 100 / 24, minW: 1, maxW: 3 }],
    lg: [  { i: "a", x: 0, y: 1, w: 2, h: 100 / 24, minW: 1, maxW: 3 },
  { i: "b", x: 1, y: 2, w: 1, h: 100 / 24, minW: 1, maxW: 3 },
  { i: "c", x: 2, y: 3, w: 2, h: 100 / 24, minW: 1, maxW: 3 }]
}

export const demoData = {
  title: "Title",
  subtitle:
    "I have a similar situation where I'm trying to integrate the react-grid-layout into my project with a variable number of widgets. Each widget loads with a spinner and then fetches data from different endpoints that result in variable size content.",
};
