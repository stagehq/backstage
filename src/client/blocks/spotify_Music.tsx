import { Block, Card, List } from "@stagehq/ui";
import { FC, useEffect, useState } from "react";
import { useChangeBlockTitle } from "../components/studio/hooks/useChangeBlockTitle";
import { useChangeExtensionSize } from "../components/studio/hooks/useChangeSize";
import { useDeleteExtension } from "../components/studio/hooks/useDeleteExtension";
import { BlockProps } from "./type";

const Spotify: FC<BlockProps> = ({ gridRef, extension, size, isEditable }) => {
  const [data, setData] = useState<any[]>([]);
  const [render, setRender] = useState(false);

  const changeBlockTitle = useChangeBlockTitle();
  const changeExtensionSize = useChangeExtensionSize();
  const deleteExtension = useDeleteExtension();

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
      setRender(true);
    }
  }, [extension]);

  return render
    ? data && (
        <Block
          title={extension.title ? extension.title : "Top tracks"}
          size={size}
          isEditable={isEditable}
          handleTitleChange={
            isEditable
              ? (title) => changeBlockTitle(extension.id, title)
              : undefined
          }
          handleSizeChange={
            isEditable
              ? (size) => changeExtensionSize(extension.id, size, gridRef)
              : undefined
          }
          handleDelete={
            isEditable ? () => deleteExtension(extension.id) : undefined
          }
          imagePath={"https://avatars.githubusercontent.com/u/251374?s=200&v=4"}
        >
          <Card
            type="horizontal"
            title={data[0].title}
            subtitle={data[0].subtitle}
            image={data[0].image}
            icon="PlayIcon"
            actions={{ open: { url: data[0].link } }}
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
                      value: track.count.value,
                    }
                  }
                  actions={{ open: { url: track.link } }}
                  key={track.title + index}
                />
              ))}
          </List>
        </Block>
      )
    : null;
};

export default Spotify;
