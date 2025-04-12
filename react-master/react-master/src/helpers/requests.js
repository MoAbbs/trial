import serializer from "requests/serializer";

export const mainQuery = (company)=>({
  settings__items: {},
  settings__item_category: {},
  product__company_items: {
    filter: {
      company,
    },
  },
  product__company_item_values: {
    filter: {
      company,
    },
  },
  product__company_item_check: {
    filter: {
      company,
    },
  },
  product__notes: {
    filter: {
      company,
    }
  }
})

export const transformData = (data)=>(
  serializer(data, [
    { key: "settings__items", index: "id" },
    { key: "settings__item_category", index: "id" },
    { key: "product__notes", index: "model" },
    { key: "product__company_items", index: "item" },
    { key: "product__company_item_values", index: "id" },
    { key: "product__company_item_check", index: "schedule" },
  ])
)