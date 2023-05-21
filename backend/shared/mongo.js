const { MongoClient } = require('mongodb');

module.exports = {
    db: null,
    products: null,
    users: null,

    async connect() {

        try {
            //mongo connection
            let client = new MongoClient(process.env.mongo_url);
            await client.connect();
            console.log('mongo connection success');

            //db connection
            this.db = await client.db(process.env.mongo_name);
            console.log(`connected to ${process.env.mongo_name}`);

            //paths
            this.products = await this.db.collection('products');
            this.users = await this.db.collection('users');
            console.log(`mogno collection initilized`);
        } catch (error) {
            throw new Error(error);
        }
    }
}