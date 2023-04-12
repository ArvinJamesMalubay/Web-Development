const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

// Parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to MongoDB
const PORT = process.env.PORT || 3000;
mongoose.set("strictQuery", false)
const db = 'mongodb://127.0.0.1:27017/database';
mongoose.connect(db);

if(db){
    console.log("Connected Successfully!");
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  }
else(err)=>{
    console.log(err)
}

// Create a Mongoose schema
const mySchema = new mongoose.Schema({
  FirstName: String,
  MiddleName: String,
  LastName: String,
  Course: String
});

// Define a model for your MongoDB collection
const studentList = mongoose.model('students', mySchema);

// welcome endpoints
app.get('/', (req, res) => {
  res.send('Hello!!');
});

// get all student lists
app.get('/students', async(req, res) => {
  try {
      const student = await studentList.find({});
      res.status(200).json(student);
  } catch (error) {
      res.status(500).json({message: error.message})
  }
})

// get  id
app.get('/students/:id', function (req, res) {
    const id = req.params.id;
    studentList.findById(id)
    .then(function(student){
      if(student){
      res.send(student);
      res.closed;
      }
      else
      { res.send('Not found!'); }
    });
});

// add
app.post('/students', (req, res) => {
  const { FirstName, MiddleName, LastName, Course } = req.body;
  const students = new studentList({ FirstName, MiddleName, LastName, Course });
  students.save()
    .then(() => {
      res.send('Added Successfully!')
      res.closed;
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    });
});


//update
app.put('/students/:id', function (req, res) {
  const id = req.params.id;
  const FirstName = req.body.FirstName;
  const MiddleName = req.body.MiddleName;
  const LastName = req.body.LastName;
  const Course = req.body.Course;
  studentList.findByIdAndUpdate( id, {FirstName, MiddleName, LastName, Course} )
  .then(function(student){
    if(student){
    res.send('Updated Successfully!');
    res.closed;
    }
    else
    { res.send('Not found!'); }
  });
});

// delete 
app.delete('/students/:id', function (req, res) {
  const id = req.params.id;
  studentList.findByIdAndRemove(id)
  .then(function(student){
    if(student){
    res.send('Deleted Successfully!');
    res.closed;
    }
    else
    { res.send('Not found!'); }
  });
});