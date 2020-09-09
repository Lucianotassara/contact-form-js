import express from 'express';
var consultaMailer = require('../utils/mailer');

var mongoose = require('mongoose');
var ConsultaSchema = require('../database/consulta.model')
var Consulta = mongoose.model('Consulta', ConsultaSchema);

const consultaController = express.Router();


/**
 * GET/
 * retrieve and display all consultas
 */
consultaController.route('/consultas').get(
  (req, res) => {
    Consulta.find({ }, function(err, n) {
       if (err)
         res.send(err);
       res.json(n);
     });
  }
);
 
/**
 * GET/
 * retrieve and display one consultas
 */
consultaController.route('/consultas/:consultaId').get(
    (req, res) => {
      Consulta.findById(req.params.consultaId, function(err, n) {
        if (err)
          res.send(err);
        res.json(n);
      });
    
    }
  );


/**
 * POST/
 * Agregar un consulta en el modelo Consulta
 */
consultaController.route('/consultas').post(
    async (req, res) => 
    {
      var new_consulta = new Consulta(req.body);
      new_consulta.save(function(err, n) {
        if (err)
          res.send(err);
        res.json(n);
    
      });
       
      let receiverMail
      try{
        receiverMail = await consultaMailer.armarMailReceiver(req.body);
        console.log(receiverMail);
      }catch{
        console.error();
      }

      // Enviar mail persona...
      try{
        mail = await consultaMailer.enviarMail(receiverMail);
        console.log(mail);
      }catch{
        console.error();
      }

      // Armar mail persona...
      if(req.body.email != null && req.body.email != ""){
        let responseToSenderMail
        try{
          responseToSenderMail = await consultaMailer.armarMailSender(req.body);
          console.log(responseToSenderMail);
        }catch{
          console.error();
        }

        // Enviar mail persona...
        try{
          mail = await consultaMailer.enviarMail(responseToSenderMail);
          console.log(mail);
        }catch{
          console.error();
        }
      }

    }
  );

/**
 * PUT/
 * Agregar un consulta en el modelo Consulta
 */
consultaController.route('/consultas/:consultaId').put(
    async (req, res) => 
    {
    mongoose.set('useFindAndModify', true); 
    Consulta.findOneAndUpdate({_id: req.params.consultaId}, req.body, {new: true}, function(err, n) {
      if (err)
        res.send(err);
      res.json(n);
      });  
    }
  );

  /**
 * DELETE/
 * Borrar un consulta del modelo Consulta
 */
consultaController.route('/consultas/:consultaId').delete(
    async (req, res) => 
    {
      Consulta.remove({
        _id: req.params.consultaId
      }, function(err, n) {
        if (err)
          res.send(err);
        res.json({ message: 'Consulta successfully deleted' });
      });    
    }
  );




export default consultaController;
