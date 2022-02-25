const {Schema, model} = require ('mongoose'); 
const bcrypt = require ('bcryptjs');

const userSchema = new Schema  ({
   
    username: {
        type: String,
        required: true,
        trim: true
       
    }, 
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    }, 

    name: {
        type: String,
        trim: true
    }, 
    lastname: {
        type: String,
        trim: true
    }, 
    password: {
        type: String,
        required: true,
        trim: true
    },
    
    role: {
        type: String,
        required: true,
        trim: true
    }},
    { timestamps: true}
    
    );

userSchema.methods.encryptPassword = async password => {
    const salt = await bcrypt.genSalt (10);
    return await bcrypt.compare (password, salt);

}


//Compara datos cifrados...no strings. Si hay algún dato de prueba sin cifrar guardado dará error.
userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, password);
};

module.exports =  model ('User', userSchema);
