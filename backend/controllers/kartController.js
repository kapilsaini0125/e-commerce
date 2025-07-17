import KartItem from "../db/KartItem.js";


export const addKart = async (req, res) => {
    console.log("Received add to kart request:" )
    
    const {productUser, id, product,  count} = req.body;
        console.log(productUser, id, product, count);
    try {
        const newKartItem = new KartItem({ productId: id, userId: productUser, quantity: count, selected: true, product: [{
            name: product.name,
            price: product.price,
            category: product.category
        }] });
        await newKartItem.save();
        console.log("product Kart:", newKartItem);
        res.status(201).json({ message: 'Product added to kart successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error adding product to kart' });
    }
    
}

export const showKart = async (req, res) => {
    const { productUser } = req.query;
    console.log(productUser);
    try {
        const kartItems = await KartItem.find({
            userId: productUser
 
        });
        console.log("Kart items:", kartItems);
        res.status(200).json(kartItems);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching kart items' });
    }
}

export const deleteKart = async (req, res) => {
    const { id } = req.params;
    console.log( id);
    try {
        const deletedItem = await KartItem.findByIdAndDelete(id);
        if (!deletedItem) {
            return res.status(404).json({ error: 'Kart item not found' });
        }
        console.log("Deleted kart item:", deletedItem);
        res.status(200).json({ message: 'Kart item deleted successfully' });
    } catch (error) {
        console.error('Error deleting kart item:', error);
        res.status(500).json({ error: 'Error deleting kart item' });
    }
}