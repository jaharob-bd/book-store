export const modules = [
    {
        id: 1,
        menu_icon: "ri-home-2-line",
        menu_name: "dashboard",
        route: "dashboard"
    },
    {
        id: 2,
        menu_icon: "ri-flashlight-line",
        menu_name: "catalog",
        route: null,
        submenu: [
            {
                id: 1,
                parent_id: 2,
                menu_name: "products",
                controller_name: "ProductController",
                route: "products"
            },
            {
                id: 2,
                parent_id: 2,
                menu_name: "categories",
                controller_name: "ProductCommonController",
                route: "categories"
            },
            {
                id: 3,
                parent_id: 2,
                menu_name: "attributes",
                controller_name: "ProductCommonController",
                route: "attributes"
            },
            {
                id: 4,
                parent_id: 2,
                menu_name: "attribute-values",
                controller_name: "ProductCommonController",
                route: "attribute-values"
            },
            {
                id: 5,
                parent_id: 2,
                menu_name: "specifications",
                controller_name: "ProductCommonController",
                route: "specifications"
            },
            {
                id: 6,
                parent_id: 2,
                menu_name: "tags",
                controller_name: "ProductCommonController",
                route: "tags"
            },
            {
                id: 7,
                parent_id: 2,
                menu_name: "brands",
                controller_name: "ProductCommonController",
                route: "brands"
            }
        ]
    },
    {
        id: 3,
        menu_icon: "ri-flashlight-line",
        menu_name: "peoples",
        route: null,
        submenu: [
            {
                id: 1,
                parent_id: 3,
                menu_name: "customers",
                controller_name: "",
                route: "customers"
            },
            {
                id: 2,
                parent_id: 3,
                menu_name: "groups",
                controller_name: "",
                route: "customer-groups"
            },
            {
                id: 3,
                parent_id: 3,
                menu_name: "suppliers",
                controller_name: "",
                route: "suppliers"
            }
        ]
    },
    {
        id: 4,
        menu_icon: "ri-flashlight-line",
        menu_name: "purchase",
        route: null,
        submenu: [
            {
                id: 1,
                parent_id: 4,
                menu_name: "purchases",
                controller_name: "",
                route: "purchases"
            },
            {
                id: 2,
                parent_id: 4,
                menu_name: "purchase lists",
                controller_name: "",
                route: "purchase-lists"
            }
        ]
    },
    {
        id: 5,
        menu_icon: "ri-instance-line",
        menu_name: "sales",
        route: null,
        submenu: [
            {
                id: 1,
                parent_id: 5,
                menu_name: "order lists",
                controller_name: "",
                route: "orders"
            },
            {
                id: 2,
                parent_id: 5,
                menu_name: "order create",
                controller_name: "",
                route: "order.create"
            },
            {
                id: 3,
                parent_id: 5,
                menu_name: "shipments",
                controller_name: "",
                route: "order.shipments"
            },
            {
                id: 5,
                parent_id: 5,
                menu_name: "refunds",
                controller_name: "",
                route: "order.create"
            },
            {
                id: 5,
                parent_id: 5,
                menu_name: "transactions",
                controller_name: "",
                route: "order.create"
            }
        ]
    },
    {
        id: 6,
        menu_icon: "ri-store-line",
        menu_name: "inventory",
        route: null,
        submenu: [
            {
                id: 1,
                parent_id: 6,
                menu_name: "stock",
                controller_name: "",
                route: "stocks"
            },
            {
                id: 6,
                parent_id: 3,
                menu_name: "movement",
                controller_name: "",
                route: "stock-movements"
            }
        ]
    },
    {
        id: 6,
        menu_icon: "ri-user-line",
        menu_name: "HRM",
        route: null,
        submenu: [
            {
                id: 1,
                parent_id: 6,
                menu_name: "employee",
                controller_name: "",
                route: "employees"
            },
            {
                id: 2,
                parent_id: 6,
                menu_name: "Department",
                controller_name: "",
                route: "departments"
            },
            {
                id: 3,
                parent_id: 6,
                menu_name: "Position",
                controller_name: "",
                route: "positions"
            },
            {
                id: 4,
                parent_id: 6,
                menu_name: "Job-title",
                controller_name: "",
                route: "job-titles"
            }
        ]
    },
    {
        id: 7,
        menu_icon: "ri-settings-5-line",
        menu_name: "setting",
        route: null,
        submenu: []
    },
    {
        id: 8,
        menu_icon: "ri-secure-payment-line",
        menu_name: "security",
        route: null,
        submenu: []
    }
]