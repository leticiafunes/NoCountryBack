const newsCtrl = {};
const PortalNew = require("../models/PortalNew");


newsCtrl.createNew = async (req, res) => {

  const { title, subtitle, image, media_name, media_type, new_date } =  req.body;
  
  //Si viene un archivo adjunto, es en este parámetro
 
 

    let messages = [];
   

    const portalNew = new PortalNew({
        title,
        subtitle,
        image,
        new_date, 
        media_name, 
        media_type 
      });

      if (req.file) {
        const {filename} = req.file
        portalNew.setImgUrl (filename);
      }

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

    const { title, subtitle, image, media_name, media_type, new_date } =  req.body;
    const filter = { _id: req.params.id };
    console.log (req.body);

    let messages = [];

   const portalNew = new PortalNew({
      title,
      subtitle,
      image,
      new_date, 
      media_name, 
      media_type 
    });

    const result = PortalNew.findOneAndUpdate(
        filter,
        {title, subtitle, image, new_date, media_name, media_type},
        (err, { title, subtitle, image, new_date, media_name, media_type }) => {
          if (err)
            return res
              .status(500)
              .send({ message: `Error updating new: ${err}` });
          messages.push({ type: "ok", text: "new updated." });
          res.json(messages);
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