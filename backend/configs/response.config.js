const responseList = {
    NOT_FOUND: "Endpoint leads to nowhere!",
    BAD_REQUEST: "There is a problem with your request",
    CREATED_SUCCESS: "Successfully created!",
    DELETED_SUCCESS: "Deleted successfully!",
    DELETED_FAILED: "Failed to delete!",
    USER_PASSWORD_ERROR: "User and/or password is incorrect!",
    DUPLICATE_USERNAME_EMAIL: "Username or email is duplicate",
    MISSING_USERNAME_PASSWORD: "Missing username or password in body",
    MISSING_TOKEN: "Missing token in header",
    INVALID_TOKEN: "Invalid token",
    SOMETHING_WRONG: "Something went wrong"
}

module.exports = responseList