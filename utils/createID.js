function createCourseID() {
    const length = 4; // the length of the string (excluding "C")
    let result = "C"; // start with "C"
    const characters = "0123456789"; // the characters to choose from
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

function createSessionID() {
    const length = 5; // the length of the string (excluding "S")
    let result = "S"; // start with "S"
    const characters = "0123456789"; // the characters to choose from
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

function createStudentID() {
  const length = 6; // the length of the string (excluding "DS")
  let result = "DS"; // start with "DS"
  const characters = "0123456789"; // the characters to choose from
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

module.exports = { createSessionID, createCourseID, createStudentID };