import { QuestionConfiguration } from "./question-configuration";
import { FreeTextAnswer, FreeTextQuestion, FreeTextDisplayElement, FreeTextCreateElement } from "questions/free-text";
import { RangeDisplayElement, RangeQuestion, RangeAnswer, RangeCreateElement } from "questions/range";
import { DropDownDisplayElement, DropDownQuestion, DropDownAnswer, DropDownCreateElement } from "questions/drop-down";

export class QuestionType
{
	private constructor(public displayName: string, public getConfiguration: () => QuestionConfiguration)
	{
		QuestionType.All.push(this);
	}


	public static All: QuestionType[] = [];

	public static FreeText = new QuestionType("Free Text", () => ({createElement: FreeTextCreateElement, displayElement: FreeTextDisplayElement, questionModel: new FreeTextQuestion(), answerModel: new FreeTextAnswer()}));
	public static Range = new QuestionType("Range", () => ({createElement: RangeCreateElement, displayElement: RangeDisplayElement, questionModel: new RangeQuestion(), answerModel: new RangeAnswer()}));
	public static DropDown = new QuestionType("Drop Down", () => ({createElement: DropDownCreateElement, displayElement: DropDownDisplayElement, questionModel: new DropDownQuestion(), answerModel: new DropDownAnswer()}));
}
