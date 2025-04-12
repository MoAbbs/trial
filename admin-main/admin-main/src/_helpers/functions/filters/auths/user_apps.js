export default (user)=>([{
  model: 'units_favorites', where: `user_id=${user}`,
}, {
  model: 'reservations', where: `user_id=${user}`,
}, {
  model: 'requests', where: `user_id=${user}`,
}, {
  model: 'complaints', where: `user_id=${user}`,
}, {
  model: 'payments', where: `user_id=${user}`,
}, {
  model: 'partners', where: `user_id=${user}`,
}, {
  model: 'attachments', where: `user_id=${user}`,
}, {
  model: 'teams', where: ``,
}])
