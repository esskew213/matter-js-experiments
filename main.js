const { Engine, Render, Runner, World, Bodies, MouseConstraint, Mouse } = Matter;

const width = 800;
const height = 800;

const engine = Engine.create();

//decrease for slower motion
engine.timing.timeScale = 0.7;
// unpack the world object that is created when engine is created
const { world } = engine;
const render = Render.create({
	// render representation of world inside body
	element: document.body,
	engine: engine,
	options: {
		// renders solid shape, vs just the outline
		wireframes: false,
		width,
		height
	}
});
Render.run(render);
Runner.run(Runner.create(), engine);

//
World.add(world, MouseConstraint.create(engine, { mouse: Mouse.create(render.canvas) }));

// first two arguments are position to place object at, as measured from the top left. next two arguments are the width and height of the rectangle
const wallThickness = 50;

const ground = Bodies.rectangle(width / 2, height - wallThickness / 2, width, wallThickness, { isStatic: true });
const ceiling = Bodies.rectangle(width / 2, wallThickness / 2, width, wallThickness, { isStatic: true });
const leftWall = Bodies.rectangle(wallThickness / 2, height / 2, wallThickness, height, { isStatic: true });
const rightWall = Bodies.rectangle(width - wallThickness / 2, height / 2, wallThickness, height, { isStatic: true });
World.add(world, [ ground, ceiling, leftWall, rightWall ]);

// make some shapes, randomising starting position
const squareLength = 40;
for (let i = 0; i < 10; i++) {
	const tile = Bodies.rectangle(
		Math.random() * (width - wallThickness - squareLength / 2) + wallThickness + squareLength / 2,
		Math.random() * (height - wallThickness - squareLength / 2) + wallThickness + squareLength / 2,
		squareLength,
		squareLength
	);
	tile.restitution = 1;
	tile.frictionAir = 0.01;
	World.add(world, tile);
}
