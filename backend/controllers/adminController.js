import Admin from '../db/Admin.js';

export const addAdmin = async (req, res) => {
    const  details = req.body;
   
   console.log("Admin Name:", details);
     
     const newAdmin= new Admin({
            adminName: details.name,
            adminPassword: details.password
        })
        console.log(newAdmin);
        await newAdmin.save();
        res.status(200).json(newAdmin);
          
    }

export const newAdmin = async (req, res) => {
    const variable= req.body;
    console.log("on new admin ", variable);
    
    try{const findAdmin= await Admin.findOne({
        adminName: variable.name,
        adminPassword: variable.password
    })
    console.log(findAdmin);
    res.status(200).json({name: findAdmin.adminName});
    }  
    catch(error){
        console.log(error);
    }  
}