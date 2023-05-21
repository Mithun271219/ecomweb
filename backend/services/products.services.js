
module.exports = {
    async getAllProducts(req, res) {
        try {
            let products = await this.products.find().toArray();
            res.json(products)
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "error while fetch products" })
        }
    },
    async getproductbyid(req, res) {
        try {
            let id = Number(req.params.id)
            let product = await this.products.findOne({ id: id })
            res.json(product)
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "error while getting product details" })
        }
    },
    async getProductsByCategory(req, res) {
        try {
            let category = req.query.category;
            let prod = await this.products.find({ category: category }).toArray();
            res.json(prod);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "error while getting products category" })
        }
    }
}