import { BaseQuestionDisplayElement } from "questions/common";
import { DropDownQuestion, DropDownAnswer } from ".";

export class DropDownDisplayElement extends BaseQuestionDisplayElement
{
	public question: DropDownQuestion;
	public answer: DropDownAnswer;

	activate({question, answer}: {question: DropDownQuestion, answer: DropDownAnswer})
	{
		this.question = question;
		this.answer = answer;
	}
}
