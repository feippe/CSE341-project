const mongoose = require('mongoose');
const { Schema } = mongoose;

const clientSchema = new Schema({
    clientId: { type: String, required: true, unique: true },
    clientSecret: { type: String, required: true },
    grants: [String],
    redirectUris: [String],
});

const tokenSchema = new Schema({
    accessToken: { type: String, required: true },
    accessTokenExpiresAt: { type: Date, required: true },
    client: { type: Schema.Types.ObjectId, ref: 'Client', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const Client = mongoose.model('Client', clientSchema);
const Token = mongoose.model('Token', tokenSchema);
const User = mongoose.model('User', userSchema);

const oauth = {
    getAccessToken: async (accessToken) => {
        return await Token.findOne({ accessToken }).populate('client user').lean();
    },
    getClient: async (clientId, clientSecret) => {
        const query = clientSecret ? { clientId, clientSecret } : { clientId };
        const client = await Client.findOne(query).lean();

        if (!client) return null;

        return {
            id: client._id,
            grants: client.grants,
            redirectUris: client.redirectUris,
        };
    },

    saveToken: async (token, client, user) => {
        const tokenDoc = new Token({
            accessToken: token.accessToken,
            accessTokenExpiresAt: token.accessTokenExpiresAt,
            client: client._id,
            user: user._id,
        });
        await tokenDoc.save();
        return {
            accessToken: token.accessToken,
            accessTokenExpiresAt: token.accessTokenExpiresAt,
            client: client,
            user: user,
        };
    },
    getUser: async (username, password) => {
        return await User.findOne({ username, password }).lean();
    }
};

module.exports = oauth;
