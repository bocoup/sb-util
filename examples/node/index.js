const { loadProjectJson, BlockShapes } = require('../../dist/sb-util');

const main = async function() {
    const sp = await loadProjectJson('../../tests/data/accelerator.json');
    const blocks = sp.blocks();

    let shapeCounts = [];
    for (let [key, shape] of Object.entries(BlockShapes)) {
        const shapeBlocks = blocks.query(`:${shape}`);
        const blocksCount = Array.from(shapeBlocks.propsIterable()).length;
        shapeCounts.push({ name: shape, count: blocksCount});
    }

    console.log(shapeCounts);
}

main();