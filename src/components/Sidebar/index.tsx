import { RootState, useAppSelector, useAppDispatch } from "../../store";
import { actions as elementActions } from "../../store/element/slice";
import Button from "../Button";
import Card from "../Card";
import SourceBox from "../SourceBox";

export default function Sidebar() {
  const appState = useAppSelector((state: RootState) => state.app);
  const elementState = useAppSelector((state: RootState) => state.element);
  const dispatch = useAppDispatch();

  const handleEdit = () => {
    dispatch(elementActions.setEditable(!elementState.editable));
  };

  return (
    <div className="w-full h-full border-[2px] border-black flex flex-col">
      <div className="w-full h-16 flex justify-center place-items-center">
        <button
          className="border-[2px] border-black p-[5px] shadow-lg"
          onClick={handleEdit}
        >
          {elementState.editable ? "SAVE SETTINGS" : "EDIT SETTINGS"}
        </button>
      </div>

      <div
        id="buttons_header"
        className="w-full min-h-[64px] flex flex-col items-center gap-3"
      >
        <p>header buttons</p>
        {elementState.elements.header.map((item) =>
          appState.header.includes(item.id) ? null : (
            <SourceBox type={`header-${item.id}`} key={`header-${item.id}`}>
              <Button id={item.id} area="header" isStatic />
            </SourceBox>
          )
        )}
      </div>
      <div
        id="contents"
        className="w-full min-h-[128px] flex flex-col gap-3  items-center p-[20px]"
      >
        <p>Container contents</p>

        {elementState.elements.content.map((item) =>
          appState.content.includes(item.id) ? null : (
            <div className="w-full h-auto" key={`content-${item.id}`}>
              <SourceBox type={`content-${item.id}`}>
                <Card id={item.id} isStatic />
              </SourceBox>
            </div>
          )
        )}
      </div>
      <div
        id="buttons_footer"
        className="w-full min-h-[64px]  items-center flex flex-col gap-3"
      >
        <p>footer buttons</p>

        {elementState.elements.footer.map((item) =>
          appState.footer.includes(item.id) ? null : (
            <SourceBox type={`footer-${item.id}`} key={`footer-${item.id}`}>
              <Button id={item.id} area="footer" isStatic />
            </SourceBox>
          )
        )}
      </div>
    </div>
  );
}
