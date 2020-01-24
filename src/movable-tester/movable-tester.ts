import { MovableConfiguration } from "./movable-configuration";

export class MovableTester
{
	private movables: MovableConfiguration[] = [];

	addMovable()
	{
		this.movables.push(new MovableConfiguration());
	}

	logMovable()
	{
		console.log("current positioning data", this.movables);
	}
}
