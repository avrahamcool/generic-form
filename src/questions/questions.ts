import { DialogService } from 'aurelia-dialog';
import { autoinject } from "aurelia-framework";

import { AddQuestion } from "./add-question";
import { QuestionConfiguration } from "questions/common";

@autoinject()
export class Questions
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

	constructor(private dialogService: DialogService){}
}
