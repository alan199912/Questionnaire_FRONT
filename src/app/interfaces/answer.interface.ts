export interface ListAnswer {
  title: string;
  isCorrect: boolean;
}

export interface AnswerResponse {
  status: string;
  message: string;
}

export interface AnswerByUser {
  title: string;
  getScore: number | string;
  seconds: number | string;
  indexQuestion: number | string;
  listAnswer: ListAnswer[];
}
