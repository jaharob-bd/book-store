const Ziggy = {
  "url": "http:\/\/localhost",
  "port": null,
  "defaults": {},
  "routes": {
    "sanctum.csrf-cookie": {
      "uri": "sanctum\/csrf-cookie",
      "methods": ["GET", "HEAD"]
    },
    "ignition.healthCheck": {
      "uri": "_ignition\/health-check",
      "methods": ["GET", "HEAD"]
    },
    "ignition.executeSolution": {
      "uri": "_ignition\/execute-solution",
      "methods": ["POST"]
    },
    "ignition.updateConfig": {
      "uri": "_ignition\/update-config",
      "methods": ["POST"]
    },
    "home": {
      "uri": "\/",
      "methods": ["GET", "HEAD"]
    },
    "shop": {
      "uri": "shop",
      "methods": ["GET", "HEAD"]
    },
    "shop.filter": {
      "uri": "shop\/filter",
      "methods": ["GET", "HEAD"]
    },
    "cart": {
      "uri": "cart",
      "methods": ["GET", "HEAD"]
    },
    "checkout": {
      "uri": "checkout",
      "methods": ["GET", "HEAD"]
    },
    "gift": {
      "uri": "gift",
      "methods": ["GET", "HEAD"]
    },
    "order": {
      "uri": "order",
      "methods": ["GET", "HEAD"]
    },
    "order-store": {
      "uri": "order-store",
      "methods": ["POST"]
    },
    "order-success": {
      "uri": "order-success",
      "methods": ["GET", "HEAD"]
    },
    "order-details": {
      "uri": "order-details\/{order_no}",
      "methods": ["GET", "HEAD"],
      "parameters": ["order_no"]
    },
    "user.my-order-history": {
      "uri": "user\/my-order-history",
      "methods": ["GET", "HEAD"]
    },
    "user.my-order-tracking": {
      "uri": "tracking\/{order_no}",
      "methods": ["GET", "HEAD"],
      "parameters": ["order_no"]
    },
    "user.my-wish-list": {
      "uri": "user\/my-wish-list",
      "methods": ["GET", "HEAD"]
    },
    "user.my-change-password": {
      "uri": "user\/my-change-password",
      "methods": ["GET", "HEAD"]
    },
    "user.my-address-manage": {
      "uri": "user\/my-address-manage",
      "methods": ["GET", "HEAD"]
    },
    "order-failure": {
      "uri": "order-failure",
      "methods": ["GET", "HEAD"]
    },
    "order-cancel": {
      "uri": "order-cancel",
      "methods": ["POST"]
    },
    "order-complete": {
      "uri": "order-complete",
      "methods": ["POST"]
    },
    "order-return": {
      "uri": "order-return",
      "methods": ["POST"]
    },
    "order-review": {
      "uri": "order-review",
      "methods": ["POST"]
    },
    "about": {
      "uri": "about",
      "methods": ["GET", "HEAD"]
    },
    "contact": {
      "uri": "contact",
      "methods": ["GET", "HEAD"]
    },
    "my-account": {
      "uri": "my-account",
      "methods": ["GET", "HEAD"]
    },
    "edit-account": {
      "uri": "edit-account",
      "methods": ["GET", "HEAD"]
    },
    "update-account": {
      "uri": "update-account",
      "methods": ["POST"]
    },
    "my-orders": {
      "uri": "my-orders",
      "methods": ["GET", "HEAD"]
    },
    "order-detail": {
      "uri": "order-detail\/{id}",
      "methods": ["GET", "HEAD"],
      "parameters": ["id"]
    },
    "login": {
      "uri": "login",
      "methods": ["GET", "HEAD"]
    },
    "register": {
      "uri": "register",
      "methods": ["GET", "HEAD"]
    },
    "admin-register": {
      "uri": "admin-register",
      "methods": ["GET", "HEAD"]
    },
    "admin-login": {
      "uri": "admin-login",
      "methods": ["GET", "HEAD"]
    },
    "loginw": {
      "uri": "loginw",
      "methods": ["POST"]
    },
    "password.request": {
      "uri": "forgot-password",
      "methods": ["GET", "HEAD"]
    },
    "password.email": {
      "uri": "forgot-password",
      "methods": ["POST"]
    },
    "password.reset": {
      "uri": "reset-password\/{token}",
      "methods": ["GET", "HEAD"],
      "parameters": ["token"]
    },
    "password.store": {
      "uri": "reset-password",
      "methods": ["POST"]
    },
    "verification.notice": {
      "uri": "verify-email",
      "methods": ["GET", "HEAD"]
    },
    "verification.verify": {
      "uri": "verify-email\/{id}\/{hash}",
      "methods": ["GET", "HEAD"],
      "parameters": ["id", "hash"]
    },
    "verification.send": {
      "uri": "email\/verification-notification",
      "methods": ["POST"]
    },
    "password.confirm": {
      "uri": "confirm-password",
      "methods": ["GET", "HEAD"]
    },
    "password.update": {
      "uri": "password",
      "methods": ["PUT"]
    },
    "logout": {
      "uri": "logout",
      "methods": ["POST"]
    },
    "profile.edit": {
      "uri": "profile",
      "methods": ["GET", "HEAD"]
    },
    "profile.update": {
      "uri": "profile",
      "methods": ["PATCH"]
    },
    "profile.destroy": {
      "uri": "profile",
      "methods": ["DELETE"]
    },
    "dashboard": {
      "uri": "dashboard",
      "methods": ["GET", "HEAD"]
    },
    "products": {
      "uri": "products",
      "methods": ["GET", "HEAD"]
    },
    "product-store": {
      "uri": "product-store",
      "methods": ["POST"]
    },
    "product-edit": {
      "uri": "product-edit\/{slug}",
      "methods": ["GET", "HEAD"],
      "parameters": ["slug"]
    },
    "product-update": {
      "uri": "product-update",
      "methods": ["POST"]
    },
    "product-image-upload": {
      "uri": "product-image-upload",
      "methods": ["POST"]
    },
    "product-variant-price": {
      "uri": "product-variant-price\/{id}",
      "methods": ["POST"],
      "parameters": ["id"]
    },
    "product-group-price": {
      "uri": "product-group-price\/{id}",
      "methods": ["POST"],
      "parameters": ["id"]
    },
    "brands": {
      "uri": "brands",
      "methods": ["GET", "HEAD"]
    },
    "brand-store": {
      "uri": "brand-store",
      "methods": ["POST"]
    },
    "brand-update": {
      "uri": "brand-update\/{id}",
      "methods": ["POST"],
      "parameters": ["id"]
    },
    "attributes": {
      "uri": "attributes",
      "methods": ["GET", "HEAD"]
    },
    "attribute-store": {
      "uri": "attribute-store",
      "methods": ["POST"]
    },
    "attribute-update": {
      "uri": "attribute-update\/{id}",
      "methods": ["POST"],
      "parameters": ["id"]
    },
    "attribute-values": {
      "uri": "attribute-values",
      "methods": ["GET", "HEAD"]
    },
    "attribute-values-store": {
      "uri": "attribute-values-store",
      "methods": ["POST"]
    },
    "attribute-values-update": {
      "uri": "attribute-values-update\/{id}",
      "methods": ["PUT"],
      "parameters": ["id"]
    },
    "specifications": {
      "uri": "specifications",
      "methods": ["GET", "HEAD"]
    },
    "specification-store": {
      "uri": "specification-store",
      "methods": ["POST"]
    },
    "specification-update": {
      "uri": "specification-update\/{id}",
      "methods": ["PUT"],
      "parameters": ["id"]
    },
    "tags": {
      "uri": "tags",
      "methods": ["GET", "HEAD"]
    },
    "tag-store": {
      "uri": "tag-store",
      "methods": ["POST"]
    },
    "tag-update": {
      "uri": "tag-update\/{id}",
      "methods": ["PUT"],
      "parameters": ["id"]
    },
    "categories": {
      "uri": "categories",
      "methods": ["GET", "HEAD"]
    },
    "category-store": {
      "uri": "category-store",
      "methods": ["POST"]
    },
    "category-update": {
      "uri": "category-update\/{id}",
      "methods": ["POST"],
      "parameters": ["id"]
    },
    "customers": {
      "uri": "customers",
      "methods": ["GET", "HEAD"]
    },
    "customer-store": {
      "uri": "customer-store",
      "methods": ["POST"]
    },
    "customer-update": {
      "uri": "customer-update\/{id}",
      "methods": ["POST"],
      "parameters": ["id"]
    },
    "get-customer-data": {
      "uri": "get-customer-data\/{phone}",
      "methods": ["GET", "HEAD"],
      "parameters": ["phone"]
    },
    "customer-groups": {
      "uri": "customer-groups",
      "methods": ["GET", "HEAD"]
    },
    "customer-group-store": {
      "uri": "customer-group-store",
      "methods": ["POST"]
    },
    "customer-group-update": {
      "uri": "customer-group-update\/{id}",
      "methods": ["POST"],
      "parameters": ["id"]
    },
    "customer-group-edit": {
      "uri": "customer-group-edit\/{id}",
      "methods": ["GET", "HEAD"],
      "parameters": ["id"]
    },
    "suppliers": {
      "uri": "suppliers",
      "methods": ["GET", "HEAD"]
    },
    "supplier-store": {
      "uri": "supplier-store",
      "methods": ["POST"]
    },
    "supplier-update": {
      "uri": "supplier-update\/{id}",
      "methods": ["POST"],
      "parameters": ["id"]
    },
    "purchases": {
      "uri": "purchases",
      "methods": ["GET", "HEAD"]
    },
    "purchase-store": {
      "uri": "purchase-store",
      "methods": ["POST"]
    },
    "purchase-lists": {
      "uri": "purchase-lists",
      "methods": ["GET", "HEAD"]
    },
    "purchase-list": {
      "uri": "purchase-list\/{id}",
      "methods": ["GET", "HEAD"],
      "parameters": ["id"]
    },
    "test": {
      "uri": "test",
      "methods": ["GET", "HEAD"]
    },
    "stocks": {
      "uri": "stocks",
      "methods": ["GET", "HEAD"]
    },
    "get-stocks": {
      "uri": "get-stocks",
      "methods": ["GET", "HEAD"]
    },
    "stock-movements": {
      "uri": "stock-movements",
      "methods": ["GET", "HEAD"]
    },
    "get-stock-movements": {
      "uri": "get-stock-movements",
      "methods": ["GET", "HEAD"]
    },
    "orders": {
      "uri": "sales\/orders",
      "methods": ["GET", "HEAD"]
    },
    "order.create": {
      "uri": "sales\/order\/create",
      "methods": ["GET", "HEAD"]
    },
    "order.view": {
      "uri": "sales\/order\/view\/{id}",
      "methods": ["GET", "HEAD"],
      "parameters": ["id"]
    },
    "order.shipments": {
      "uri": "sales\/order\/shipments",
      "methods": ["GET", "HEAD"]
    },
    "order.status-update": {
      "uri": "status-update",
      "methods": ["POST"]
    },
    "api.catalog.index": {
      "uri": "api\/v1\/catalog",
      "methods": ["GET", "HEAD"]
    },
    "api.catalog.store": {
      "uri": "api\/v1\/catalog",
      "methods": ["POST"]
    },
    "api.catalog.show": {
      "uri": "api\/v1\/catalog\/{catalog}",
      "methods": ["GET", "HEAD"],
      "parameters": ["catalog"]
    },
    "api.catalog.update": {
      "uri": "api\/v1\/catalog\/{catalog}",
      "methods": ["PUT", "PATCH"],
      "parameters": ["catalog"]
    },
    "api.catalog.destroy": {
      "uri": "api\/v1\/catalog\/{catalog}",
      "methods": ["DELETE"],
      "parameters": ["catalog"]
    },
    "catalog.index": {
      "uri": "catalog",
      "methods": ["GET", "HEAD"]
    },
    "catalog.create": {
      "uri": "catalog\/create",
      "methods": ["GET", "HEAD"]
    },
    "catalog.store": {
      "uri": "catalog",
      "methods": ["POST"]
    },
    "catalog.show": {
      "uri": "catalog\/{catalog}",
      "methods": ["GET", "HEAD"],
      "parameters": ["catalog"]
    },
    "catalog.edit": {
      "uri": "catalog\/{catalog}\/edit",
      "methods": ["GET", "HEAD"],
      "parameters": ["catalog"]
    },
    "catalog.update": {
      "uri": "catalog\/{catalog}",
      "methods": ["PUT", "PATCH"],
      "parameters": ["catalog"]
    },
    "catalog.destroy": {
      "uri": "catalog\/{catalog}",
      "methods": ["DELETE"],
      "parameters": ["catalog"]
    },
    "api.hrm.index": {
      "uri": "api\/v1\/hrm",
      "methods": ["GET", "HEAD"]
    },
    "api.hrm.store": {
      "uri": "api\/v1\/hrm",
      "methods": ["POST"]
    },
    "api.hrm.show": {
      "uri": "api\/v1\/hrm\/{hrm}",
      "methods": ["GET", "HEAD"],
      "parameters": ["hrm"]
    },
    "api.hrm.update": {
      "uri": "api\/v1\/hrm\/{hrm}",
      "methods": ["PUT", "PATCH"],
      "parameters": ["hrm"]
    },
    "api.hrm.destroy": {
      "uri": "api\/v1\/hrm\/{hrm}",
      "methods": ["DELETE"],
      "parameters": ["hrm"]
    },
    "employees": {
      "uri": "hrm\/employees",
      "methods": ["GET", "HEAD"]
    },
    "employee-store": {
      "uri": "hrm\/employee-store",
      "methods": ["POST"]
    },
    "employee.edit": {
      "uri": "hrm\/employee-edit\/{id}",
      "methods": ["GET", "HEAD"],
      "parameters": ["id"]
    },
    "employee.update": {
      "uri": "hrm\/employee-update",
      "methods": ["POST"]
    },
    "employee.delete": {
      "uri": "hrm\/employee-delete\/{id}",
      "methods": ["GET", "HEAD"],
      "parameters": ["id"]
    },
    "departments": {
      "uri": "hrm\/departments",
      "methods": ["GET", "HEAD"]
    },
    "department-store": {
      "uri": "hrm\/department-store",
      "methods": ["POST"]
    },
    "department.edit": {
      "uri": "hrm\/department-edit\/{id}",
      "methods": ["GET", "HEAD"],
      "parameters": ["id"]
    },
    "department.update": {
      "uri": "hrm\/department-update\/{id}",
      "methods": ["PATCH"],
      "parameters": ["id"]
    },
    "department.delete": {
      "uri": "hrm\/department-delete\/{id}",
      "methods": ["GET", "HEAD"],
      "parameters": ["id"]
    },
    "positions": {
      "uri": "hrm\/positions",
      "methods": ["GET", "HEAD"]
    },
    "position-store": {
      "uri": "hrm\/position-store",
      "methods": ["POST"]
    },
    "position.edit": {
      "uri": "hrm\/position-edit\/{id}",
      "methods": ["GET", "HEAD"],
      "parameters": ["id"]
    },
    "position.update": {
      "uri": "hrm\/position-update\/{id}",
      "methods": ["PATCH"],
      "parameters": ["id"]
    },
    "position.delete": {
      "uri": "hrm\/position-delete\/{id}",
      "methods": ["GET", "HEAD"],
      "parameters": ["id"]
    },
    "job-titles": {
      "uri": "hrm\/job-titles",
      "methods": ["GET", "HEAD"]
    },
    "job-title-store": {
      "uri": "hrm\/job-title-store",
      "methods": ["POST"]
    },
    "job-title.edit": {
      "uri": "hrm\/job-title-edit\/{id}",
      "methods": ["GET", "HEAD"],
      "parameters": ["id"]
    },
    "job-title.update": {
      "uri": "hrm\/job-title-update\/{id}",
      "methods": ["PATCH"],
      "parameters": ["id"]
    },
    "job-title.delete": {
      "uri": "hrm\/job-title-delete\/{id}",
      "methods": ["GET", "HEAD"],
      "parameters": ["id"]
    },
    "api.inventory.index": {
      "uri": "api\/v1\/inventory",
      "methods": ["GET", "HEAD"]
    },
    "api.inventory.store": {
      "uri": "api\/v1\/inventory",
      "methods": ["POST"]
    },
    "api.inventory.show": {
      "uri": "api\/v1\/inventory\/{inventory}",
      "methods": ["GET", "HEAD"],
      "parameters": ["inventory"]
    },
    "api.inventory.update": {
      "uri": "api\/v1\/inventory\/{inventory}",
      "methods": ["PUT", "PATCH"],
      "parameters": ["inventory"]
    },
    "api.inventory.destroy": {
      "uri": "api\/v1\/inventory\/{inventory}",
      "methods": ["DELETE"],
      "parameters": ["inventory"]
    },
    "inventory.index": {
      "uri": "inventory",
      "methods": ["GET", "HEAD"]
    },
    "inventory.create": {
      "uri": "inventory\/create",
      "methods": ["GET", "HEAD"]
    },
    "inventory.store": {
      "uri": "inventory",
      "methods": ["POST"]
    },
    "inventory.show": {
      "uri": "inventory\/{inventory}",
      "methods": ["GET", "HEAD"],
      "parameters": ["inventory"]
    },
    "inventory.edit": {
      "uri": "inventory\/{inventory}\/edit",
      "methods": ["GET", "HEAD"],
      "parameters": ["inventory"]
    },
    "inventory.update": {
      "uri": "inventory\/{inventory}",
      "methods": ["PUT", "PATCH"],
      "parameters": ["inventory"]
    },
    "inventory.destroy": {
      "uri": "inventory\/{inventory}",
      "methods": ["DELETE"],
      "parameters": ["inventory"]
    },
    "api.people.index": {
      "uri": "api\/v1\/people",
      "methods": ["GET", "HEAD"]
    },
    "api.people.store": {
      "uri": "api\/v1\/people",
      "methods": ["POST"]
    },
    "api.people.show": {
      "uri": "api\/v1\/people\/{person}",
      "methods": ["GET", "HEAD"],
      "parameters": ["person"]
    },
    "api.people.update": {
      "uri": "api\/v1\/people\/{person}",
      "methods": ["PUT", "PATCH"],
      "parameters": ["person"]
    },
    "api.people.destroy": {
      "uri": "api\/v1\/people\/{person}",
      "methods": ["DELETE"],
      "parameters": ["person"]
    },
    "people.index": {
      "uri": "people",
      "methods": ["GET", "HEAD"]
    },
    "people.create": {
      "uri": "people\/create",
      "methods": ["GET", "HEAD"]
    },
    "people.store": {
      "uri": "people",
      "methods": ["POST"]
    },
    "people.show": {
      "uri": "people\/{person}",
      "methods": ["GET", "HEAD"],
      "parameters": ["person"]
    },
    "people.edit": {
      "uri": "people\/{person}\/edit",
      "methods": ["GET", "HEAD"],
      "parameters": ["person"]
    },
    "people.update": {
      "uri": "people\/{person}",
      "methods": ["PUT", "PATCH"],
      "parameters": ["person"]
    },
    "people.destroy": {
      "uri": "people\/{person}",
      "methods": ["DELETE"],
      "parameters": ["person"]
    },
    "api.purchase.index": {
      "uri": "api\/v1\/purchase",
      "methods": ["GET", "HEAD"]
    },
    "api.purchase.store": {
      "uri": "api\/v1\/purchase",
      "methods": ["POST"]
    },
    "api.purchase.show": {
      "uri": "api\/v1\/purchase\/{purchase}",
      "methods": ["GET", "HEAD"],
      "parameters": ["purchase"]
    },
    "api.purchase.update": {
      "uri": "api\/v1\/purchase\/{purchase}",
      "methods": ["PUT", "PATCH"],
      "parameters": ["purchase"]
    },
    "api.purchase.destroy": {
      "uri": "api\/v1\/purchase\/{purchase}",
      "methods": ["DELETE"],
      "parameters": ["purchase"]
    },
    "purchase.index": {
      "uri": "purchase",
      "methods": ["GET", "HEAD"]
    },
    "purchase.create": {
      "uri": "purchase\/create",
      "methods": ["GET", "HEAD"]
    },
    "purchase.store": {
      "uri": "purchase",
      "methods": ["POST"]
    },
    "purchase.show": {
      "uri": "purchase\/{purchase}",
      "methods": ["GET", "HEAD"],
      "parameters": ["purchase"]
    },
    "purchase.edit": {
      "uri": "purchase\/{purchase}\/edit",
      "methods": ["GET", "HEAD"],
      "parameters": ["purchase"]
    },
    "purchase.update": {
      "uri": "purchase\/{purchase}",
      "methods": ["PUT", "PATCH"],
      "parameters": ["purchase"]
    },
    "purchase.destroy": {
      "uri": "purchase\/{purchase}",
      "methods": ["DELETE"],
      "parameters": ["purchase"]
    },
    "api.sale.index": {
      "uri": "api\/v1\/sale",
      "methods": ["GET", "HEAD"]
    },
    "api.sale.store": {
      "uri": "api\/v1\/sale",
      "methods": ["POST"]
    },
    "api.sale.show": {
      "uri": "api\/v1\/sale\/{sale}",
      "methods": ["GET", "HEAD"],
      "parameters": ["sale"]
    },
    "api.sale.update": {
      "uri": "api\/v1\/sale\/{sale}",
      "methods": ["PUT", "PATCH"],
      "parameters": ["sale"]
    },
    "api.sale.destroy": {
      "uri": "api\/v1\/sale\/{sale}",
      "methods": ["DELETE"],
      "parameters": ["sale"]
    },
    "sale.index": {
      "uri": "sale",
      "methods": ["GET", "HEAD"]
    },
    "sale.create": {
      "uri": "sale\/create",
      "methods": ["GET", "HEAD"]
    },
    "sale.store": {
      "uri": "sale",
      "methods": ["POST"]
    },
    "sale.show": {
      "uri": "sale\/{sale}",
      "methods": ["GET", "HEAD"],
      "parameters": ["sale"]
    },
    "sale.edit": {
      "uri": "sale\/{sale}\/edit",
      "methods": ["GET", "HEAD"],
      "parameters": ["sale"]
    },
    "sale.update": {
      "uri": "sale\/{sale}",
      "methods": ["PUT", "PATCH"],
      "parameters": ["sale"]
    },
    "sale.destroy": {
      "uri": "sale\/{sale}",
      "methods": ["DELETE"],
      "parameters": ["sale"]
    },
    "api.setting.index": {
      "uri": "api\/v1\/setting",
      "methods": ["GET", "HEAD"]
    },
    "api.setting.store": {
      "uri": "api\/v1\/setting",
      "methods": ["POST"]
    },
    "api.setting.show": {
      "uri": "api\/v1\/setting\/{setting}",
      "methods": ["GET", "HEAD"],
      "parameters": ["setting"]
    },
    "api.setting.update": {
      "uri": "api\/v1\/setting\/{setting}",
      "methods": ["PUT", "PATCH"],
      "parameters": ["setting"]
    },
    "api.setting.destroy": {
      "uri": "api\/v1\/setting\/{setting}",
      "methods": ["DELETE"],
      "parameters": ["setting"]
    },
    "setting.index": {
      "uri": "setting",
      "methods": ["GET", "HEAD"]
    },
    "setting.create": {
      "uri": "setting\/create",
      "methods": ["GET", "HEAD"]
    },
    "setting.store": {
      "uri": "setting",
      "methods": ["POST"]
    },
    "setting.show": {
      "uri": "setting\/{setting}",
      "methods": ["GET", "HEAD"],
      "parameters": ["setting"]
    },
    "setting.edit": {
      "uri": "setting\/{setting}\/edit",
      "methods": ["GET", "HEAD"],
      "parameters": ["setting"]
    },
    "setting.update": {
      "uri": "setting\/{setting}",
      "methods": ["PUT", "PATCH"],
      "parameters": ["setting"]
    },
    "setting.destroy": {
      "uri": "setting\/{setting}",
      "methods": ["DELETE"],
      "parameters": ["setting"]
    },
    "api.website.index": {
      "uri": "api\/v1\/website",
      "methods": ["GET", "HEAD"]
    },
    "api.website.store": {
      "uri": "api\/v1\/website",
      "methods": ["POST"]
    },
    "api.website.show": {
      "uri": "api\/v1\/website\/{website}",
      "methods": ["GET", "HEAD"],
      "parameters": ["website"]
    },
    "api.website.update": {
      "uri": "api\/v1\/website\/{website}",
      "methods": ["PUT", "PATCH"],
      "parameters": ["website"]
    },
    "api.website.destroy": {
      "uri": "api\/v1\/website\/{website}",
      "methods": ["DELETE"],
      "parameters": ["website"]
    },
    "website.index": {
      "uri": "website",
      "methods": ["GET", "HEAD"]
    },
    "website.create": {
      "uri": "website\/create",
      "methods": ["GET", "HEAD"]
    },
    "website.store": {
      "uri": "website",
      "methods": ["POST"]
    },
    "website.show": {
      "uri": "website\/{website}",
      "methods": ["GET", "HEAD"],
      "parameters": ["website"]
    },
    "website.edit": {
      "uri": "website\/{website}\/edit",
      "methods": ["GET", "HEAD"],
      "parameters": ["website"]
    },
    "website.update": {
      "uri": "website\/{website}",
      "methods": ["PUT", "PATCH"],
      "parameters": ["website"]
    },
    "website.destroy": {
      "uri": "website\/{website}",
      "methods": ["DELETE"],
      "parameters": ["website"]
    }
  }
};
if (typeof window !== 'undefined' && typeof window.Ziggy !== 'undefined') {
  Object.assign(Ziggy.routes, window.Ziggy.routes);
}
export {
  Ziggy
};