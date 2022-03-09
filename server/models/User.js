const {Schema, model} = require ('mongoose'); 

const userSchema = new Schema  ({
   
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    }, 
    nombre: {
        type: String,
        trim: true
    }, 
    apellido: {
        type: String,
        trim: true
    }, 
    password: {
        type: String,
        required: true,
        trim: true
    },
    
    nivel: {
        type: String,
        required: true,
        trim: true
    }},
    { timestamps: true}
    


    );

module.exports =  model ('User', userSchema);
