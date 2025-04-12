import applyFilter from '_helpers/functions/filters';

export const initTableReduxes = (child, setAll, all=[]) => {
  if (child) {
    const all_data = applyFilter({path: `${child.reduxName}.data`});
    const new_all = [...all, {
      type: `append_path_${child.reduxName}`,
      path: 'groups',
      data: {[child.match]: applyFilter({
        key: 'keys',
        levels: [child.match, 'id'],
      }, all_data)},
    }]
    initTableReduxes(child.child, setAll, new_all)
  } else {
    setAll(all)
  }
}
