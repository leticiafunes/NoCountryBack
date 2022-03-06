const {Schema, model} = require ('mongoose'); 

const {appConfig} = require ('../config');


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

    info: {
        type: String,
        
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

    imgUrl: {
        type: String,
        
    }
    
    },
    { timestamps: true}
    
    );
    

    /*
    portalNewSchema.methods.setImgUrl = function setImgUrl (filename) {
       //host + nombre de la imagen 
       const {host, port} = appConfig

       this.imgUrl = `${host}:${port}/public/${filename}`
    }*/


    module.exports =  model ('PortalNew', portalNewSchema);
