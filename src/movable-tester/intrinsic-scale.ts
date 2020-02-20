export function contains(parentWidth: number, parentHeight: number, childWidth: number, childHeight: number)
{
    const ChildRatio = childWidth / childHeight;
	const parentRatio = parentWidth / parentHeight;
	
    let width = parentWidth;
    let height = parentHeight;

    if (ChildRatio > parentRatio) {
        height = width / ChildRatio;
    } else {
        width = height * ChildRatio;
    }

    return {
        width,
        height,
        left: (parentWidth - width) / 2,
        top: (parentHeight - height) / 2
    };
};
