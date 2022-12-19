import {
  Action,
  Actions,
  Cards,
  Header,
  List,
  Section,
  Seperator,
} from "@stagehq/ui";
import { Pills } from "@stagehq/ui/dist/components/Pills";
import clsx from "clsx";
import { FC, useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import ImageUpload from "../crop/ImageUpload";
import { Icon, IconEnum } from "../Icons";
import EditSidebarPortal from "./EditSidebarPortal";
import { PageAsidePortal, PageMainPortal } from "./PagePortal";
import {
  blogPosts,
  experience,
  openSource,
  spotify,
  university,
} from "./testData";
import { useRecoilState, useRecoilValue } from "recoil";
import { siteSlugState, siteState } from "../../store/site";

export enum SectionType {
  HEADER = "Header",
  EXTENSION = "Extension",
  FOOTER = "Footer",
}

export enum ExtensionAPIEnum {
  GITHUB = "GitHub",
  GITLAB = "GitLab",
  LINKEDIN = "LinkedIn",
  SPOTIFY = "Spotify",
  YOUTUBE = "YouTube",
  STACKOVERFLOW = "StackOverflow",
  TWITTER = "Twitter",
  DRIBBBLE = "Dribbble",
  MEDIUM = "Medium",
  DEVTO = "Dev.to",
}

export type ExtensionApis = ExtensionAPIEnum[];

export enum ExtensionPosition {
  MAIN = "Main",
  ASIDE = "Aside",
}

export interface Section {
  id: number;
  text: string;
  icon: IconEnum;
  type: SectionType;
  selected: boolean;
  locked: boolean;
  error?: string;
  apis?: ExtensionApis;
  position?: ExtensionPosition;
  component?: React.ReactNode;
}

export interface SectionListProps {
  sections: Section[];
}

const SectionList = () => {
  const [siteSlug, ] = useRecoilState(siteSlugState);
  const site = useRecoilValue(siteState(siteSlug));

  // sections state to be used in the list with website section names and ids
  const [sections, setSections] = useState<Section[]>([
    {
      id: 1,
      text: "Header",
      type: SectionType.HEADER,
      icon: "QueueListIcon",
      locked: true,
      selected: true,
    },
    {
      id: 2,
      text: "Footer",
      type: SectionType.FOOTER,
      icon: "QueueListIcon",
      locked: true,
      selected: false,
    },
  ]);

  useEffect(() => {
    console.log("sections", sections);
  }, [sections]);

  useEffect(() => {
    if(site?.extensions){
      site.extensions.map((extension) => {
        console.log(extension);
      })
    }
  }, [site]);

  // a little function to help us with reordering the result
  const reorder = (list: Section[], startIndex: number, endIndex: number) => {
    // if endIndex is the first or the last item, return the list
    if (endIndex === 0 || endIndex === list.length - 1) return list;

    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result: any) => {
    console.log("result", result);

    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const reorderedSections = reorder(
      sections,
      result.source.index,
      result.destination.index
    );

    // update the ids of the sections
    reorderedSections.forEach((section, index) => {
      section.id = index + 1;
    });

    setSections(reorderedSections);
  };

  const handleClick = (id: number) => {
    // if the section is not locked and not selected, set the selected section to true
    const newSections = sections.map((section) => {
      if (section.id === id) {
        return { ...section, selected: true };
      }
      return { ...section, selected: false };
    });

    setSections(newSections);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(droppableProvided, droppableSnapshot) => (
          <div
            ref={droppableProvided.innerRef}
            className="flex flex-col w-full h-full overflow-y-auto px-3"
            onScroll={(e) =>
              // eslint-disable-next-line no-console
              console.log("current scrollTop", e.currentTarget.scrollTop)
            }
          >
            {sections.map((section, index) => (
              <SectionItem
                section={section}
                index={index}
                key={section.id}
                onClick={() => handleClick(section.id)}
              />
            ))}
            {droppableProvided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default SectionList;

interface EditSectionHeaderProps {
  title: string;
}

const EditSectionHeader: FC<EditSectionHeaderProps> = ({ title }) => {
  return (
    <div className="flex justify-between items-center w-full h-10 pl-6 pr-[22px]">
      <p className="text-sm font-semibold text-left text-zinc-900">{title}</p>
    </div>
  );
};

interface EditSectionContentProps {
  children: React.ReactNode;
}

const EditSectionContent: FC<EditSectionContentProps> = ({ children }) => {
  return (
    <div className="flex flex-col w-full h-full pl-6 pr-[22px]">
      <div className="flex flex-col w-full h-full">{children}</div>
    </div>
  );
};

const HeaderSectionEditSidebar = () => {
  const [tagline, setTagline] = useState("");
  const [bio, setBio] = useState("");
  return (
    <div className="flex flex-col w-full h-full">
      <EditSectionHeader title="Data" />
      <EditSectionContent>
        {/* <ImageUpload /> */}

        <div className="mt-4 flex flex-col justify-start items-start gap-4">
          <ImageUpload />
          <div className="flex flex-col justify-start items-start gap-2 w-full">
            <div className="w-full">
              <label
                htmlFor="tagline"
                className="block text-sm font-medium text-zinc-600"
              >
                Tagline
              </label>
              <div className="mt-1 relative">
                <input
                  onChange={(e) => {
                    setTagline(e.target.value);
                  }}
                  value={tagline}
                  id="tagline"
                  name="tagline"
                  type="text"
                  autoComplete="tagline"
                  maxLength={65}
                  className="appearance-none block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm placeholder-zinc-400 focus:outline-none focus:ring-zinc-500 focus:border-zinc-500 sm:text-sm"
                />
              </div>
              <div className="flex justify-between items-start pt-2">
                <p className="text-xs text-left text-zinc-500">
                  Write a short tagline.
                </p>
                <p className="text-xs text-left text-zinc-500">
                  {tagline.length}/65
                </p>
              </div>
            </div>
          </div>
          <div className="w-full">
            <label
              htmlFor="bio"
              className="block text-sm font-medium text-zinc-600"
            >
              Bio
            </label>
            <div className="mt-1 relative">
              <textarea
                onChange={(e) => {
                  setBio(e.target.value);
                }}
                rows={5}
                value={bio}
                id="bio"
                name="bio"
                autoComplete="bio"
                maxLength={250}
                className="appearance-none block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm placeholder-zinc-400 focus:outline-none focus:ring-zinc-500 focus:border-zinc-500 sm:text-sm"
              />
            </div>
            <div className="flex justify-between items-start pt-2">
              <p className="text-xs text-left text-zinc-500">
                Write a few sentences about yourself.
              </p>
              <p className="text-xs text-left text-zinc-500">
                {bio.length}/250
              </p>
            </div>
          </div>
        </div>
      </EditSectionContent>
    </div>
  );
};

const ExtensionSectionEditSidebar = ({ apis }: { apis: ExtensionApis }) => {
  return (
    <div className="flex flex-col w-full h-full">
      <EditSectionHeader title="APIs" />
      <EditSectionContent>
        <ExtensionApisList apis={apis} />
      </EditSectionContent>
    </div>
  );
};

const FooterSectionEditSidebar = () => {
  return (
    <div className="flex flex-col w-full h-full">
      <EditSectionHeader title="Data" />
      <EditSectionContent>
        <span className="text-sm">footer edit data</span>
      </EditSectionContent>
    </div>
  );
};

const ExtensionApisList = ({ apis }: { apis: ExtensionApis }) => {
  return (
    <div className="flex flex-col w-full h-full">
      {apis.map((api) => (
        <ExtensionApiItem api={api} key={api} />
      ))}
    </div>
  );
};

const ExtensionApiItem = ({ api }: { api: ExtensionAPIEnum }) => {
  return (
    <div className="flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 h-9 relative overflow-hidden gap-3 rounded">
      {getAPIIcon(api)}
      <div className="flex justify-start items-center flex-grow relative gap-2">
        <p className="flex-grow-0 flex-shrink-0 text-xs font-medium text-left text-zinc-900 select-none">
          {api}
        </p>
      </div>
      <div className="flex justify-center items-center flex-grow-0 flex-shrink-0 w-6 h-6 relative gap-2">
        {getAPIConnectionState(api)}
      </div>
    </div>
  );
};

const SectionItem = ({
  section,
  index,
  onClick,
}: {
  section: Section;
  index: number;
  onClick: () => void;
}) => {
  const renderSectionEditSidebar = (section: Section) => {
    switch (section.type) {
      case SectionType.HEADER:
        return <HeaderSectionEditSidebar />;
      case SectionType.EXTENSION:
        return <ExtensionSectionEditSidebar apis={section.apis!} />;
      case SectionType.FOOTER:
        return <FooterSectionEditSidebar />;
      default:
        return <HeaderSectionEditSidebar />;
    }
  };

  return (
    <Draggable
      key={section.id}
      isDragDisabled={section.locked}
      draggableId={section.id.toString()}
      index={index}
    >
      {(draggableProvided, draggableSnapshot) => (
        <div
          ref={draggableProvided.innerRef}
          {...draggableProvided.draggableProps}
          {...draggableProvided.dragHandleProps}
          onClick={onClick}
          className={clsx(
            "flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 h-8 relative overflow-hidden gap-3 px-3 rounded mb-1 hover:cursor-pointer",
            section.selected ? "bg-zinc-100" : "bg-white"
          )}
        >
          <Icon name={section.icon} color={"dark"} size={"md"} />
          <div className="flex justify-start items-center flex-grow relative gap-2">
            <p className="flex-grow-0 flex-shrink-0 text-xs font-medium text-left text-zinc-900 select-none">
              {section.text}
            </p>
            <div className="flex justify-center items-center flex-grow-0 flex-shrink-0 w-3 h-3 gap-1.5 px-1.5">
              <div className="flex justify-start items-start flex-grow-0 flex-shrink-0 w-[10.5px] h-[10.5px] relative gap-[2.625px]">
                {section.locked && <LockedIcon />}
              </div>
            </div>
          </div>
          <div
            className={clsx(
              "items-center justify-center",
              section.locked ? "hidden" : "flex",
              section.selected ? "opacity-80" : "opacity-30"
            )}
          >
            {section.position === ExtensionPosition.ASIDE && (
              <DesktopSidebarIcon />
            )}
            <DragHandleIcon />
          </div>
          {section.component &&
            section.position &&
            section.position === ExtensionPosition.MAIN && (
              <PageMainPortal>
                <div
                  className={clsx(
                    section.selected &&
                      "before:block before:absolute before:right-0 before:shadow-[inset_6px_0_0_0_rgb(0,0,0)] before:-inset-2 before:border-l-4 before:border-zinc-900 before:bg-gradient-to-r from-zinc-400/10 to-transparent relative inline-block py-4 -my-4 -mx-24 px-24"
                  )}
                  style={{
                    clipPath:
                      "polygon(calc(100% - 6px) 0, 100% 0, 100% 100%, 0 100%, 0 0)",
                  }}
                >
                  {section.component}
                </div>
              </PageMainPortal>
            )}
          {section.component &&
            section.position &&
            section.position === ExtensionPosition.ASIDE && (
              <PageAsidePortal>
                <div
                  className={clsx(
                    section.selected &&
                      "before:block before:absolute before:left-0 before:shadow-[inset_-6px_0_0_0_rgb(0,0,0)] before:-inset-2 before:border-r-4 before:border-zinc-900 before:bg-gradient-to-l from-zinc-400/10 to-transparent relative inline-block py-4 -my-4 -mx-24 px-24"
                  )}
                  style={{
                    clipPath:
                      "polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 calc(100% - 6px))",
                  }}
                >
                  {section.component}
                </div>
              </PageAsidePortal>
            )}
          {section.selected && (
            <EditSidebarPortal>
              {renderSectionEditSidebar(section)}
            </EditSidebarPortal>
          )}
        </div>
      )}
    </Draggable>
  );
};

const LockedIcon = () => {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-grow-0 flex-shrink-0 w-[10.5px] h-[10.5px] relative"
      preserveAspectRatio="none"
    >
      <g clipPath="url(#clip0_341_28043)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6.00117 1.2749C5.3746 1.2749 4.77369 1.52381 4.33063 1.96686C3.88758 2.40992 3.63867 3.01083 3.63867 3.6374V5.4749H3.37617C3.09769 5.4749 2.83062 5.58553 2.63371 5.78244C2.4368 5.97935 2.32617 6.24642 2.32617 6.5249V9.6749C2.32617 9.95338 2.4368 10.2205 2.63371 10.4174C2.83062 10.6143 3.09769 10.7249 3.37617 10.7249H8.62617C8.90465 10.7249 9.17172 10.6143 9.36863 10.4174C9.56555 10.2205 9.67617 9.95338 9.67617 9.6749V6.5249C9.67617 6.24642 9.56555 5.97935 9.36863 5.78244C9.17172 5.58553 8.90465 5.4749 8.62617 5.4749H8.36367V3.6374C8.36367 3.01083 8.11477 2.40992 7.67171 1.96686C7.22866 1.52381 6.62775 1.2749 6.00117 1.2749V1.2749ZM7.57617 5.4749V3.6374C7.57617 3.21969 7.41023 2.81908 7.11487 2.52371C6.8195 2.22834 6.41889 2.0624 6.00117 2.0624C5.58346 2.0624 5.18285 2.22834 4.88748 2.52371C4.59211 2.81908 4.42617 3.21969 4.42617 3.6374V5.4749H7.57617Z"
          fill="#18181B"
        ></path>
      </g>
      <defs>
        <clipPath id="clip0_341_28043">
          <rect
            width="10.5"
            height="10.5"
            fill="white"
            transform="translate(0.75 0.75)"
          ></rect>
        </clipPath>
      </defs>
    </svg>
  );
};

const DragHandleIcon = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-grow-0 flex-shrink-0 w-5 h-5 relative"
      preserveAspectRatio="none"
    >
      <path
        d="M8.98454 14.0627C8.98454 14.6205 8.52673 15.0783 7.96891 15.0783C7.41109 15.0783 6.95329 14.6205 6.95329 14.0627C6.95329 13.5048 7.41109 13.047 7.96891 13.047C8.52673 13.047 8.98454 13.5048 8.98454 14.0627ZM6.95329 10.0002C6.95329 9.44234 7.41109 8.98454 7.96891 8.98454C8.52673 8.98454 8.98454 9.44234 8.98454 10.0002C8.98454 10.558 8.52673 11.0158 7.96891 11.0158C7.41109 11.0158 6.95329 10.558 6.95329 10.0002ZM6.95329 5.93766C6.95329 5.37984 7.41109 4.92204 7.96891 4.92204C8.52673 4.92204 8.98454 5.37984 8.98454 5.93766C8.98454 6.49548 8.52673 6.95329 7.96891 6.95329C7.41109 6.95329 6.95329 6.49548 6.95329 5.93766ZM13.047 5.93766C13.047 6.49548 12.5892 6.95329 12.0314 6.95329C11.4736 6.95329 11.0158 6.49548 11.0158 5.93766C11.0158 5.37984 11.4736 4.92204 12.0314 4.92204C12.5892 4.92204 13.047 5.37984 13.047 5.93766ZM11.0158 10.0002C11.0158 9.44234 11.4736 8.98454 12.0314 8.98454C12.5892 8.98454 13.047 9.44234 13.047 10.0002C13.047 10.558 12.5892 11.0158 12.0314 11.0158C11.4736 11.0158 11.0158 10.558 11.0158 10.0002ZM11.0158 14.0627C11.0158 13.5048 11.4736 13.047 12.0314 13.047C12.5892 13.047 13.047 13.5048 13.047 14.0627C13.047 14.6205 12.5892 15.0783 12.0314 15.0783C11.4736 15.0783 11.0158 14.6205 11.0158 14.0627Z"
        fill="#52525B"
        stroke="#52525B"
        strokeWidth="0.677083"
      ></path>
    </svg>
  );
};

const getAPIConnectionState = (api: ExtensionAPIEnum) => {
  // TODO: Get the connection state from the AP
  const randomTrueFalse = Math.random() >= 0.5;

  if (randomTrueFalse) {
    return <APIConnectedIcon />;
  } else {
    return <APIConnectButton />;
  }
};

const APIConnectedIcon = () => {
  return <Icon name="CheckCircleIcon" color="success" size="md" />;
};

const APIConnectButton = () => {
  return (
    <div className="flex items-center justify-center w-6 h-6 rounded hover:bg-gray-100">
      <Icon name="PlusSmallIcon" color="dark" size="md" />
    </div>
  );
};

const DesktopSidebarIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="none"
      viewBox="0 0 16 16"
    >
      <g stroke="#71717A" strokeWidth="1.031" clipPath="url(#clip0_403_32286)">
        <rect
          width="2.406"
          height="9.969"
          x="11.453"
          y="2.516"
          rx="0.859"
        ></rect>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2 7.5h6.875m0 0l-2.75-2.75m2.75 2.75l-2.75 2.75"
        ></path>
      </g>
      <defs>
        <clipPath id="clip0_403_32286">
          <path fill="#fff" d="M0 0H16V16H0z"></path>
        </clipPath>
      </defs>
    </svg>
  );
};

export const getAPIIcon = (api: ExtensionAPIEnum) => {
  switch (api) {
    case ExtensionAPIEnum.GITHUB:
      return <GithubIcon />;
    case ExtensionAPIEnum.GITLAB:
      return <GitlabIcon />;
    case ExtensionAPIEnum.SPOTIFY:
      return <SpotifyIcon />;
    case ExtensionAPIEnum.MEDIUM:
      return <MediumIcon />;
    case ExtensionAPIEnum.DEVTO:
      return <DevToIcon />;
    case ExtensionAPIEnum.TWITTER:
      return <TwitterIcon />;
    case ExtensionAPIEnum.DRIBBBLE:
      return <DribbbleIcon />;
    case ExtensionAPIEnum.STACKOVERFLOW:
      return <StackOverflowIcon />;
    case ExtensionAPIEnum.LINKEDIN:
      return <LinkedInIcon />;
    case ExtensionAPIEnum.YOUTUBE:
      return <YouTubeIcon />;
    default:
      return <DefaultAPIIcon />;
  }
};

const GithubIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        fill="#52525B"
        d="M12 2.4c-1.26 0-2.51.255-3.674.75a9.588 9.588 0 00-3.114 2.132A9.964 9.964 0 002.4 12.239c0 4.348 2.755 8.038 6.566 9.346.48.079.634-.226.634-.492v-1.662c-2.66.59-3.226-1.319-3.226-1.319-.441-1.141-1.065-1.446-1.065-1.446-.874-.61.067-.59.067-.59.96.069 1.469 1.013 1.469 1.013.835 1.495 2.246 1.053 2.793.817.087-.64.336-1.073.605-1.319-2.131-.246-4.368-1.092-4.368-4.84 0-1.092.365-1.968.989-2.666-.096-.246-.432-1.27.096-2.598 0 0 .806-.265 2.64 1.004a8.84 8.84 0 012.4-.325 8.84 8.84 0 012.4.325c1.833-1.27 2.64-1.004 2.64-1.004.528 1.328.192 2.352.096 2.598.624.698.989 1.574.989 2.666 0 3.758-2.247 4.584-4.387 4.83.345.305.662.906.662 1.82v2.696c0 .266.153.58.643.492 3.811-1.318 6.557-4.998 6.557-9.346a10.05 10.05 0 00-.73-3.765 9.857 9.857 0 00-2.082-3.192 9.588 9.588 0 00-3.114-2.133A9.399 9.399 0 0012 2.4z"
      ></path>
    </svg>
  );
};

const GitlabIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        fill="#52525B"
        d="M21 14.625l-8.212 5.683a1.36 1.36 0 01-1.576 0L3 14.625a1.395 1.395 0 01-.555-1.498l2.365-8.88a1.04 1.04 0 011.984-.094l1.784 4.773h6.844l1.784-4.773a1.04 1.04 0 011.984.095l2.365 8.879A1.396 1.396 0 0121 14.625z"
      ></path>
    </svg>
  );
};

const SpotifyIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        fill="#52525B"
        d="M17.9 10.9C14.7 9 9.35 8.8 6.3 9.75c-.5.15-1-.15-1.15-.6-.15-.5.15-1 .6-1.15 3.55-1.05 9.4-.85 13.1 1.35.45.25.6.85.35 1.3-.25.35-.85.5-1.3.25m-.1 2.8c-.25.35-.7.5-1.05.25-2.7-1.65-6.8-2.15-9.95-1.15-.4.1-.85-.1-.95-.5-.1-.4.1-.85.5-.95 3.65-1.1 8.15-.55 11.25 1.35.3.15.45.65.2 1zm-1.2 2.75c-.2.3-.55.4-.85.2-2.35-1.45-5.3-1.75-8.8-.95-.35.1-.65-.15-.75-.45-.1-.35.15-.65.45-.75 3.8-.85 7.1-.5 9.7 1.1.35.15.4.55.25.85zM12 2a10 10 0 100 20 10 10 0 000-20z"
      ></path>
    </svg>
  );
};

const MediumIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.75 12C12.75 15.5156 10.0594 18.375 6.75 18.375C3.44063 18.375 0.75 15.5156 0.75 12C0.75 8.48438 3.44063 5.625 6.75 5.625C10.0594 5.625 12.75 8.48438 12.75 12ZM22.5 6C22.3011 6 22.1103 6.07902 21.9697 6.21967C21.829 6.36032 21.75 6.55109 21.75 6.75V17.25C21.75 17.4489 21.829 17.6397 21.9697 17.7803C22.1103 17.921 22.3011 18 22.5 18C22.6989 18 22.8897 17.921 23.0303 17.7803C23.171 17.6397 23.25 17.4489 23.25 17.25V6.75C23.25 6.55109 23.171 6.36032 23.0303 6.21967C22.8897 6.07902 22.6989 6 22.5 6ZM17.25 6C16.7156 6 15.7125 6.2625 14.9719 7.99688C14.5031 9.075 14.25 10.5 14.25 12C14.25 13.5 14.5031 14.925 14.9719 16.0031C15.7125 17.7375 16.7156 18 17.25 18C17.7844 18 18.7875 17.7375 19.5281 16.0031C19.9969 14.925 20.25 13.5 20.25 12C20.25 10.5 19.9969 9.075 19.5281 7.99688C18.7875 6.2625 17.7844 6 17.25 6Z"
        fill="#52525B"
      />
    </svg>
  );
};

const DevToIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        fill="#52525B"
        d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM7.68 14.98H6V9h1.71c1.28 0 1.71 1.03 1.71 1.71v2.56c0 .68-.42 1.71-1.74 1.71zm4.7-3.52v1.07H11.2v1.39h1.93v1.07h-2.25c-.4.01-.74-.31-.75-.71V9.75c-.01-.4.31-.74.71-.75h2.28v1.07H11.2v1.39h1.18zm4.5 2.77c-.48 1.11-1.33.89-1.71 0L13.77 9h1.18l1.07 4.11L17.09 9h1.18l-1.39 5.23z"
      ></path>
      <path
        fill="#52525B"
        d="M7.77 10.12h-.63v3.77h.63c.14 0 .28-.05.42-.16.14-.1.21-.26.21-.47v-2.52c0-.21-.07-.37-.21-.47a.72.72 0 00-.42-.15z"
      ></path>
    </svg>
  );
};

const TwitterIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22.46 6C21.69 6.35 20.86 6.58 20 6.69C20.88 6.16 21.56 5.32 21.88 4.31C21.05 4.81 20.13 5.16 19.16 5.36C18.37 4.5 17.26 4 16 4C13.65 4 11.73 5.92 11.73 8.29C11.73 8.63 11.77 8.96 11.84 9.27C8.28004 9.09 5.11004 7.38 3.00004 4.79C2.63004 5.42 2.42004 6.16 2.42004 6.94C2.42004 8.43 3.17004 9.75 4.33004 10.5C3.62004 10.5 2.96004 10.3 2.38004 10V10.03C2.38004 12.11 3.86004 13.85 5.82004 14.24C5.19077 14.4122 4.53013 14.4362 3.89004 14.31C4.16165 15.1625 4.69358 15.9084 5.41106 16.4429C6.12854 16.9775 6.99549 17.2737 7.89004 17.29C6.37367 18.4904 4.49404 19.1393 2.56004 19.13C2.22004 19.13 1.88004 19.11 1.54004 19.07C3.44004 20.29 5.70004 21 8.12004 21C16 21 20.33 14.46 20.33 8.79C20.33 8.6 20.33 8.42 20.32 8.23C21.16 7.63 21.88 6.87 22.46 6V6Z"
        fill="#52525B"
      />
    </svg>
  );
};

const DribbbleIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22.1251 12.0567V12.0005C22.1243 10.4986 21.79 9.01556 21.1464 7.65856C20.5027 6.30156 19.5658 5.10442 18.4032 4.15359L18.347 4.10671L18.2626 4.05046C16.777 2.87789 14.9923 2.14558 13.1113 1.93677C11.2303 1.72795 9.32849 2.05101 7.62195 2.86921L7.48133 2.94421C6.10201 3.63423 4.89801 4.62941 3.96073 5.85421C3.02345 7.07901 2.37751 8.50125 2.07195 10.013C1.9384 10.667 1.87243 11.333 1.87508 12.0005C1.87689 13.5697 2.24274 15.1171 2.94387 16.521C3.645 17.9249 4.66228 19.1469 5.9157 20.0911C5.96493 20.1338 6.01832 20.1715 6.07508 20.2036H6.08445C7.40422 21.1567 8.93417 21.7779 10.5448 22.0145C12.1555 22.2511 13.7994 22.0962 15.3376 21.563L15.4595 21.5161C17.3979 20.8086 19.0745 19.5268 20.2655 17.8417C21.4565 16.1565 22.1052 14.1483 22.1251 12.0848V12.0567ZM19.8001 10.8755H19.5001C18.1946 10.8739 16.894 11.0345 15.6282 11.3536C15.3516 10.5882 15.0162 9.84538 14.6251 9.13171C15.7559 8.41412 16.7921 7.55742 17.7095 6.58171C18.8304 7.76453 19.5603 9.2636 19.8001 10.8755V10.8755ZM15.9376 5.18484C15.1782 5.96338 14.3321 6.65226 13.4157 7.23796C12.5898 6.12932 11.6257 5.13062 10.547 4.26609C11.0255 4.17153 11.5123 4.12443 12.0001 4.12546C13.3834 4.12231 14.7426 4.48799 15.9376 5.18484V5.18484ZM8.02508 5.21296C9.30725 6.04741 10.4442 7.08615 11.3907 8.28796C9.68491 9.00819 7.85169 9.37803 6.00008 9.37546C5.5407 9.37546 5.07195 9.34734 4.6032 9.30046C5.23534 7.58239 6.44498 6.13745 8.02508 5.21296V5.21296ZM4.12508 12.0005C4.12508 11.8411 4.13445 11.6817 4.14383 11.5223C4.76033 11.5894 5.37994 11.6238 6.00008 11.6255C8.2917 11.6273 10.5575 11.1416 12.647 10.2005C12.9668 10.7932 13.2456 11.4071 13.4813 12.038C12.7873 12.3186 12.1138 12.6475 11.4657 13.0223C9.48625 14.1627 7.77054 15.7091 6.43133 17.5598C5.69995 16.8306 5.11975 15.9641 4.72399 15.0101C4.32823 14.0561 4.1247 13.0333 4.12508 12.0005V12.0005ZM8.23133 18.9098C9.38764 17.302 10.8739 15.9596 12.5907 14.9723C13.0733 14.6889 13.5744 14.4383 14.0907 14.2223C14.2548 15.0878 14.3395 15.9665 14.3438 16.8473C14.3441 17.7733 14.2498 18.6968 14.0626 19.6036C13.3901 19.785 12.6966 19.8764 12.0001 19.8755C10.6824 19.8775 9.3857 19.5453 8.23133 18.9098V18.9098ZM16.5095 18.4505C16.5656 17.9179 16.5938 17.3828 16.5938 16.8473C16.5927 15.7254 16.4733 14.6067 16.2376 13.5098C17.3065 13.2557 18.4014 13.1267 19.5001 13.1255H19.8001C19.6447 14.1909 19.2726 15.2131 18.7066 16.129C18.1406 17.0449 17.3928 17.835 16.5095 18.4505V18.4505Z"
        fill="#52525B"
      />
    </svg>
  );
};

const StackOverflowIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        fill="#52525B"
        d="M17.297 19.884v-5.132h1.707V21.6H3.6v-6.848h1.717v5.132h11.98zM7.196 14.275l.353-1.678 8.384 1.764-.353 1.679-8.384-1.765zm1.106-4.015l.725-1.536 7.764 3.605-.725 1.546-7.764-3.615zm2.156-3.806l1.097-1.316 6.581 5.494-1.097 1.306-6.581-5.484zM14.702 2.4l5.113 6.877-1.374 1.02-5.112-6.876 1.373-1.02zM7.024 18.176V16.46h8.565v1.717H7.024z"
      ></path>
    </svg>
  );
};

const YouTubeIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        fill="#52525B"
        d="M21.966 6.543a2.202 2.202 0 00-1.36-1.528C17.4 3.778 12.281 3.787 12 3.787c-.281 0-5.4-.01-8.606 1.228a2.203 2.203 0 00-1.36 1.528C1.791 7.471 1.5 9.178 1.5 12s.29 4.528.534 5.456a2.203 2.203 0 001.36 1.528c3.075 1.19 7.893 1.228 8.54 1.228h.132c.646 0 5.465-.037 8.54-1.228a2.203 2.203 0 001.36-1.528c.243-.928.534-2.634.534-5.456 0-2.822-.29-4.529-.534-5.457zm-6.76 5.766l-4.5 3a.337.337 0 01-.206.066.42.42 0 01-.178-.047.365.365 0 01-.197-.328V9a.365.365 0 01.197-.329.375.375 0 01.384.02l4.5 3a.367.367 0 010 .618z"
      ></path>
    </svg>
  );
};

const LinkedInIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        fill="#52525B"
        d="M18.335 18.339H15.67v-4.177c0-.996-.02-2.278-1.39-2.278-1.389 0-1.601 1.084-1.601 2.205v4.25h-2.666V9.75h2.56v1.17h.035c.358-.674 1.228-1.387 2.528-1.387 2.7 0 3.2 1.778 3.2 4.091v4.715h-.001zM7.003 8.575a1.546 1.546 0 01-1.287-2.409 1.548 1.548 0 111.286 2.409h.001zm1.336 9.764H5.666V9.75H8.34v8.589h-.001zM19.67 3H4.329C3.593 3 3 3.58 3 4.297v15.406C3 20.42 3.594 21 4.328 21h15.338C20.4 21 21 20.42 21 19.703V4.297C21 3.58 20.4 3 19.666 3h.004z"
      ></path>
    </svg>
  );
};

const DefaultAPIIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        fill="#52525B"
        d="M7 7H5a2 2 0 00-2 2v8h2v-4h2v4h2V9a2 2 0 00-2-2m0 4H5V9h2m7-2h-4v10h2v-4h2a2 2 0 002-2V9a2 2 0 00-2-2m0 4h-2V9h2m6 0v6h1v2h-4v-2h1V9h-1V7h4v2h-1z"
      ></path>
    </svg>
  );
};
