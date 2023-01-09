import { RefObject } from "react";

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
  layout: LayoutType[],
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

export const initalData = [
  { i: "a", x: 0, y: 0, w: 2, h: 100 / 24, minW: 1, maxW: 3 },
  { i: "b", x: 0, y: 0, w: 1, h: 100 / 24, minW: 1, maxW: 3 },
  { i: "c", x: 0, y: 0, w: 2, h: 100 / 24, minW: 1, maxW: 3 },
];

export const demoData = {
  title: "Title",
  subtitle:
    "I have a similar situation where I'm trying to integrate the react-grid-layout into my project with a variable number of widgets. Each widget loads with a spinner and then fetches data from different endpoints that result in variable size content.",
};
