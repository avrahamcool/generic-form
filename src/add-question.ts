import { DialogController } from 'aurelia-dialog';
import { autoinject, observable } from "aurelia-framework";
import { QuestionType, QuestionConfiguration } from 'questions/common';

@autoinject()
export class AddQuestion
{
	@observable() public selectedQuestionType: QuestionType;
	public selectedQuestionConfiguration: QuestionConfiguration;

	public questionType = QuestionType;

	constructor(public controller: DialogController) {}
	
	selectedQuestionTypeChanged(newVal: QuestionType)
	{
		this.selectedQuestionConfiguration = newVal && newVal.getConfiguration();
		console.log(this.selectedQuestionConfiguration);
	}
}
