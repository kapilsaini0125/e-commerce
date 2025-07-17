import Account from '../db/Account.js';

export const signupUser= async (req, res) => {
    const { name, password } = req.body;
    try {
        console.log("Received signup request:" )
        const newAccount = new Account({ userName: name, userPassword: password });
        await newAccount.save();
        res.status(201).json({ id: newAccount._id });
    } catch (error) {
        res.status(500).json({ error: 'Error creating account' });
    }
}


export const loginUser=  async (req, res) => {
    const checkUser = req.body;
    try {
        console.log("Received login request:", checkUser) // issue
        const user = await Account.findOne(
            { 
                userPassword: checkUser.password,
                userName: checkUser.name 
                }
        );
        console.log("User", user);
        
           res.status(200).json({ id: user ? user._id : null });
           
    } catch (error) {
        res.status(500).json({ error: 'Error logging in' });
    }

}