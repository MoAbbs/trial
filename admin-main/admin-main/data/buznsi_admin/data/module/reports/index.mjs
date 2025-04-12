export const sfwra_admin_reports = {
  "id": "sfwra_admin_reports",
  "name": "Reports",
  "_index": "6",
  "action": {"path": "/user", "key": "route/navigate"},
  "app": "buznsi_admin",
  "icon": {
    type: 'ai',
    name: "AiFillDatabase"
  }
}
export const sfwra_admin_summary = {
  "id": "sfwra_admin_summary",
  "name": "Dashboard",
  "app": "buznsi_admin",
  "url": "reports-summary",
  "icon": {
    type: 'bi',
    name: "AiFillBook"
  },
  "parent": "sfwra_admin_reports",
  "widgets": {"name": "buznsi_admin_manage", "data": {"app": "auths__user"}}
}