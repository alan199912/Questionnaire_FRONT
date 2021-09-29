// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  auth: {
    registerUser: 'http://localhost:5000/api/v1/auth/registerUser',
    loginUser: 'http://localhost:5000/api/v1/auth/loginUser',
    renewToken: 'http://localhost:5000/api/v1/auth/renewToken',
    getIdByToken: 'http://localhost:5000/api/v1/auth/getIdByToken',
  },
  user: {
    getUserById: 'http://localhost:5000/api/v1/getUserById',
  },
  questionnaire: {
    createQuestionnaire: 'http://localhost:5000/api/v1/createQuestionnaire',
    getQuestionnaireByIdUser:
      'http://localhost:5000/api/v1/getQuestionnaireByIdUser',
    deleteQuestionnaire: 'http://localhost:5000/api/v1/deleteQuestionnaire',
    getQuestionnaireById: 'http://localhost:5000/api/v1/getQuestionnaireById',
    getQuestionnaireByCode:
      'http://localhost:5000/api/v1/getQuestionnaireByCode',
    saveResultByUser: 'http://localhost:5000/api/v1/saveResultByUser',
    getAnswerById: 'http://localhost:5000/api/v1/getAnswerById',
    getAllQuestionnaires: 'http://localhost:5000/api/v1/getAllQuestionnaires',
    getAnswerByIdQuestionnaire:
      'http://localhost:5000/api/v1/getAnswerByIdQuestionnaire',
    deleteAnswer: 'http://localhost:5000/api/v1/deleteAnswer',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
