import { AnswerByUser, ListAnswer } from './answer.interface';

export interface QuestionnairesResponseData {
  status: string;
  questionnaire: Questionnaire[];
}

export interface QuestionnaireResponseDataInfo {
  status: string;
  questionnaire: Questionnaire;
}

export interface QuestionnaireResponse {
  status: string;
  message: string;
}

export interface Questionnaire {
  _id?: string;
  idUser: string;
  title: string;
  description: string;
  code: string;
  numberQuestions: number;
  questionData: QuestionData[];
  createdAt: Date;
}

export interface QuestionnaireData {
  title: string;
  description: string;
}

export interface QuestionData {
  title: string;
  seconds: number;
  score: number;
  listAnswer: ListAnswer[];
}

export interface ResultQuestionnaireResponse {
  status: string;
  answer: ResultQuestionnaire;
}

export interface AllResultQuestionnaireResponse {
  status: string;
  questionnaire: Questionnaire[];
}

export interface ResultQuestionnaire {
  _id?: string;
  idQuestionnaire: string;
  participantUserName: string;
  date: Date;
  corrects: number;
  inCorrects: number;
  totalScore: number;
  listAnswerByUser: AnswerByUser[];
}
