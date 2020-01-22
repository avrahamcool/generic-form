import { DialogService } from 'aurelia-dialog';
import { autoinject } from "aurelia-framework";

import { AddQuestion } from "./add-question";
import { QuestionConfiguration, QuestionType } from "questions/common";

@autoinject()
export class App
{
	public questions: QuestionConfiguration[] = [];
	public addQuestion() : void
	{
		this.dialogService.open({ viewModel: AddQuestion})
		.whenClosed(response => 
		{
			!response.wasCancelled && this.questions.push(response.output);
		})
	}

	constructor(private dialogService: DialogService)
	{
		// this.questions.push(QuestionType.DropDown.getConfiguration());
		// this.questions.push(QuestionType.FreeText.getConfiguration());
		// this.questions.push(QuestionType.Range.getConfiguration());
	}
}
