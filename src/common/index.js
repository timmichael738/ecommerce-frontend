const backendDomain = "http://localhost:8080";

const SummaryApi = {
    signUp : {
        url : backendDomain + "/api/signup",
        method : "post"
    },
    signIn : {
        url : backendDomain + "/api/signin",
        method : "post"
    },
    current_user : {
        url : backendDomain + "/api/user-details",
        method : "get"
    },
    userLogout : {
        url : backendDomain + "/api/userLogout",
        method: "get"
    },
    allUsers : {
        url : backendDomain + "/api/all-users",
        method: "get"
    },
    updateUser : {
        url : backendDomain + "/api/update-user",
        method: "post"
    },
    uploadProduct : {
        url : backendDomain + "/api/upload-product",
        method: "post"
    },
    fetchProducts : {
        url : backendDomain + "/api/get-products",
        method: "get"
    },
    updateProducts : {
        url : backendDomain + "/api/update-products",
        method: "post"
    },
    productCategory : {
        url : backendDomain + "/api/product-category",
        method: "get"
    },
    productDetails : {
        url : backendDomain + "/api/product-details",
        method: "post"
    },
    deleteProduct : {
        url : backendDomain + "/api/delete-product",
        method: "delete"
    },
    categoryWiseProduct : {
        url : backendDomain + "/api/category-product",
        method: "post"
    },
    addToCart : {
        url : backendDomain + "/api/addtocart",
        method: "post"
    },
    cartProductCount : {
        url : backendDomain + "/api/userProductInCartCounter",
        method: "get"
    }
}


export default SummaryApi