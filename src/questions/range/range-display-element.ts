import { BaseQuestionDisplayElement } from "questions/common";
import { RangeQuestion, RangeAnswer } from ".";

export class RangeDisplayElement extends BaseQuestionDisplayElement
{
	public question: RangeQuestion;
	public answer: RangeAnswer;

	activate({question, answer}: {question: RangeQuestion, answer: RangeAnswer})
	{
		this.question = question;
		this.answer = answer;
	}
}
