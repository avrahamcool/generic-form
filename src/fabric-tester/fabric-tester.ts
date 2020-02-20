import { computedFrom } from 'aurelia-framework';
//import { ResizeSensor } from 'css-element-queries';
import { Dimension } from './dimension';
import { fabric } from "fabric";
import bedSVG from "./bed.svg";
import { contains } from "./intrinsic-scale";

export class FabricTester {
	dimentions: Dimension[] = Dimension.All;
	selectedDimention: Dimension = Dimension.D1X1;

	canvasHolderHTML: HTMLDivElement;
	canvasHTML: HTMLCanvasElement;
	bedHTML: HTMLImageElement;
	maharHTML: HTMLImageElement;

	canvasFabric: fabric.Canvas;
	attached() {
		this.canvasFabric = new fabric.Canvas(this.canvasHTML);

		// new ResizeSensor(this.canvasHolderHTML, () => {
		// });
	}

	@computedFrom("canvasHolderHTML.clientWidth", "canvasHolderHTML.clientHeight", "selectedDimention")
	get canvasDynamicSize()
	{
		if(!this.canvasHolderHTML) return {};
		return contains(this.canvasHolderHTML.clientWidth, this.canvasHolderHTML.clientHeight, this.selectedDimention.ratio);
	}

	detached() {
		this.canvasFabric.dispose();
	}

	addBed()
	{
		fabric.loadSVGFromURL(bedSVG, (objects, options) =>
		{
			let bed = fabric.util.groupSVGElements(objects, options);
			this.canvasFabric.add(bed);
			bed.center();
		});
	}
}
