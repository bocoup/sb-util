/* eslint-disable @typescript-eslint/no-var-requires */

const express = require('express');
const app = express();
const port = 3000;

// BlockShapes will change to be a better API, perhaps BlockOpcodeMeta
const { loadProjectJson, BlockShapes } = require('sb-util');

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/shapes', async (req, res) => {
    const sp = await loadProjectJson('../../tests/data/accelerator.json');

    const blocks = sp.blocks();

    let shapeCounts = [];
    for (let shape of Object.values(BlockShapes)) {
        const shapeBlocks = blocks.query(`:${shape}`);
        const totalShapeCount = Array.from(shapeBlocks.propsIterable()).length;
        const blocksCount = {};
        Array.from(shapeBlocks.propsIterable()).map(b => {
            if (!(b.opcode in blocksCount)) {
                blocksCount[b.opcode] = 1;
            } else {
                blocksCount[b.opcode] = blocksCount[b.opcode] + 1;
            }
        });
        shapeCounts.push({ name: shape, count: totalShapeCount, blocks: blocksCount });
    }

    res.send(shapeCounts);
});

app.use('/datavis', express.static('public'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
