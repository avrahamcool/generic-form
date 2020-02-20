import { computedFrom } from "aurelia-framework";

export class Dimension
{
	public readonly width: number;
	public readonly height: number;

	@computedFrom("width", "height")
	public get ratio() : number
	{
		return this.width / this.height;
	}

	private constructor(width: number, height: number) {
		this.width = width;
		this.height = height;

		Dimension.All.push(this);
	}

	public static All: Dimension[] = [];
	
	public static D1X1 = new Dimension(1, 1);
	public static D4X3 = new Dimension(4, 3);
	public static D3X4 = new Dimension(3, 4);
	public static D16X9 = new Dimension(16, 9);
	public static D9X16 = new Dimension(9, 16);
}
