const { Engine, Render, Runner, World, Bodies, MouseConstraint, Mouse } = Matter;

const width = 400;
const height = 400;

const engine = Engine.create();

//decrease for slower motion
engine.timing.timeScale = 0.5;
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
		height,
		background: `#2f4858`
	}
});
Render.run(render);
Runner.run(Runner.create(), engine);

//
World.add(world, MouseConstraint.create(engine, { mouse: Mouse.create(render.canvas) }));

// first two arguments are position to place object at, as measured from the top left. next two arguments are the width and height of the rectangle
const wallThickness = 20;
const wallColour = '#489fb5';
const ground = Bodies.rectangle(width / 2, height - wallThickness / 2, width, wallThickness, {
	isStatic: true,
	render: { fillStyle: wallColour }
});
const ceiling = Bodies.rectangle(width / 2, wallThickness / 2, width, wallThickness, {
	isStatic: true,
	render: { fillStyle: wallColour }
});
const leftWall = Bodies.rectangle(wallThickness / 2, height / 2, wallThickness, height, {
	isStatic: true,
	render: { fillStyle: wallColour }
});
const rightWall = Bodies.rectangle(width - wallThickness / 2, height / 2, wallThickness, height, {
	isStatic: true,
	render: { fillStyle: wallColour }
});
World.add(world, [ ground, ceiling, leftWall, rightWall ]);

// make some shapes, randomising starting position
const squareLength = 40;
for (let i = 0; i < 16; i++) {
	const tile = Bodies.rectangle(
		Math.random() * (width - wallThickness - squareLength / 2) + wallThickness + squareLength / 2,
		Math.random() * (height - wallThickness - squareLength / 2) + wallThickness + squareLength / 2,
		squareLength,
		squareLength,
		{
			render: {
				fillStyle: '#ede7e3',
				strokeStyle: '#82c0cc',
				lineWidth: 5
			},
			chamfer: { radius: [ 10, 10, 10, 10 ] }
		}
	);
	Matter.Body.rotate(tile, Math.random(Math.PI / 8));
	tile.restitution = 1;
	tile.friction = 0.05;
	tile.frictionAir = 0.001;
	World.add(world, tile);
}
