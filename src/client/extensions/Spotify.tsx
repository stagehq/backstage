import { Action, Actions, Cards, Header, List, Section } from "@stagehq/ui";
import { useEffect, useState } from "react";
import { Api } from "../graphql/types.generated";

const Spotify = (props: { underlayingApis: Api[] }) => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    if (props.underlayingApis) {
      let favoriteTracks: any[] = [];

      props.underlayingApis?.forEach(
        (api) => {
          if (api.apiConnector?.name === "spotify") {
            api.apiResponses?.forEach((apiResponse) => {
              apiResponse.response.items.forEach((track: any) => {                  
                favoriteTracks.push({
                  source: "Spotify",
                  type: "cover",
                  title: track.name,
                  subtitle: track.artists.map((artist: any) => artist.name).join(", "),
                  additional: track.album.release_date.slice(0, 4),
                  image: track.album.images[0].url,
                  link: track.external_urls.spotify,
                });
              });
            });
          }
        }
      );

      // reduce to 5 items for now
      if (favoriteTracks.length > 5) {
        favoriteTracks = favoriteTracks.slice(0, 5);
      }

      setData(favoriteTracks);
    }
  }, [props.underlayingApis]);

  return (
    <Section>
      <Header
        title="My Music"
        icon="MusicalNoteIcon"
        // actions={
        //   <Actions>
        //     <Action.Link url="https://github.com" text="Spotify profile" />
        //   </Actions>
        // }
      />
      <Cards>
        {data.map((track: any, index) => (
          index === 0 && (
            <Cards.Item
              type="horizontal"
              title={data[0].title}
              subtitle={data[0].subtitle}
              image={data[0].image}
              icon="PlayIcon"
              actions={
                <Actions>
                  <Action.Link url={data[0].link} text="Play on Spotify" />
                </Actions>
              }
            />
          )
        ))}
      </Cards>
      <List>
        {data.map((track: any, index) => (
          index !== 0 && (
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
          )
        ))}
      </List>
    </Section>
  );
};

export default Spotify;
