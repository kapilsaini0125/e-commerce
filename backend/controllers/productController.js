import Product from '../db/Product.js';


export const dashboardProducts = async (req, res) => {
    
    
    const sampleProducts= [
        { 
          name: "phone",
          price: "500",
          category: "electronics"
        },
        { 
          name: "laptop",
          price: "100",
          category: "electronics"
        },
        { 
          name: "watch",
          price: "8000",
          category: "electronics"
        },
        { 
          name: "Alexa",
          price: "4300",
          category: "electronics"
        }
    ]
    
    const result = await Product.insertMany(sampleProducts);
    
    res.json(result);

}

export const productDetails = async (req, res) => {
    const { currentProduct } = req.query;
    console.log("Current Product ID:", currentProduct);
    try {
        const product = await Product.findById(currentProduct);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        
        }
        console.log("Product details:", product);
        res.status(200).json(product);
}
    catch (error) {
        console.error('Error fetching product details:', error);
        res.status(500).json({ error: 'Error fetching product details' });
    }
}