import React, { useState } from "react";
import {
  Tree
} from "@minoru/react-dnd-treeview";
import { CustomNode } from "./node";
import styles from "./style.module.less";
// console.log(styles)
function MainComponent(props) {
  const [treeData] = useState(props.list);
  const {MasterComponent, actions, nodeComps} = props;
  return (
      <div className={styles.app}>
        <Tree
          tree={treeData}
          rootId={undefined}
          render={(node, options) => (
            <CustomNode
              MasterComponent={MasterComponent}
              {...{actions, nodeComps}}
              node={node}
              {...options}
            />
          )}
          classes={{
            root: styles.treeRoot,
            draggingSource: styles.draggingSource,
            dropTarget: styles.dropTarget
          }}
        />
      </div>
  );
}

export default MainComponent;
