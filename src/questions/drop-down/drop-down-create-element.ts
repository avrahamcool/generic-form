import { BaseQuestionCreateElement } from "questions/common";
import { DropDownQuestion, DropDownAnswer } from ".";

export class DropDownCreateElement extends BaseQuestionCreateElement
{
	public question: DropDownQuestion;
	public answer: DropDownAnswer;

	activate({question, answer}: {question: DropDownQuestion, answer: DropDownAnswer})
	{
		this.question = question;
		this.answer = answer;
	}
}
