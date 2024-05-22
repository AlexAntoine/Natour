const fs = require('fs')
const express = require('express');
const morgan = require('morgan');

const app = express();
const port = 3000;

// 1 Middlewares
app.use(morgan('dev'));

app.use(express.json());

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)) 

const getAllTours =  (req, res)=>{

    res.status(200).json({
        status:'success',
        results: tours.length,
        data: tours
    })
};

const getOneTour = (req, res)=>{
   
    //line below converts string to a number by multiplying one
    const id = req.params.id * 1;
    const tour = tours.find(el => el.id == req.params.id);
 
    if(id > tours.length){
     return res.status(404).json({
         status:'fail',
         message:'Invalid ID'
     })
    }
 
    res.status(200).json({
         status:'success',
         data:{
           tour
         }
    })
 }
const createATour = (req, res)=>{
    
    const newId = tours[tours.length -1].id+1;
    const newTour = Object.assign({id:newId}, req.body);

    tours.push(newTour);

    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err =>{
        res.status(201).send({
            status:'success',
            data:{
                tour:newTour
            }
        });
    });

}

const updateTour =  (req, res)=>{

    if(req.params.id *1 > tours.length){
      return  res.status(404).json({
            status:'fail',
            message:'Invalid ID'
        })
    }

   res.status(200).json({
        status:'success',
        data:{
            tour:'<Updated Tour Here>'
        }
    })
};

const deleteTour = (req, res)=>{

    if(req.params.id *1 > tours.length){
        return  res.status(404).json({
              status:'fail',
              message:'Invalid ID'
          })
      }

      
    res.status(204).json({
        status:'No Content',
        data:null
    })
}

app.route('/api/v1/tours').get(getAllTours).post(createATour);
app.route('/api/v1/tours/:id').get(getOneTour).patch(updateTour).delete(deleteTour);

app.listen(port,()=>{

    console.log(`Server is running on port ${port}`)
});