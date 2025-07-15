import KartItem from "../db/KartItem.js";


export const addKart = async (req, res) => {
    console.log("Received add to kart request:" )
    
    const {productUser, id} = req.body;
        console.log(productUser, id);
    try {
        const newKartItem = new KartItem({ productId: id, userId: productUser, quantity: 1, selected: true });
        await newKartItem.save();
        console.log( newKartItem);
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