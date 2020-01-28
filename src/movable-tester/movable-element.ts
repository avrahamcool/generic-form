import Moveable from "moveable";
import { bindable, containerless } from "aurelia-framework";
import { MovableConfiguration } from "./movable-configuration";
import { ResizeSensor } from "css-element-queries";

@containerless
export class MovableElement {
	@bindable private movableConfiguration: MovableConfiguration;
	private movableConfigurationByPixels: MovableConfiguration = new MovableConfiguration();

	private target: HTMLImageElement;
	private parent: HTMLElement;

	private movableHandler: Moveable;

	attached() {
		this.parent = this.target.parentElement;

		this.percentageToPixels();
		this.draw();

		this.movableHandler = new Moveable(document.body,
			{
				target: this.target,
				draggable: true,
				resizable: true,
				rotatable: true
			});

		new ResizeSensor(this.parent, () => {
			this.percentageToPixels();
			this.draw();
			this.movableHandler.updateRect();
		});

		this.movableHandler.on("dragStart", ({ set }) => {
			set([this.movableConfigurationByPixels.left, this.movableConfigurationByPixels.top]);
		}).on("drag", ({ left, top }) => {
			this.movableConfigurationByPixels.left = left;
			this.movableConfigurationByPixels.top = top;
			this.draw(true);
		}).on("dragEnd", () => {
			this.pixelsToPercentage()
			this.draw();
		});

		this.movableHandler.on("resize", ({ width, height, delta, direction }) => {

			const [directionX, directionY] = direction;
			const [deltaX, deltaY] = delta;

			this.movableConfigurationByPixels.width = width;
			this.movableConfigurationByPixels.height = height;
			if (directionX === -1) {
				this.movableConfigurationByPixels.left -= deltaX;
			}
			if (directionY === -1) {
				this.movableConfigurationByPixels.top -= deltaY;
			}

			this.draw(true);
		}).on("resizeEnd", () => {
			this.pixelsToPercentage()
			this.draw();
		});

		this.movableHandler.on("rotateStart", ({ set }) => {
			set(this.movableConfiguration.rotate);
		}).on("rotate", ({ beforeRotate }) => {
			this.movableConfigurationByPixels.rotate = beforeRotate;
			this.draw(true);
		}).on("rotateEnd", () => {
			this.pixelsToPercentage()
			this.draw();
		});
	}

	draw(usePixels = false) {
		if (usePixels) {
			this.target.style.left = `${this.movableConfigurationByPixels.left}px`;
			this.target.style.top = `${this.movableConfigurationByPixels.top}px`;
			this.target.style.width = `${this.movableConfigurationByPixels.width}px`;
			this.target.style.height = `${this.movableConfigurationByPixels.height}px`;

			this.target.style.transform = `rotate(${this.movableConfigurationByPixels.rotate}deg`;
		}
		else {
			this.target.style.left = `${this.movableConfiguration.left}%`;
			this.target.style.top = `${this.movableConfiguration.top}%`;

			this.target.style.width = `${this.movableConfiguration.width}%`;
			this.target.style.height = `${this.movableConfiguration.height}%`;

			this.target.style.transform = `rotate(${this.movableConfiguration.rotate}deg`;
		}
	}

	pixelsToPercentage() {
		this.movableConfiguration.left = 100 * (this.movableConfigurationByPixels.left / this.parent.clientWidth);
		this.movableConfiguration.top = 100 * (this.movableConfigurationByPixels.top / this.parent.clientHeight);

		this.movableConfiguration.width = 100 * (this.movableConfigurationByPixels.width / this.parent.clientWidth);
		this.movableConfiguration.height = 100 * (this.movableConfigurationByPixels.height / this.parent.clientHeight);

		this.movableConfiguration.rotate = this.movableConfigurationByPixels.rotate;
	}

	percentageToPixels() {
		this.movableConfigurationByPixels.left = (this.movableConfiguration.left * this.parent.clientWidth) / 100;
		this.movableConfigurationByPixels.top = (this.movableConfiguration.top * this.parent.clientHeight) / 100;

		this.movableConfigurationByPixels.width = (this.movableConfiguration.width * this.parent.clientWidth) / 100;
		this.movableConfigurationByPixels.height = (this.movableConfiguration.height * this.parent.clientHeight) / 100;

		this.movableConfigurationByPixels.rotate = this.movableConfiguration.rotate;
	}

	detached() {
		this.movableHandler.destroy();
	}
}
