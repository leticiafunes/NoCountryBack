const {Schema, model} = require ('mongoose'); 

const {appConfig} = require ('../config');


const portalAdvertisingSchema = new Schema  ({
   
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
    advertising_date: {
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


    module.exports =  model ('PortalAdvertising', portalAdvertisingSchema);
