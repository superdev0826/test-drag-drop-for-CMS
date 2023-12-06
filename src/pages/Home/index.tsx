import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useEffect } from "react";

import Header from "../../layouts/Header";
import Footer from "../../layouts/Footer";
import Content from "../../layouts/Content";
import Sidebar from "../../components/Sidebar";
import { actions as elementActions } from "../../store/element/slice";
import { actions as appActions } from "../../store/app/slice";
import { useAppDispatch } from "../../store";

export default function Home() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const storeElementsStateData = localStorage.getItem("elements");
    if (storeElementsStateData && storeElementsStateData !== "undefined") {
      const elementState = JSON.parse(storeElementsStateData);
      dispatch(elementActions.setElements(elementState));
    }
    const storeAppStateData = localStorage.getItem("app");
    if (storeAppStateData && storeAppStateData !== "undefined") {
      const appState = JSON.parse(storeAppStateData);
      dispatch(
        appActions.setState({ area: "header", elements: appState.header ?? [] })
      );
      dispatch(
        appActions.setState({
          area: "content",
          elements: appState.content ?? [],
        })
      );
      dispatch(
        appActions.setState({ area: "footer", elements: appState.footer ?? [] })
      );
    }
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="w-full min-h-screen flex flex-row">
        <div className="w-3/4 min-h-screen flex flex-col">
          <Header />
          <Content />
          <Footer />
        </div>
        <div className="w-1/4 h-auto flex flex-col">
          <Sidebar />
        </div>
      </div>
    </DndProvider>
  );
}
