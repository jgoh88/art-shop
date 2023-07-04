const responseList = {
    NO_ENDPOINT: "Endpoint leads to nowhere!",
    BAD_REQUEST: "There is a problem with your request",
    CREATED_SUCCESS: "Successfully created!",
    SUCCESS: "Request successfully completed",
    DELETED_SUCCESS: "Deleted successfully!",
    DELETED_FAILED: "Failed to delete!",
    USER_PASSWORD_ERROR: "User and/or password is incorrect!",
    DUPLICATE_USERNAME_EMAIL: "Username or email is duplicate",
    MISSING_USERNAME_PASSWORD: "Missing username or password in body",
    MISSING_TOKEN: "Missing token in header",
    INVALID_TOKEN: "Invalid token",
    SOMETHING_WRONG: "Something went wrong",
    NO_STOCK: "Artwork sold or removed",
    NOT_FOUND: "Artwork not found",
    ALREADY_IN_CART: "Artwork already in cart",
}

module.exports = responseList