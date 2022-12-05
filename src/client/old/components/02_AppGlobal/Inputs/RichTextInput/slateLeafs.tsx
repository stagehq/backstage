import { FC } from "react";

export type LeafType =
  | "bold"
  | "code"
  | "italic"
  | "strike_through"
  | "mention";
export const isLeafTypes = [
  "bold",
  "code",
  "italic",
  "strike_through",
  "mention",
];
export const leafMarkdownTable = [
  { type: "bold", notation: "*" },
  { type: "code", notation: "´" },
  { type: "italic", notation: "_" },
  { type: "strike_through", notation: "~" },
  { type: "mention", notation: "@" },
];

interface LeafProps {
  attributes: any;
  children: React.ReactNode;
  leaf: any;
}

export const Leaf: FC<LeafProps> = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = (
      <code className="bg-slate-100 px-2 p-1 rounded text-xs font-[jetBrainsMono]">
        {children}
      </code>
    );
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.strike_through) {
    children = <span className="line-through">{children}</span>;
  }

  if (leaf.mention) {
    children = (
      <span className="bg-blue-100 text-blue-900 px-1 rounded text-sm">
        {children}
      </span>
    );
  }

  return <span {...attributes}>{children}</span>;
};
