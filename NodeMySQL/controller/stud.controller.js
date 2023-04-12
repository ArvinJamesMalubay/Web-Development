const pool = require("../database/index")
const studController = {

  //get all the student list
  getAll: async (req, res)  =>{
    try{
      const [rows, fields] = await pool.query("select *from students")
      res.json({
        student_data: rows
      })
    }
    catch(error){
      console.log(error)
      res.json({
        status: "error"
      })
    }
  },

  //get specific student by specifying id
  getById: async (req, res)  =>{
    try{
      const { id } = req.params
      const [rows, fields] = await pool.query("select *from students where id = ?", [id])
      res.json({
        student_data: rows
      })
    }
    catch(error){
      console.log(error)
      res.json({
        status: "error"
      })
    }
  },


  //create new student
  create: async (req, res)  =>{
    try{
      const { Firstname, Middlename, Lastname, gender, course, email } = req.body
      const sql = "insert into students (Firstname,Middlename,Lastname,gender,course,email) values(?,?,?,?,?,?)"
      const [rows, fields] = await pool.query(sql, [Firstname, Middlename, Lastname, gender, course, email])
      res.json({
        student_data: rows
      })
    }
    catch(error){
      console.log(error)
      res.json({
        status: "error"
      })
    }
  },

  
  //update specific student using id as params
  update: async (req, res)  =>{
    try{
      const { Firstname, Middlename, Lastname, gender, course, email } = req.body
      const { id } = req.params
      const sql = "update students set Firstname=?, Middlename=?, Lastname=?, gender=?, course=?, email=? where id=?"
      
      const [rows, fields] = await pool.query(sql, [Firstname, Middlename, Lastname, gender, course, email, id])
      res.json({
        student_data: rows
      })
    }
    catch(error){
      console.log(error)
      res.json({
        status: "error"
      })
    }
  },


  //delete student by id parameter
  delete: async (req, res)  =>{
    try{
      const { id } = req.params
      const [rows, fields] = await pool.query("delete from students where id = ?", [id])
      res.json({
        student_data: rows
      })
    }
    catch(error){
      console.log(error)
      res.json({
        status: "error"
      })
    }
  }
}

module.exports = studController