import { Block, Card, List } from "@stagehq/ui";
import { FC, useEffect, useState } from "react";
import { useChangeExtensionTitle } from "../components/studio/hooks/useChangeExtensionTitle";
import { useChangeExtensionSize } from "../components/studio/hooks/useChangeSize";
import { BlockProps } from "./type";

const Spotify: FC<BlockProps> = ({ gridRef, extension, size, isEditable }) => {
  const [data, setData] = useState<any[]>([]);

  const changeExtensionTitle = useChangeExtensionTitle();
  const changeExtensionSize = useChangeExtensionSize();

  useEffect(() => {
    if (extension.underlayingApis) {
      let favoriteTracks: any[] = [];

      extension.underlayingApis?.forEach((api) => {
        if (api.apiConnector?.name === "spotify") {
          api.apiResponses?.forEach((apiResponse) => {
            apiResponse.response.items.forEach((track: any) => {
              favoriteTracks.push({
                source: "Spotify",
                type: "cover",
                title: track.name,
                subtitle: track.artists
                  .map((artist: any) => artist.name)
                  .join(", "),
                additional: track.album.release_date.slice(0, 4),
                image: track.album.images[0].url,
                link: track.external_urls.spotify,
              });
            });
          });
        }
      });

      // reduce to 5 items for now
      if (favoriteTracks.length > 5) {
        favoriteTracks = favoriteTracks.slice(0, 5);
      }

      setData(favoriteTracks);
    }
  }, [extension]);

  return (
    <Block
      title="Top tracks"
      size={size}
      isEditable={isEditable}
      handleTitleChange={(title) => changeExtensionTitle(extension.id, title)}
      handleSizeChange={(size) =>
        changeExtensionSize(extension.id, size, gridRef)
      }
      imagePath={"https://avatars.githubusercontent.com/u/357098?s=200&v=4"}
    >
      <Card
        type="horizontal"
        title={data[0].title}
        subtitle={data[0].subtitle}
        image={data[0].image}
        icon="PlayIcon"
        actions={{ link: { url: data[0].link } }}
      />
      <List>
        {data
          .filter((track, index) => index !== 0)
          .map((track: any, index) => (
            <List.Item
              index={index + 1}
              type={track.type}
              title={track.title}
              subtitle={track.subtitle}
              image={track.image}
              count={
                track.count && {
                  // value: track.count.value,
                  icon: "PlayCircleIcon",
                }
              }
              key={track.title + index}
            />
          ))}
      </List>
    </Block>
  );
};

export default Spotify;
