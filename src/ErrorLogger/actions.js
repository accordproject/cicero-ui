export const gtZero = input => input > 0;

export const typeSwitchCase = (input) => {
  switch (true) {
    case ('modelError' in input):
      return 'Model';
    case ('parseError' in input):
      return 'Grammar';
    default:
      return 'Unknown';
  }
};

export const keySwitchCase = (input) => {
  switch (true) {
    case ('modelError' in input):
      return input.clauseTemplateId;
    case ('parseError' in input):
      return input.clauseId;
    default:
      return null;
  }
};

export const overalltypeSwitchCase = (input) => {
  switch (true) {
    case ('modelError' in input):
      return input.modelError;
    case ('parseError' in input):
      return input.parseError;
    default:
      return null;
  }
};

export const errorsExist = errors => gtZero(errors.length);

export const errorArrayLength = errors => (errorsExist(errors) ? errors.length : 'No');

export const truncateMessage = string => (string.length > 200 ? `${string.substring(0, 200)}...` : string);

// const buildMessage = (data, key) => {
//   let result = 'Unknown';
//   if (data.fileLocation) {
//     result = '';
//     if (data.fileLocation[key].line) {
//       result += `Line: ${data.fileLocation[key].line}`;
//     }
//     if (data.fileLocation[key].column) {
//       result += ` Col: ${data.fileLocation[key].column}`;
//     }
//   }
//   return result;
// };

// const buildStartLocation = data => buildMessage(data, 'start');

// const buildEndLocation = data => buildMessage(data, 'end');
