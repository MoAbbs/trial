import { get, groupBy, map, size } from "lodash";
import React, { useState } from "react";
import Styles from "../../style.module.css";

export default function ItemsBar({
  companyItems,
  items,
  categories,
  handelToggleItem,
}) {
  const [show, setShow] = useState(size(companyItems) > 0 ? false : true);
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
      <div className={`${Styles.itemsBar} ${show && Styles.showBar}`}>
        <div className={Styles.barHeader}>
          <div>
            <div
              className="d-flex justify-content-start btn btn-danger font-weight-bolder "
              style={{ width: "40px" }}
              onClick={() => {
                setShow(false);
              }}
            >
              x
            </div>
            <div>
              <h3>Choose Items</h3>
              <span>
                lorem item lorem item lorem item lorem item lorem item lorem
                item lorem item
              </span>
            </div>
          </div>
        </div>
        <div className={Styles.contentItems}>
          {map(categoryGroup, (groupItem, key) => {
            console.log(categoryGroup, "categoryGroup");
            return (
              <div>
                <div className={Styles.groupItems}>
                  {get(categories, key)?.name}
                </div>
                <div className="d-flex align-items-center justify-content-center flex-wrap ">
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
                          {item?.name}
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
