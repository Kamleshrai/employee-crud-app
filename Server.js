const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();


app.use(cors());
app.use(express.json());


mongoose.connect('mongodb://127.0.0.1:27017/employeeDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'));


const employeeSchema = new mongoose.Schema({
  empId: String,
  name: String,
  dob: String,
  designation: String,
  contact: String
});


const Employee = mongoose.model('Employee', employeeSchema);


// Create Employee
app.post('/api/employees', async (req, res) => {
  const emp = new Employee(req.body);
  await emp.save();
  res.send({ message: 'Employee added' });
});


// Get all Employees
app.get('/api/employees', async (req, res) => {
  const employees = await Employee.find();
  res.send(employees);
});


app.listen(3000, () => console.log('Server running on port 3000'));

