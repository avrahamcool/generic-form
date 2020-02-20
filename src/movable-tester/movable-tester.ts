import { MovableConfiguration } from "./movable-configuration";
import { contains } from "./intrinsic-scale";
import { computedFrom } from "aurelia-framework";

export class MovableTester
{
	private movables: MovableConfiguration[] = [];
	selectedBG = 1;
	backgroundImage: HTMLImageElement;
	parentContainer: HTMLDivElement;

	addMovable()
	{
		this.movables.push(new MovableConfiguration());
	}

	logMovable()
	{
		console.log("current positioning data", this.movables);
	}

	@computedFrom("parentContainer.clientWidth", "parentContainer.clientHeight", "backgroundImage.width", "backgroundImage.height")
	get XXX()
	{
		if(!this.parentContainer || !this.backgroundImage)
		{
			return {};
		}
		const position = contains(this.parentContainer.clientWidth,
			this.parentContainer.clientHeight,
			this.backgroundImage.width,
			this.backgroundImage.height);
		return {
			top: `${position.top}px`,
			left: `${position.left}px`,
			"background-image": `url(${this.backgroundImage.currentSrc})`,

			// width: `${position.width}px`,
			// height: `${position.height}px`

			width: `${this.backgroundImage.naturalWidth}px`,
			height: `${this.backgroundImage.naturalHeight}px`,
			transform: `scale(${position.width/this.backgroundImage.naturalWidth}, ${position.height/this.backgroundImage.naturalHeight})`
			
		};
	}
}
