const {Question} = require('../models/question');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


router.get(`/`, async (req, res) =>{
    const questionList = await Question.find();

    if(!questionList) {
        res.status(500).json({success: false})
    } 
    res.status(200).send(questionList);
})

router.get('/:id', async(req,res)=>{
    const question = await Question.findById(req.params.id);

    if(!question) {
        res.status(500).json({message: 'The question with the given ID was not found.'})
    } 
    res.status(200).send(category);
})



router.post('/', async (req,res)=>{
    let question = new Question({
        text: req.body.text,
        answer: req.body.answer,
      
    })
    question = await question.save();

    if(!question)
    return res.status(400).send('the question cannot be created!')

    res.send(question);
})


router.put('/:id',async (req, res)=> {
    const question = await Question.findByIdAndUpdate(
        req.params.id,
        {
            text: req.body.text,
        answer: req.body.answer,
      
        },
        { new: true}
    )

    if(!question)
    return res.status(400).send('the question cannot be created!')

    res.send(question);
})

router.delete('/:id', (req, res)=>{
   Question.findByIdAndRemove(req.params.id).then(category =>{
        if(question) {
            return res.status(200).json({success: true, message: 'the questiojn is deleted!'})
        } else {
            return res.status(404).json({success: false , message: "question is not found!"})
        }
    }).catch(err=>{
       return res.status(500).json({success: false, error: err}) 
    })
})

module.exports =router;