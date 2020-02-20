import * as bgSquare from "./bg-square.png";
import * as bgVertical from "./bg-vertical.png";
import * as  bgHorizontal from "./bg-horizontal.png";

export class BgCodeToImgValueConverter
{
	images = {
		1: bgSquare,
		2: bgVertical,
		3: bgHorizontal
	}
	
	toView(selectedBG: number)
	{
		return this.images[selectedBG];
	}
}
