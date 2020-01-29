export function contains(element: HTMLElement)
{
	const parent = element.parentElement;

	const parentWidth = parent.clientWidth;
	const parentHeight = parent.clientHeight;

	const childWidth = element.clientWidth;
	const childHeight = element.clientHeight;

    const doRatio = childWidth / childHeight;
	const cRatio = parentWidth / parentHeight;
	
    let width = parentWidth;
    let height = parentHeight;

    if (doRatio > cRatio) {
        height = width / doRatio;
    } else {
        width = height * doRatio;
    }

    return {
        width,
        height,
        x: (parentWidth - width) / 2,
        y: (parentHeight - height) / 2
    };
};
