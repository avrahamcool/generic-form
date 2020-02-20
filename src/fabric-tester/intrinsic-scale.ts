export interface ClientPosition
{
	width: number,
	height: number,
	left: number,
	top: number,
}

export function contains(parentWidth: number, parentHeight: number, childRatio: number) : ClientPosition
{
	const parentRatio = parentWidth / parentHeight;
	
    let width = parentWidth;
    let height = parentHeight;

    if (childRatio > parentRatio) {
        height = width / childRatio;
    } else {
        width = height * childRatio;
    }

	return {
		width,
		height,
		top: (parentHeight - height) / 2,
		left: (parentWidth - width) / 2
	}
};
