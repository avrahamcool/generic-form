import { BaseQuestionModel } from "questions/common";

export class RangeQuestion extends BaseQuestionModel
{
	constructor(questionText = "", public min = 0, public max = 10, public step = 1)
	{
		super(questionText);
	}
}
