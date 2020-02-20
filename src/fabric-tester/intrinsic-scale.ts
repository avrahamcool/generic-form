export function contains(parentWidth: number, parentHeight: number, childRatio: number)
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
        width: width + "px",
        height: height + "px",
        left: ((parentWidth - width) / 2) + "px",
        top: ((parentHeight - height) / 2) + "px"
    };
};
