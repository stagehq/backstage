import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { selectedLabelState } from "../../../../../store/ui/label";
import Label from "../../../02_AppGlobal/Label";
import SidebarItemWrapper from "../SidebarItemWrapper";

const LabelItem = () => {
  // selected labels recoil store
  const [selectedLabels, setSelectedLabels] =
    useRecoilState(selectedLabelState);

  // use effect selected labels
  useEffect(() => {
    if (selectedLabels) {
      console.log(selectedLabels);
    }
  }, [selectedLabels]);

  return (
    <div className="">
      <SidebarItemWrapper
        title="Label"
        editable={true}
        number={selectedLabels.length}
      >
        <div className="flex gap-2 flex-wrap mt-1 -ml-1">
          {selectedLabels.map((label) => (
            <Label label={label} />
          ))}
        </div>
      </SidebarItemWrapper>
    </div>
  );
};

export default LabelItem;
