import { BaseQuestionDisplayElement } from "questions/common";
import { FreeTextQuestion } from "./free-text-question";
import { FreeTextAnswer } from "./free-text-answer";

export class FreeTextDisplayElement extends BaseQuestionDisplayElement
{
	public question: FreeTextQuestion;
	public answer: FreeTextAnswer;

	activate({question, answer}: {question: FreeTextQuestion, answer: FreeTextAnswer})
	{
		this.question = question;
		this.answer = answer;
	}
}
