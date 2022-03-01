const {Schema, model} = require ('mongoose'); 
const bcrypt = require ('bcryptjs'); //Encriptar las contraseñas

const userSchema = new Schema  ({
   
    username: {
        type: String,
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
        trim: true
    }},
    { timestamps: true}
    
    );


   /*Hook: Se ejecuta antes de crear un nuevo usuario*/

    userSchema.pre('save', async function (next) {
        const hash = await bcrypt.hash(this.password, 10)
        this.password = hash
        next()
    })
    
    userSchema.methods.isValidPassword = async function(password) {
        const user = this;
        const compare = await bcrypt.compare(password, user.password)
        return compare
    }


    userSchema.methods.encryptPassword = async password => {
        const salt = await bcrypt.genSalt (10);
        return await bcrypt.compare (password, salt);
    
    }
    
    
    //Compara datos cifrados...no strings. Si hay algún dato de prueba sin cifrar guardado dará error.
    userSchema.methods.matchPassword = async function (password) {
        const user = this;
        return await bcrypt.compare(password, user.password);
    };






module.exports =  model ('User', userSchema);
