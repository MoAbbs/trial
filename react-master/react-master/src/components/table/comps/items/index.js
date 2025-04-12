import { debounce, filter, get, groupBy, map, pickBy, size, toLower } from "lodash";
import React, { useRef, useState } from "react";
import Styles from "./style.module.css";

const searchItem = (items, text, setItems)=>{
  if(!text){
    setItems(items)
    return items
  }
  const out = filter(items, d=>(toLower(d.name).includes(text)))
  setItems(out)
  return out
}
export default function ItemsBar({
  companyItems: cItems,
  categories,
  handelToggleItem,
  ...props
}) {
  const companyItems = pickBy(cItems, (d) => !d.deleted_at);
  const [show, setShow] = useState(size(companyItems) > 0 ? false : true);
  const [items, setItems] = useState(props.items)
  const delayedSearch = useRef(debounce(searchItem, 400))
  const [value, changeValue] = useState()
  const handleChange = (ev)=>{
    const value = ev.target.value
    changeValue(value)
    delayedSearch.current(props.items, value, setItems)
  }
  const categoryGroup = groupBy(items, function (b) {
    return b?.category;
  });
  return (
    <div>
      <button
        className={`${Styles.mainBtn} btn`}
        onClick={() => {
          setShow(true);
        }}
      >
        Add Items
      </button>
      {show ? <div className={`${Styles.itemsBar} ${show && Styles.showBar}`}>
        <div className={Styles.barHeader}>
          <div>
            <div
              className={Styles.closeIcon}
              onClick={() => {
                setShow(false);
              }}
            >
              <i className="fas fa-times-circle"></i>
            </div>
            <div className={Styles.headTxt}>
              <h3>Choose Items</h3>
              <span>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore
              </span>
              <div>
                <input class={Styles.searchControl} type="text" placeholder="Search Items" value={value} onChange={handleChange} />
              </div>
            </div>
          </div>
        </div>
        <div className={Styles.contentItems}>
          {map(categoryGroup, (groupItem, key) => {
            return (
              <div>
                <div className={Styles.groupItems}>
                  {get(categories, key)?.name}
                </div>
                <div className="d-flex align-items-center flex-wrap">
                  {map(groupItem, (item, key) => {
                    if (!item?.calculated && !get(companyItems, item?.id)) {
                      return (
                        <div
                          key={key}
                          className={Styles.barItem}
                          onClick={() => {
                            handelToggleItem(item);
                          }}
                        >
                          <span>{item?.name}</span>
                          <i className="fas fa-info-circle"></i>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>:<div></div>}
    </div>
  );
}
