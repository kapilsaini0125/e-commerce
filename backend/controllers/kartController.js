import KartItem from "../db/KartItem.js";


export const addKart = async (req, res) => {
    console.log("Received add to kart request:" )
    const  productUser  = req.body.new_id;
    console.log("Product User:", productUser);
    try {
        const newKartItem = new KartItem({
            userId: productUser,
            product: []
        });
        await newKartItem.save();
        console.log("Kart item added successfully:", newKartItem);    
        res.status(201).json({ message: 'Kart item added successfully', kartItem: newKartItem });
    } catch (error) {
        console.error('Error adding kart item:', error);
        res.status(500).json({ error: 'Error adding kart item' 
        });

    }
}


export const updateKart = async (req, res) => {
    console.log("on update Kart")
    
    const { currentProduct, productId, currentUser, products, count } = req.body;
    console.log("Current ProductId:", productId);  
    const productUser = await KartItem.findOne({ userId: currentUser });
   
    if(productUser.product.length === 0) {
        console.log("No products in kart");
        productUser.product.push({
            name: currentProduct.name,
            price: currentProduct.price,
            category: currentProduct.category,
            quantity: count, 
            productId: productId,
        });
        await productUser.save();
        console.log(productUser);
    }
    else {
        console.log("Products in kart:", productUser.product);
        const existingProductIndex = productUser.product.findIndex(item => item.productId === productId);
        if (existingProductIndex !== -1) {
            console.log("Product already exists in kart, updating quantity at", existingProductIndex);
            productUser.product[existingProductIndex].quantity += count;
            console.log("Updated product:", productUser.product[existingProductIndex]);
        }
        else {
            console.log("Product not found in kart");
            productUser.product.push({
                name: currentProduct.name,
                price: currentProduct.price,
                category: currentProduct.category,
                quantity: count, 
                productId: productId,
            });
            console.log("Added new product", currentProduct);
        }
        await productUser.save();
}
console.log("final kart item:", productUser)
}


export const showKart = async (req, res) => {
    const { productUser } = req.query;
    console.log(productUser);
    try {
        const kartItems = await KartItem.findOne({
            userId: productUser
        });
        console.log("Kart items:", kartItems.product);
        res.status(200).json({p: kartItems.product});
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
