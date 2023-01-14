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
      if (document.readyState === "complete") {
    if (itemsRef.current?.children[0].children) {
      console.log(itemsRef.current.children[0].children);
      
      for (const element of itemsRef.current.children[0].children) {
        
        const content = element.children[0] as HTMLDivElement;
        if (content.offsetHeight !== 0) {
          const newHeight = content.offsetHeight / 24;
          newItems[index] = { ...newItems[index], h: newHeight, minH: newHeight };          
          index++;
        }
      }
    }
  }

  return newItems;
};