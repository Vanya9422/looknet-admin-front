export default {
  categories: '/categories',
  lang: '/locales',
  langChane: '/admin/locales',
  adminPage:'/admin/pages',
  page:'/text-pages',
  advertises: {
    index: '/products',
    homeVip: '/products?searchJoin=and&randomResult=true&per_page=10&with=city;author.avatar;category;gallery&search=type:1;status:1',
    home: '/products?searchJoin=and&randomResult=true&with=city;author.avatar;category;gallery&search=type:0;status:1',
  },
  user: {
    blockList: '/users/blocked-user-list',
    unblocked: '/users/unblocked-user',
    notifications: '/users/notifications',
    statistics: '/statistics/',
    advertises: '/users/products?searchJoin=and&with=city;author;gallery;category',
    favorites:'/users/products/favorites'
  },


  products:'/admin/products',
  gallery:'/admin/gallery',
  businesses:'/admin/commercial/businesses',
  clients:'/admin/commercial/clients',
  commercialUsers:'/admin/commercial/users',
  banner:'/admin/commercial/notifications?searchJoin=and&search=type:1;',
  notification:'/admin/commercial/notifications?searchJoin=and&search=type:2;',
  notifications:'/admin/commercial/notifications',
  users:'/admin/commercial/users?searchJoin=and&search=',
  banUser:'/admin/users/banned',

  clientsDays: '/admin/commercial/groups',


  productStatus:'/admin/products/status'
}
