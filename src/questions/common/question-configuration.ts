import { BaseQuestionModel } from "./base-question-model";
import { BaseAnswerModel } from "./base-answer-model";
import { BaseQuestionDisplayElement } from "./base-question-display-element";
import { BaseQuestionCreateElement } from "./base-question-create-element";

export interface QuestionConfiguration
{
	questionModel: BaseQuestionModel,
	answerModel: BaseAnswerModel,
	displayElement: typeof BaseQuestionDisplayElement,
	createElement: typeof BaseQuestionCreateElement
}
