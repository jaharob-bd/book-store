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
        "dashboard": {
            "uri": "dashboard",
            "methods": ["GET", "HEAD"]
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
            "uri": "product-update\/{id}",
            "methods": ["PATCH"],
            "parameters": ["id"]
        },
        "product-image-upload": {
            "uri": "product-image-upload\/{id}",
            "methods": ["POST"],
            "parameters": ["id"]
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
        "order-store": {
            "uri": "order-store",
            "methods": ["POST"]
        },
        "order-cancel": {
            "uri": "order-cancel",
            "methods": ["POST"]
        },
        "invoice-store": {
            "uri": "invoice-store",
            "methods": ["POST"]
        },
        "register": {
            "uri": "register",
            "methods": ["GET", "HEAD"]
        },
        "login": {
            "uri": "login",
            "methods": ["GET", "HEAD"]
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
        }
    }
};
if (typeof window !== 'undefined' && typeof window.Ziggy !== 'undefined') {
    Object.assign(Ziggy.routes, window.Ziggy.routes);
}
export {
    Ziggy
};
