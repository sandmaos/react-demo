const express = require('express');
const app = express();
const cors = require('cors');
const Task = require('./models/task');
const logger = require('morgan');
const { Op } = require('sequelize')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get('/get', async (req, res) => {
    const result = await Task.findAll({
        where: {
            id: {
                [Op.gt]: 0,
            }
        }
    });
    res.json(result);
});

// update completed status by {pk}:id
app.put('/update/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const taskToUpdate = await Task.findByPk(id);
        if (taskToUpdate) {
            taskToUpdate.completed = !taskToUpdate.completed;
            await taskToUpdate.save();
            res.send('Task updated successfully');
        } else {
            res.send('Task not found.');
        }
    } catch (error) {
        res.send(error);
    }
});

// delete task by {pk}:id
app.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const taskToUpdate = await Task.findByPk(id);
        if (taskToUpdate) {
            await taskToUpdate.destroy();
            res.send('Task deleted successfully');
        } else {
            res.send('Task not found.');
        }
    } catch (error) {
        res.send(error);
    }
});

app.post('/create', async (req, res) => {
    const { title, description, completed } = req.body;
    try {
        const newTask = await Task.create({
            title,
            description,
            completed: completed || false, // Default to false if not provided
        });

        res.status(201).json(newTask);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = app;