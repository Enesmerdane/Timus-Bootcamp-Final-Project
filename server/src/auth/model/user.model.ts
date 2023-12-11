export class User {
    constructor(
        private readonly username: String,
        private readonly email: String,
        private readonly hashedPassword: String,
        private readonly role: Number,
        private readonly creation_date: Date,
    ) {}

    getUserName(): String {
        return this.username;
    }

    getEmail(): String {
        return this.email;
    }

    getHashedPassword(): String {
        return this.hashedPassword;
    }

    getRole(): Number {
        return this.role;
    }
}
