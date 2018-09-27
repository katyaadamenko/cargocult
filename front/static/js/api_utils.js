const apiUrl = 'http://localhost:8000/api/';

async function get_licences() {
  const response = await fetch(`${apiUrl}licences/`);
  return response.json();
}

async function add_license(track, route, number, start_date, end_date) {
  const response = await fetch(`${apiUrl}licences/`, {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({ track, route, number, start_date, end_date }),
  });
  if(response.status !== 201) {
    console.log(response)
    alert('filed to post new license! =(');
    return;
  }
  return response.json();
  // const data = await response.json();
  // console.log('succesfully created new license')
  // console.log(data);
}
