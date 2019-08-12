const express = require('express');
const app = express();
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/shapes', (req, res) => {
    res.send([ { name: 'hat', count: 8 },
    { name: 'boolean', count: 43 },
    { name: 'reporter', count: 56 },
    { name: 'c', count: 19 },
    { name: 'cap', count: 7 },
    { name: 'stack', count: 40 },
    { name: 'custom', count: 0 } ]);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
