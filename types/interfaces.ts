interface IUser {
    fullName: string;
    email: String,
    hash_password: String,
    role: String,
    createdAt: Date
}

interface IUserMethods {
    comparePassword(password: String): Boolean
    isAdmin(): Boolean
}