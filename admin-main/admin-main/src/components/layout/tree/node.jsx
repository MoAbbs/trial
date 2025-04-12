import React, { useState } from "react";
// import Typography from "@material-ui/core/Typography";
// import IconButton from "@material-ui/core/IconButton";
// import {AiFillDelete} from "@react-icons/all-files/ai/AiFillDelete"
// import {IoMdAddCircleOutline} from "@react-icons/all-files/io/IoMdAddCircleOutline"
import {IoMdArrowDropright} from "@react-icons/all-files/io/IoMdArrowDropright"
import { useDragOver } from "@minoru/react-dnd-treeview";
import styles from "./node.module.less";

export const CustomNode = (props) => {
  const [hover, setHover] = useState(false);
  const {MasterComponent, actions, nodeComps} = props;
  const { id } = props.node;
  const indent = props.depth * 24;
  const handleToggle = (e) => {
    e.stopPropagation();
    props.onToggle(props.node.id);
  };

  const dragOverProps = useDragOver(id, props.isOpen, props.onToggle);
  const item = props.node;
  return (
    <div
      className={`tree-node ${styles.root}`}
      style={{ paddingInlineStart: indent }}
      {...dragOverProps}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        className={`${styles.expandIconWrapper} ${
          props.isOpen ? 'open' : ""
        }`}
      >
        {props.node.droppable && (
          <div onClick={handleToggle} className="reverse-icon">
            <IoMdArrowDropright />
          </div>
        )}
      </div>
      <MasterComponent {...nodeComps} item={item} gs={{item}} />
      {hover && (
        <>
          <MasterComponent {...actions} item={item} gs={{item}} />
        </>
      )}
    </div>
  );
};
