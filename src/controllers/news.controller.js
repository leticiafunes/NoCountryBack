const newsCtrl = {};
const PortalNew = require("../models/PortalNew");


newsCtrl.createNew = async (req, res) => {

  const { title, subtitle, media_name, media_type, new_date, imgUrl, info } =  req.body;
  
  //Si viene un archivo adjunto, es en este parámetro
 
 

    let messages = [];
   

    const portalNew = new PortalNew({
        title,
        subtitle,
        new_date, 
        media_name, 
        media_type, 
        imgUrl, 
        info
      });
      /*
      if (req.file) {
        const {filename} = req.file
        portalNew.setImgUrl (filename);
      }
      */
      await portalNew.save((err) => {
        if (err)
          return res
            .status(500)
            .send({ message: `Error creating new: ${err}` });

        messages.push({ type: "ok", text: "New created." });
        return res.json({ messages});
       } )
    };

newsCtrl.updateNew = async (req, res) => {

    const { title, subtitle,  media_name, media_type, new_date, imgUrl, info } =  req.body;
    const filter = { _id: req.params.id };
   

    let messages = [];
    
    const result = PortalNew.findOneAndUpdate(
        filter,
        {title, subtitle, new_date, media_name, media_type, imgUrl, info},
        (err,  {title, subtitle, new_date, media_name, media_type, imgUrl, info}) => {
          if (err)
            return res
              .status(500)
              .send({ message: `Error updating new: ${err}` });
          messages.push({ type: "ok", text: "new updated." });
          res.json(messages,title, subtitle, new_date, media_name, media_type, imgUrl, info);
        }
      );
    };


  newsCtrl.getNews = async (req, res) => {
    const news = await PortalNew.find();
    res.json(news);
  };
  
  newsCtrl.deleteNew = async (req, res) => {
    await PortalNew.findByIdAndDelete(req.params.id);
    res.json({ message: ["New Deleted. Id: " + req.params.id] });
  };

  newsCtrl.deleteAllNew = async (req, res) => {
    await PortalNew.deleteMany();
    res.json({ message: ["All New Deleted."] });
  };
  
  newsCtrl.getNew = async (req, res) => {
    const noticia = await PortalNew.findById(req.params.id);
    res.json(noticia);
  };


  
  newsCtrl.getNewsByDate = async (req, res) => {
    
    console.log (req.query);
    const start  = req.query.fechainicio;
    const end  = req.query.fechafin; 
   
    const data = await PortalNew.find({
            "createdAt": {
              '$gte': `${start}T00:00:00.000Z`,
              '$lt': `${end}T23:59:59.999Z`
            }
          });
          res.json(data);

      
  };
  
  newsCtrl.getNewsByPublicDate = async (req, res) => {


    const start  = req.query.fechainicio;
    const end  = req.query.fechafin; 
  
    const data = await PortalNew.find({
            "new_date": {
              '$gte': `${start}T00:00:00.000Z`,
              '$lt': `${end}T23:59:59.999Z`
            }
          });
          res.json(data);
      
  };


module.exports = newsCtrl;