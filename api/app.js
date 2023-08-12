const express = require('express');
const app = express();
const {mongoose} = require('./db/mongoose');
const bodyParser = require('body-parser');

//load middleware
app.use(bodyParser.json());


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token, _id");

    res.header(
        'Access-Control-Expose-Headers',
        'x-access-token, x-refresh-token'
    );

    next();
});


//Load in mongoose models
const{List,Task}=require('./db/models');

/*Route Handle*/

/*List Routes*/


/**
 * GET /lists
 * Purpose:Get all lists
 */
app.get('/lists',(req,res)=>{
   // res.send("Hello World!");
   //we want to return all the array of all the lists in database
   List.find({}).then((lists)=>{
    res.send(lists);
   });
})

/**
 * POST /lists
 * Purpose:Create a list
 */
app.post('/lists',(req,res)=>{
    //We want to create a new list and return the new list documnet back to the user (which includes id)
    //The list information(fields) will be passed in via the JSON request body
    let tittle = req.body.tittle;
    let newList = new List({
        tittle
    });
    newList.save().then((listDoc)=>{
        //the full list document is returned(incl. id)
        res.send(listDoc);
    });
})
/**
 * PATCH /lists/:id
 * Purpose:Update specified list
 */
app.patch('/lists/:ID',(req,res)=>{
    //We want to update thespecified list(list document with id in the URL) with the new values specified in the JSON body of the request
    List.findOneAndUpdate({_id: req.params.ID},{
        $set: req.body
    }).then(()=>{
        res.send({message:'Updated Successfully'});
    });
});


app.delete('/lists/:ID',(req,res)=>{
    //We want to delete the specified lists
    List.findOneAndDelete({
        _id: req.params.ID
    }).then((removedListDoc)=>{
        res.send(removedListDoc)
    });
});
/**
 * GET /lists/:listID/tasks
 * Purpose: Get all the tasks that belongs to a specific list(specified by listID)
 */
app.get('/lists/:listID/tasks',(req,res)=>{
    //return all the taska for this list
    Task.find({
        _listID:req.params.listID
    }).then((tasks)=>{
        res.send(tasks);
    })
});

app.get('/lists/:listID/tasks/:taskID',(req,res)=>{
    Task.find({
        _id:req.params.taskID,
        _listID: req.params.listID
    }).then((task)=>{
        res.send(task);
    })
});


app.post('/lists/:listID/tasks',(req,res)=>{
    //create new tasks in list
    let newTask=new Task({
        tittle:req.body.tittle,
        _listID:req.params.listID,
        description:req.body.description,
        dueDate:req.body.dueDate

    });
    newTask.save().then((newTaskDoc)=>{
        res.send(newTaskDoc);
    })
});

app.patch('/lists/:listID/tasks/:taskID',(req,res)=>{
    Task.findOneAndUpdate({
        _id:req.params.taskID,
        _listID:req.params.listID
    },{
        $set:req.body
    }).then(()=>{
        res.send({message: 'updated successfully'});
    })
});

app.delete('/lists/:listID/tasks/:taskID',(req,res)=>{
    Task.findOneAndDelete({
        _id:req.params.taskID,
        _listID:req.params.listID
    }).then((removedTaskDoc)=>{
        res.send(removedTaskDoc);
    })
});


app.listen(3000,()=>{
    console.log("Server is listening in port 3000");
})