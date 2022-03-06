const {Schema, model} = require ('mongoose'); 


const portalNewSchema = new Schema  ({
   
    title: {
        type: String,
        trim: true,
        required: true,
     
    }, 
    subtitle: {
        type: String,
        trim: true
    }, 

    media_name: {
        type: String,
        trim: true
    }, 

    media_type: {
        type: String,
        trim: true
    }, 
    new_date: {
        type: Date,
    }, 
    
    },
    { timestamps: true}
    
    );

    module.exports =  model ('PortalNew', portalNewSchema);
