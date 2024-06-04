const fs = require('fs')
const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

exports.getAllTours =  (req, res)=>{

    res.status(200).json({
        status:'success',
        results: tours.length,
        data: tours
    })
};


//Param Middleware
exports.checkID =(req, res, next, val)=>{

    if(val > tours.length){
        return res.status(404).json({
            status:'fail',
            message:'Invalid ID'
        })
    }

    next();
}

//Check body middleware
exports.checkBody = (req, res, next)=>{

    if(!req.body.name || !req.body.price){
        return res.status(400).json({
            status:'fail',
            message: 'Missing name or price'
        })
    };

    next();
}

exports.getOneTour = (req, res)=>{
   
    //line below converts string to a number by multiplying one
    const id = req.params.id * 1;
    const tour = tours.find(el => el.id == req.params.id);
 
    res.status(200).json({
         status:'success',
         data:{
           tour
         }
    })
 };
 
 exports.createATour = (req, res)=>{
    
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

exports.updateTour =  (req, res)=>{

   res.status(200).json({
        status:'success',
        data:{
            tour:'<Updated Tour Here>'
        }
    })
};

exports.deleteTour = (req, res)=>{

    res.status(204).json({
        status:'No Content',
        data:null
    })
}