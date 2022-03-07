const advertisementsCtrl = {};
const PortalAdvertising = require("../models/PortalAdvertising");


advertisementsCtrl.createAdvertising = async (req, res) => {

  const { title, subtitle, media_name, media_type, advertising_date, imgUrl } =  req.body;
  
  //Si viene un archivo adjunto, es en este parámetro
 
  console.log (req.body);

    let messages = [];
   

    const portalAdvertising= new PortalAdvertising({
        title,
        subtitle,
        advertising_date, 
        media_name, 
        media_type, 
        imgUrl
      });

      /*
      if (req.file) {
        const {filename} = req.file
        portalAdvertising.setImgUrl (filename);
      }
       */


      await portalAdvertising.save((err) => {
        if (err)
          return res
            .status(500)
            .send({ message: `Error creating advertising: ${err}` });

        messages.push({ type: "ok", text: "Advertising created." });
        return res.json({ messages});
       } )
    };






    advertisementsCtrl.updateAdvertising = async (req, res) => {

    const { title, subtitle,  media_name, media_type, advertising_date, imgUrl } =  req.body;
    const filter = { _id: req.params.id };
   

    let messages = [];
    
    const result = PortalAdvertising.findOneAndUpdate(
        filter,
        {title, subtitle, advertising_date, media_name, media_type, imgUrl},
        (err,  {title, subtitle, advertising_date, media_name, media_type, imgUrl}) => {
          if (err)
            return res
              .status(500)
              .send({ message: `Error updating advertising: ${err}` });
          messages.push({ type: "ok", text: "advertising updated." });
          res.json(messages,title, subtitle, advertising_date, media_name, media_type, imgUrl);
        }
      );
    };


    advertisementsCtrl.getAdvertisements = async (req, res) => {
    const advertisements = await PortalAdvertising.find();
    res.json(advertisements);
  };
  
  advertisementsCtrl.deleteAdvertising = async (req, res) => {
    await PortalAdvertising.findByIdAndDelete(req.params.id);
    res.json({ message: ["Advertising Deleted. Id: " + req.params.id] });
  };

  advertisementsCtrl.deleteAllAdvertisements= async (req, res) => {
    await PortalAdvertising.deleteMany();
    res.json({ message: ["All Advertising Deleted."] });
  };
  
  advertisementsCtrl.getAdvertising = async (req, res) => {
    const noticia = await PortalAdvertising.findById(req.params.id);
    res.json(noticia);
  };


  
  advertisementsCtrl.getAdvertisementsByDate = async (req, res) => {
    
 
    const start  = req.query.fechainicio;
    const end  = req.query.fechafin; 
   
    const data = await PortalAdvertising.find({
            "createdAt": {
              '$gte': `${start}T00:00:00.000Z`,
              '$lt': `${end}T23:59:59.999Z`
            }
          });
          res.json(data);
      
  };
  
  advertisementsCtrl.getAdvertisementsByPublicDate = async (req, res) => {


    const start  = req.query.fechainicio;
    const end  = req.query.fechafin; 
  
    const data = await PortalAdvertising.find({
            "advertising_date": {
              '$gte': `${start}T00:00:00.000Z`,
              '$lt': `${end}T23:59:59.999Z`
            }
          });
          res.json(data);
      
  };


module.exports = advertisementsCtrl;