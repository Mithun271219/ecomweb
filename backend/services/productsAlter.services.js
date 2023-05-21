
module.exports = {
    async postproducts(req, res) {
        try {
            let stampedData = req.body.map(product => {
                return { ...product, timeStamp: new Date().toLocaleString() }
            })
            let data = await this.products.insertMany(stampedData)
            res.json({ message: 'products details uploaded' })
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "error while posting products data" })
        }
    }
}