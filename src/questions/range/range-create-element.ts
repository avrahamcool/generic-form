import { BaseQuestionCreateElement } from "questions/common";
import { RangeQuestion, RangeAnswer } from ".";

export class RangeCreateElement extends BaseQuestionCreateElement
{
	public question: RangeQuestion;
	public answer: RangeAnswer;

	activate({question, answer}: {question: RangeQuestion, answer: RangeAnswer})
	{
		this.question = question;
		this.answer = answer;
	}
}
