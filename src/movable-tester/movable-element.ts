import Moveable from "moveable";
import { bindable, containerless } from "aurelia-framework";
import { MovableConfiguration } from "./movable-configuration";
import { ResizeSensor } from "css-element-queries";

@containerless
export class MovableElement {
	@bindable private movableConfiguration: MovableConfiguration;

	private target: HTMLImageElement;
	private parent: HTMLElement;

	private movableHandler: Moveable;

	attached() {
		this.parent = this.target.parentElement;
		this.draw();

		this.movableHandler = new Moveable(this.parent,
			{
				target: this.target,
				container: this.parent,
				draggable: true,
				resizable: true,
				rotatable: true,
				// snappable: true,
				// bounds: {
				// 	top: 0,
				// 	right: this.parent.clientWidth * 3.14022,
				// 	bottom: this.parent.clientHeight * 3.14022,
				// 	left: 0
				// }
			});

		new ResizeSensor(this.parent, () => {
			// this.draw();
			// this.movableHandler.updateRect();
			// this.movableHandler.setState({
			// 	bounds: {
			// 		top: 0,
			// 		right: this.parent.clientWidth* 3.14022,
			// 		bottom: this.parent.clientHeight* 3.14022,
			// 		left: 0
			// 	}
			// });
			//this.movableHandler.updateRect();
		});

		this.movableHandler
			.on("dragStart", ({ set }) => {
				set(this.movableConfiguration.translate);
			})
			.on("drag", ({ beforeTranslate }) => {
				this.movableConfiguration.translate = beforeTranslate;
				this.draw();
			})
			.on("resizeStart", ({ setOrigin, dragStart }) => {
				setOrigin(["%", "%"]);
				dragStart && dragStart.set(this.movableConfiguration.translate);
			})
			.on("resize", ({ width, height, drag }) => {
				this.movableConfiguration.width = width;
				this.movableConfiguration.height = height;
				this.movableConfiguration.translate = drag.beforeTranslate;
				this.draw();
			})
			.on("rotateStart", ({ set }) => {
				set(this.movableConfiguration.rotate);
			}).on("rotate", ({ beforeRotate }) => {
				this.movableConfiguration.rotate = beforeRotate;
				this.draw();
			});
	}

	draw() {
		this.target.style.width = `${this.movableConfiguration.width}px`;
		this.target.style.height = `${this.movableConfiguration.height}px`;

		this.target.style.transform = `translate(${this.movableConfiguration.translate[0]}px, ${this.movableConfiguration.translate[1]}px) rotate(${this.movableConfiguration.rotate}deg`;
	}

	detached() {
		this.movableHandler.destroy();
	}
}
