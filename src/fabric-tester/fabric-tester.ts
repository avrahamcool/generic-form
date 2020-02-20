import { observable } from 'aurelia-framework';
import { ResizeSensor } from 'css-element-queries';
import { Dimension } from './dimension';
import { fabric } from "fabric";
import bedSVG from "./bed.svg";
import { contains, ClientPosition } from "./intrinsic-scale";

export class FabricTester {
	allDimensions: Dimension[] = Dimension.All;

	@observable()
	selectedDimension: Dimension = Dimension.D1X1;
	selectedDimensionChanged()
	{
		this.calculateScaledAreaRect();
	}

	mainAreaRef: HTMLDivElement;
	resizeSensor: ResizeSensor;
	canvasRef: HTMLCanvasElement;
	scaledAreaRect: {
		width: string,
		height: string,
		left: string,
		top: string,
	};
	originalParentWidth: number;

	canvasFabric: fabric.Canvas;

	@observable()
	isInDrawingMode = false;
	isInDrawingModeChanged(newValue: boolean)
	{
		if(this.canvasFabric)
		{
			this.canvasFabric.isDrawingMode = newValue;
		}
	}

	attached() {
		window["canvasFabric"] = this.canvasFabric = new fabric.Canvas(this.canvasRef);

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
		const position = contains(this.mainAreaRef.clientWidth, this.mainAreaRef.clientHeight, this.selectedDimension.ratio);
		
		if(!this.scaledAreaRect)
		{
			this.originalParentWidth = position.width;
		}

		this.scaledAreaRect = {
			width: `${position.width}px`,
			height: `${position.height}px`,
			top: `${position.top}px`,
			left: `${position.left}px`
		};

		this.canvasFabric.setZoom(position.width / this.originalParentWidth);
		this.canvasFabric.setDimensions({ width: position.width, height: position.height });
		this.canvasFabric.calcOffset();
		this.canvasFabric.renderAll();
	}

	addBed()
	{
		fabric.loadSVGFromURL(bedSVG, (objects, options) =>
		{
			let bed = fabric.util.groupSVGElements(objects, options);
			this.canvasFabric.add(bed);
			bed.viewportCenter();
		});
	}

	remove()
	{
		this.canvasFabric.remove(...this.canvasFabric.getActiveObjects());
		this.canvasFabric.discardActiveObject();
	}
}
