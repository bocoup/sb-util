const express = require('express');
const app = express();
const port = 3000;
const { loadProjectJson, BlockShapes } = require('sb-util');

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/shapes', async (req, res) => {
    const sp = await loadProjectJson('../../tests/data/accelerator.json');

    const blocks = sp.blocks();

    let shapeCounts = [];
    for (let [key, shape] of Object.entries(BlockShapes)) {
        const shapeBlocks = blocks.query(`:${shape}`);
        const blocksCount = Array.from(shapeBlocks.propsIterable()).length;
        shapeCounts.push({ name: shape, count: blocksCount});
    }

    res.send(shapeCounts);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
