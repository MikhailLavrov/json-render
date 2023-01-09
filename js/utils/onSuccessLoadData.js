import { renderList } from "../modules/renderList.js";
import { setItems } from "./setItems.js";

const onSuccessLoadData = (items) => {
  setItems(items);
  renderList(items);
}

export {onSuccessLoadData};
