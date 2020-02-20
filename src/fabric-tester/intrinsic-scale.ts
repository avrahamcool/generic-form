export interface ClientPosition
{
	width: string,
	height: string,
	left: string,
	top: string,
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
		width: `${width}px`,
		height: `${height}px`,
		top: `${(parentHeight - height) / 2}px`,
		left: `${(parentWidth - width) / 2}px`
	}
};
