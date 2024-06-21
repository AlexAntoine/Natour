const { findByIdAndUpdate } = require('../model/tours');
const Tour = require('../model/tours');

exports.getAllTours = async(req, res)=>{

    try {
        const allTours = await Tour.find();

        res.status(200).json({
            status:'Success',
            count: allTours.length,
            data: allTours
        })
    } catch (error) {
        
        res.statu(404).json({
            status:'Fail',
            message: error
        })
    }
    
    
    
};

exports.getOneTour = async(req, res)=>{
   
    try {
        const tour  = await Tour.findById(req.params.id);

        res.status(200).json({
            status:'Success',
            data:{
                tour
            }
        });

    } catch (error) {
        res.status(404).json({
            status:'Fail',
            message:error
        })
    }
 };
 
 exports.createATour = async(req, res)=>{
    try {
        const newTour = await Tour.create(req.body);

        res.status(201).send({
            status:'success',
            data:{
                tour:newTour
            }
        });
    } catch (error) {
        res.status(400).json({
            status:'Fail',
            message:'Invalid Data Sent'
        })
    }

    
}

exports.updateTour =  async(req, res)=>{

    try {
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body,{
            new:true,
            runValidators:true
        });

        res.status(201).send({
            status:'success',
            data:{
                tour
            }
        });

    } catch (error) {
        console.log(error)
        res.status(400).json({
            status:'Fail',
            message:'Invalid Data Sent'
        })
    }
};

exports.deleteTour = async(req, res)=>{

    try {
         await Tour.findByIdAndDelete(req.parms.id,{
            new:true
        });

        res.status(204).send({
            status:'success',
            data:null
        });
    } catch (error) {
        console.log(error);
         
        res.status(400).json({
            status:'Fail',
            message:'Invalid Data Sent'
        })
    }
}