import React, { useState, Fragment, Suspense, useEffect } from 'react'
import Wrapper from '_helpers/components/wrap';
import { APP } from '_config';
import applyFilters from '_helpers/functions/filters'
import {omit} from 'lodash'
export default function Wrap(props) {
  const {w_data, tw, MasterComponent, wraps, MainComp, ..._props} = props
  const [extra, s_updateExtra] = useState({MasterComponent});
  useEffect(() => {
      let s_class = props.w_data.s_class || props.s_class;
      const getClass = async (props, w_data) => {
        if(w_data.class_fun){
          s_class = await applyFilters(w_data.class_fun, undefined, {props: this.props});
        }
        if(s_class){
          const classes = await import(`./styles/${APP}/${s_class}`)
          s_updateExtra({classes, classNames: tw});
        }else{
          s_updateExtra({classes: props.classes || {}, classNames: tw});
        }
      }
      getClass(props, w_data);
    }, [props.w_data, w_data]);
    const mainProps = omit(props, ['comp', 'comps', 'children', 'MainComp']);
    if(!extra){
      return <Fragment></Fragment>
    }

    return (
      <Wrapper wraps={wraps} {...extra} {...mainProps}>
        {(props) => {
          return (
            <Suspense fallback={<Fragment></Fragment>}>
              <MainComp {...{...(mainProps.props || mainProps), ...props, ...w_data, ...extra, MasterComponent}} />
            </Suspense>
          );
        }}
      </Wrapper>
    );
}
