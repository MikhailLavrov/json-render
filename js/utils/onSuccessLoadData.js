import { renderList } from "../modules/renderList.js";
import { setItems } from "../modules/setItems.js";

const onSuccessLoadData = (items) => {
  setItems(items);
  renderList(items);
}

export {onSuccessLoadData};
