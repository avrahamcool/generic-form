export { BaseQuestionModel } from "./base-question-model";
export { BaseAnswerModel } from "./base-answer-model";
export { BaseQuestionCreateElement } from "./base-question-create-element";
export { BaseQuestionDisplayElement } from "./base-question-display-element";
export { QuestionConfiguration } from "./question-configuration";
export { QuestionType } from "./question-type";

import {FrameworkConfiguration, PLATFORM} from 'aurelia-framework';

export function configure(config: FrameworkConfiguration) {
	config.globalResources([
		PLATFORM.moduleName("../drop-down/drop-down-create-element"),
		PLATFORM.moduleName("../drop-down/drop-down-display-element"),
		PLATFORM.moduleName("../free-text/free-text-create-element"),
		PLATFORM.moduleName("../free-text/free-text-display-element"),
		PLATFORM.moduleName("../range/range-create-element"),
		PLATFORM.moduleName("../range/range-display-element")
	]);
}

