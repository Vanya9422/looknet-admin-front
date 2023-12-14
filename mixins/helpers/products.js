const filter = "filter=id;name;created_at;price_policy;show_details;contact_phone;description;price;type;slug;user_id;city_id;category_id;contacts"
const withField = "with=author;category;gallery"
const sortNewest = "orderBy=created_at&sortedBy=desc"
const searchFields = "searchJoin=and&searchFields=price:="
const vip = "search=type:1;status:1"
const noVip = "search=type:0;status:1"

export {
  filter,
  withField,
  sortNewest,
  searchFields,
  vip,
  noVip
}