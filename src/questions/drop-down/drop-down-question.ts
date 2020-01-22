import { BaseQuestionModel } from "questions/common";

export class DropDownQuestion extends BaseQuestionModel
{
	constructor(questionText = "", public options: {text: string}[] = [{text: ""}, {text: ""}])
	{
		super(questionText);
	}
}
