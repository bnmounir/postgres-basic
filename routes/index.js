var express = require('express');
var router = express.Router();
const pool = require('../db');

/* GET home page. */
router.get('/', async (req, res, next) => {
    try {
        const todos = await pool.query(
            'SELECT * FROM todo ORDER BY todo_id DESC'
        );
        res.json(todos.rows);
    } catch (e) {
        console.log(e);
    }
});

router.post('/', async (req, res) => {
    try {
        console.log(req.body);
        const { description } = req.body;
        const newTodo = await pool.query(
            'INSERT INTO todo (description) VALUES($1) RETURNING *',
            [description]
        );
        res.json(newTodo.rows[0]);
    } catch (err) {
        console.log(err.message);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const description = await pool.query(
            'SELECT * FROM todo WHERE todo_id = $1',
            [id]
        );
        res.json(description.rows[0]);
    } catch (e) {
        console.error(e);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const updateTodo = await pool.query(
            'UPDATE todo SET description = $1 WHERE todo_id = $2',
            [description, id]
        );
        res.redirect('/');
    } catch (e) {
        console.error(e);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query(
            'DELETE FROM todo WHERE todo_id = $1',
            [id]
        );
        res.redirect('/');
    } catch (e) {
        console.error(e);
    }
});

module.exports = router;
