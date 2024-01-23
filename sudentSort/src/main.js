const name = document.getElementById('name');
const lastName = document.getElementById('lastName');
const middleName = document.getElementById('middleName');
const birthday = document.getElementById('birthday');
const startYear = document.getElementById('startYear');
const faculty = document.getElementById('faculty');

const button = document.getElementById('button')
const select = document.getElementById('sort')
const buttonWrapper = document.getElementById('buttonWrapper')
const tableBody = document.getElementById('tableBody')

const filterFullname = document.getElementById('filterFullName')
const filterFaculty = document.getElementById('filterFaculty')
const filterStudyStart = document.getElementById('filterStudyStart')
const filterStudyEnd = document.getElementById('filterStudyEnd')

const date = new Date();
let isFormValid = [];
let studentsArr = []


const textValid = (el) => el.value.trim();

let addToObj = function () {
  let birthdayDate = birthday.valueAsDate;
  if (isFormValid.length === 0) {
    let studentObj = {}
    studentObj.name = textValid(name);
    studentObj.middleName = textValid(middleName);
    studentObj.lastName = textValid(lastName);
    studentObj.birthDay = birthdayDate;
    studentObj.startYear = startYear.value;
    studentObj.faculty = textValid(faculty);
    studentsArr.push(studentObj)

    addToTable(studentObj)
    clearForm()

  }
}

let validator = function () {
  let birthdayDate = birthday.valueAsDate;
  const formItems = document.getElementsByClassName('form-item')
  clearErrors()

  if (textValid(name) === '') {
    isFormValid.push(false)
    let error = document.createElement('p');
    error.classList.add('error')
    error.textContent = 'Введите имя'
    formItems[0].querySelector('label').append(error)
  }
  if (textValid(middleName) === '') {
    isFormValid.push(false)
    let error = document.createElement('p');
    error.classList.add('error')
    error.textContent = 'Введите Отчество'
    formItems[1].querySelector('label').append(error)
  }
  if (textValid(lastName) === '') {
    isFormValid.push(false)
    let error = document.createElement('p');
    error.classList.add('error')
    error.textContent = 'Введите фамилию'
    formItems[2].querySelector('label').append(error)
  }

  if (birthday.value === '' || date.getTime() < birthdayDate.getTime() || birthdayDate.getTime() < new Date("Jan 1, 1900").getTime()) {
    isFormValid.push(false);
    let error = document.createElement('p');
    error.classList.add('error');
    error.textContent = 'Некорректная дата рождения';
    formItems[3].querySelector('label').append(error);
  }

  if (startYear.value < 2000 || startYear.value > new Date().getFullYear() || startYear.value === '') {
    isFormValid.push(false);
    let error = document.createElement('p');
    error.classList.add('error');
    error.textContent = 'Некорректный год поступления';
    formItems[4].querySelector('label').append(error);
  }

  if (textValid(faculty) === '') {
    isFormValid.push(false)
    let error = document.createElement('p');
    error.classList.add('error');
    error.textContent = 'Введите факультет';
    formItems[5].querySelector('label').append(error);
  }
  addToObj()
  isFormValid = []
}

let addToTable = function (student) {
  let tr = document.createElement('tr');
  tr.classList.add('student')
  tableBody.append(tr);
  for (let key in student) {
    let td = document.createElement('td');
    td.classList.add(`${key}Student`)
    tr.append(td);
    if (key === 'birthDay') {
      td.textContent = getBirthday(student[key])
    } else if (key === 'startYear') {
      if (calcYear(new Date(`31 September ${student[key]}`)) >= 4) {
        td.textContent = `${student[key]}-${Number(student[key]) + 4} закончил`
      } else {
        let currCourse = calcYear(new Date(`01 September ${student[key]}`))
        td.textContent = `${student[key]}-${Number(student[key]) + 4} (${currCourse})`
      }

    } else {
      td.textContent = student[key]
    }

  }

}

let validDate = function (date) {
  if (date < 10) {
    return '0' + date;
  }
  return date
}
let getBirthday = function (time) {
  let year = time.getFullYear();
  let mounth = validDate(time.getMonth() + 1);
  let day = validDate(time.getDate());
  let age = calcYear(time);
  return `${day}.${mounth}.${year} (${age})`
}

function calcYear(dateToCalc) {
  let dateDifMs = Date.now() - dateToCalc.getTime();
  let ageDate = new Date(dateDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

const clearForm = function () {
  const inputs = Array.from(document.getElementsByClassName('form-control'));
  inputs.forEach(el => {
    el.value = ''
  })
}
const clearErrors = function () {
  const errors = Array.from(document.getElementsByClassName('error'));
  errors.forEach(er => {
    er.parentNode.removeChild(er)
  })
}

const stringFilter = function (input, ...filterArgument) {
  let filterValue = input.value.toUpperCase()
  if (studentsArr) {
    if (filterValue === '') {
      return studentsArr
    }
    let result = []
    studentsArr.forEach(el => {
      // let fullName = `${el.name} ${el.middleName} ${el.lastName}`.toUpperCase();
      filterArgument.forEach(fullNamePart => {
        console.log(el)
        if (el[fullNamePart].toUpperCase().includes(filterValue)) {
          result.push(el)
        }
      })
    })
    console.log(filterValue)
    return result;
  }

  return studentsArr
}


let yearFilter = function (input, isLastYear = false) {
  let filterValue = input.value.toUpperCase()
  if (studentsArr) {
    if (filterValue === '') {
      return studentsArr;
    }
    let result = [];
    studentsArr.forEach(el => {
      if (isLastYear === true) {
        let year = Number(el.startYear) + 4;
        if (!(filterValue === '') && String(year).toUpperCase().includes(filterValue)) {
          result.push(el)
        }
      } else if (!(filterValue === '') && el.startYear.toUpperCase().includes(filterValue)) {
        result.push(el)
      }
    })
    return result
  }
  return []
}

let sort = function () {
  let resultArr = studentsArr.slice();
  if (select.value === 'fullName') {
    return resultArr.sort((a, b) => `${a.name} ${a.middleName} ${a.lastName}`.toUpperCase() > `${b.name} ${b.middleName} ${b.lastName}`.toUpperCase() ? 1 : -1)
  }
  if (select.value === 'faculty') {
    return resultArr.sort((a, b) => a.faculty.toUpperCase() > b.faculty.toUpperCase() ? 1 : -1)
  }
  if (select.value === 'birthday') {
    return resultArr.sort((a, b) => a.birthDay > b.birthDay ? 1 : -1)
  }
  if (select.value === 'startYear') {
    return resultArr.sort((a, b) => a.startYear > b.startYear ? 1 : -1)
  }
  return studentsArr
}

button.addEventListener('click', () => {
  validator()
})

select.addEventListener('change', ev => {
  tableBody.innerHTML = ''
  sort().forEach(el => addToTable(el))
})

filterFullname.addEventListener('keyup', (ev) => {
  ev.preventDefault()
  let filterResult = stringFilter(ev.target, 'name', 'middleName', 'lastName')
  if (filterResult) {
    tableBody.innerHTML = ''
    filterResult.forEach(el => {
      addToTable(el)
    })
    return
  }
  tableBody.innerHTML = '';

})

filterFaculty.addEventListener('keyup', (ev) => {
  ev.preventDefault()
  let filterResult = stringFilter(ev.target, 'faculty')
  if (filterResult) {
    tableBody.innerHTML = ''
    filterResult.forEach(el => {
      addToTable(el)
    })
    return
  }
  tableBody.innerHTML = '';

})

filterStudyStart.addEventListener('keyup', (ev) => {
  ev.preventDefault()
  let filterResult = yearFilter(ev.target)
  if (filterResult) {
    tableBody.innerHTML = ''
    filterResult.forEach(el => {
      addToTable(el)
    })
    return
  }
  tableBody.innerHTML = '';

})

filterStudyEnd.addEventListener('keyup', (ev) => {
  ev.preventDefault()
  let filterResult = yearFilter(ev.target, true)
  if (filterResult) {
    tableBody.innerHTML = ''
    filterResult.forEach(el => {
      addToTable(el)
    })
    return
  }
  tableBody.innerHTML = '';

})



