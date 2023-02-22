import { decodeGlobalID, encodeGlobalID } from "@pothos/plugin-relay";
import { AuthType } from "@prisma/client";
import { toast } from "react-hot-toast";
import { useRecoilState, useRecoilValue } from "recoil";
import { uploadFile } from "../../../../server/aws/helper";
import { siteSlugState, siteState } from "../../../store/site";
import { currentUserState } from "../../../store/user";
import { upsertExtension } from "../../helper/upsertExtension";


export const useDropImage = () => {
  const siteSlug = useRecoilValue(siteSlugState);
  const [site, setSite] = useRecoilState(siteState(siteSlug));
  const user = useRecoilValue(currentUserState);

  const dropImage = (
    acceptedFiles: File[],
  ) => {
    if (acceptedFiles.length > 0 && site?.extensions && site.extensions?.length < 10 ) {
      
        console.log(acceptedFiles);
        acceptedFiles.forEach((file) => {
          // convert file to base64 string
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = async () => {
            const base64 = reader.result;
            if (base64 && site !== null) {
              if(!user) return null;
              // const newSite = {
              //   ...site,
              //   extensions: [
              //     ...(site.extensions ? site.extensions : []),
              //     {
              //       id: "placeholderImages",
              //       storeExtension: {
              //         id: "clbz5lknp001zpgpx4nboixelst",
              //         name: "Images",
              //         blockId: "image_single"
              //       },
              //       underlayingApis: [{
              //         apiConnector: {
              //           name: "images"
              //         },
              //         apiResponses: [{
              //           response: {"path": base64.toString()}
              //         }]
              //       }]
              //     },
              //   ],
              // };
              //setSite({ ...newSite as Site });
              await uploadFile(file, "cleeh6wmg0000eor0ihsxeoob", "blockImage").then(async (data) => {
                if(data){
                  const response = await upsertExtension({
                    userId: decodeGlobalID(user.id).id,
                    siteId: decodeGlobalID(site.id).id,
                    storeExtensionId: "clbz5lknp001zpgpx4nboixelst",
                    apiConnectorName: "images",
                    routes: [{
                        id: "cleee4xhl00jgeobkzju5z2nf",
                        url: "",
                        apiConnector: {
                          name: "images",
                        },
                      }],
                    preferences: [{ key: "image path", value: data }],
                    authType: AuthType.preferences,
                  });
                  const newSite = {
                    ...site,
                    extensions: [
                      ...(site.extensions ? site.extensions : []),
                      {
                        ...response.extension,
                        id: encodeGlobalID("Extension", response.extension.id),
                        storeExtension: {
                          ...response.extension.storeExtension,
                          id: encodeGlobalID(
                            "StoreExtension",
                            response.extension.storeExtension.id
                          ),
                        },
                      },
                    ],
                  };
                  setSite({ ...newSite });
                }
              });
            }
          };
          reader.onerror = (error) => {
            console.log("Error: ", error);
          };
        });
  
    } else {
      toast.error("Block limit reached!");
    }
  };

  return dropImage;
};
