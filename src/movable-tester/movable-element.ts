import Moveable from "moveable";
import { bindable } from "aurelia-framework";
import { MovableConfiguration } from "./movable-configuration";

export class MovableElement {
	private target: HTMLImageElement;

	@bindable() private movableConfiguration: MovableConfiguration;

	private movableHandler: Moveable;
	attached() {
		this.movableHandler = new Moveable(document.body,
			{
				target: this.target,
				draggable: true,
				scalable: true,
				rotatable: true,
				keepRatio: true,
				bounds: { top: 0, left: 0, bottom: 400, right: 400 }
			});


		this.movableHandler.on("scaleStart", ({ set, dragStart }) => {
			set(this.movableConfiguration.scale);
			dragStart && dragStart.set(this.movableConfiguration.translate);
		});

		this.movableHandler.on("scale", ({ target, drag, scale }) => {
			this.movableConfiguration.scale = scale;
			this.movableConfiguration.translate = drag.beforeTranslate;
			this.draw(target);
		});

		this.movableHandler.on("dragStart", ({ set }) => {
			set(this.movableConfiguration.translate);
		});

		this.movableHandler.on("drag", ({ target, beforeTranslate }) => {
			this.movableConfiguration.translate = beforeTranslate;
			this.draw(target);
		});

		this.movableHandler.on("rotate", ({ target, beforeRotate }) => {
			this.movableConfiguration.rotate = beforeRotate;
			this.draw(target);
		});
	}

	draw(target: HTMLElement | SVGElement) {
		const { translate, scale, rotate } = this.movableConfiguration;

		target.style.transform = `translate(${translate[0]}px, ${translate[1]}px) scale(${scale[0]}, ${scale[1]}) rotate(${rotate}deg)`;
	}

	detached() {
		this.movableHandler.destroy();
	}
}
