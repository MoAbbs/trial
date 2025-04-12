export const sfwra_admin_bill = {
  "id": "sfwra_admin_bill",
  "name": "Billing",
  "_index": "7",
  "action": {"path": "/user", "key": "route/navigate"},
  "app": "buznsi_admin",
  "icon": {
    type: 'ai',
    name: "AiFillBank"
  }
}
export const sfwra_admin_bill_summary = {
  "id": "sfwra_admin_bill_summary",
  "name": "Dashboard",
  "app": "buznsi_admin",
  "url": "bill-summary",
  "icon": {
    type: 'bi',
    name: "AiFillControl"
  },
  "parent": "sfwra_admin_bill",
  "widgets": {"name": "buznsi_admin_manage", "data": {"app": "auths__user"}}
}