import { observable } from 'aurelia-framework';
import { computedFrom } from 'aurelia-framework';
import { ResizeSensor } from 'css-element-queries';
import { Dimension } from './dimension';
import { fabric } from "fabric";
import bedSVG from "./bed.svg";
import { contains, ClientPosition } from "./intrinsic-scale";

export class FabricTester {
	allDimentions: Dimension[] = Dimension.All;

	@observable()
	selectedDimention: Dimension = Dimension.D1X1;
	selectedDimentionChanged(newDimention: Dimension)
	{
		this.calculateScaledAreaRect();
	}

	mainAreaRef: HTMLDivElement;
	resizeSensor: ResizeSensor;
	canvasRef: HTMLCanvasElement;
	scaledAreaRect: ClientPosition;

	canvasFabric: fabric.Canvas;
	attached() {
		this.canvasFabric = new fabric.Canvas(this.canvasRef);

		this.resizeSensor = new ResizeSensor(this.mainAreaRef, () => {
			this.calculateScaledAreaRect();
		});
	}

	detached() {
		this.canvasFabric.dispose();
		this.resizeSensor.detach();
	}

	calculateScaledAreaRect()
	{
		if(!this.mainAreaRef) return {};
		this.scaledAreaRect = contains(this.mainAreaRef.clientWidth, this.mainAreaRef.clientHeight, this.selectedDimention.ratio);

		//this.canvasFabric.setWidth(this.scaledAreaRect.width);
		// this.canvasFabric.setHeight(this.scaledAreaRect.height);
		//this.canvasFabric.renderAll();
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
