import { BaseQuestionModel } from "questions/common";

export class FreeTextQuestion extends BaseQuestionModel
{
	constructor(questionText = "")
	{
		super(questionText);
	}
}
