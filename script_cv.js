const backendIPAddress = '127.0.0.1:3000'

const authorizeApplication = () => {
  window.location.href = `http://${backendIPAddress}/courseville/auth_app`
}

const getGroupNumber = () => {
  return 33
}

const getUserProfile = async () => {
  const options = {
    method: 'GET',
    credentials: 'include'
  }
  await fetch(
    `http://${backendIPAddress}/courseville/get_profile_info`,
    options
  )
    .then(response => response.json())
    .then(data => {
      console.log(data.user)
      document.getElementById(
        'eng-name-info'
      ).innerHTML = `${data.user.title_en} ${data.user.firstname_en} ${data.user.lastname_en}`
      document.getElementById(
        'thai-name-info'
      ).innerHTML = `${data.user.title_th} ${data.user.firstname_th} ${data.user.lastname_th}`
    })
    .catch(error => console.error(error))
}

const getCompEngEssCid = async () => {
  await fetch(`http://${backendIPAddress}/courseville/get_courses`, {
    method: 'GET',
    credentials: 'include'
  })
    .then(response => response.json())
    .then(
      ({ data }) =>
        (document.getElementById('ces-cid-value').innerHTML = data.student.find(
          course => course.course_no === '2110221'
        ).cv_cid)
    )
}

const createCompEngEssAssignmentTable = async () => {
  const table_body = document.getElementById('main-table-body')
  table_body.innerHTML = ''
  const cv_cid = document.getElementById('ces-cid-value').innerHTML
  await fetch(
    `http://${backendIPAddress}/courseville/get_course_assignments/${cv_cid}`,
    {
      method: 'GET',
      credentials: 'include'
    }
  )
    .then(response => response.json())
    .then(({ data }) => {
      data.map(assignment => {
        table_body.innerHTML += `
          <tr>
            <td>${assignment.itemid}</td>
            <td>${assignment.title}</td>
          </tr>
        `
      })
    })
}

const logout = async () => {
  window.location.href = `http://${backendIPAddress}/courseville/logout`
}

document.getElementById('group-id').innerHTML = getGroupNumber()
