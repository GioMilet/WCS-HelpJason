let app = {
    
  fetchOptions : {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      headers:{
          'Accept':'application/json',
      },
  },

  baseUrl: 'http://127.0.0.1:8000/api',

  init: function(){
      app.loadCrewMembers();
      document.querySelector('.new-member-form').addEventListener('submit', app.addNewMember);

  },

  loadCrewMembers: function(){
  fetch(app.baseUrl, app.fetchOptions)
      .then(
          function(response){
              return response.json();
          }
      )
      .then(
          function(crewMembers) {
              let listMember = document.querySelector('.member-list');
              crewMembers.forEach(
                  function(member){
                      let divMember = document.createElement('div');
                      let name = member['name'];
                      if(name.length >= 3) {
                          //take the letter at the index 0 (first letter) cacapitalize then with slice you take the string from the second letter (index 1)
                          divMember.innerHTML = name.charAt(0).toUpperCase() + name.slice(1)
                          divMember.classList.add('member-item');
                          listMember.appendChild(divMember);
                      }
              });
          }
      );
},


addNewMember: function(evt){

evt.preventDefault();


let listMember = document.querySelector('.member-list');
let input = document.querySelector('input');
let newName = input.value
let addMember = document.createElement('div');
let divErr = document.querySelector('.error')
let errMsg = document.createElement('p');
divErr.innerHTML = '';

let data = {
  name: newName,
};

let myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

let ajaxOptions = app.fetchOptions
  ajaxOptions.method = 'POST',
  ajaxOptions.headers= myHeaders,
  ajaxOptions.body = JSON.stringify(data)
  fetch(app.baseUrl, ajaxOptions)
  .then(function (response) {
          if (response.status == 201) {                       
              return response.json()
          } else {
              alert('We\'ve got a problem here');
          }
      }
  )
  .then(
      function (newMember) {
          //newMember return an array but we just need the property 'name'
          name = newMember['name'];
          if(name.length == 0 ){
              errMsg.innerHTML = 'Il n\'a pas de nom ton argonaute?';
              errMsg.style.color = 'red';
              divErr.appendChild(errMsg);
              input.value = '';
          }
          else if(name.length > 0 && name.length < 3){
              errMsg.innerHTML = "C'est pas un peu court comme nom '" + name.charAt(0).toUpperCase() + name.slice(1) + "' ?" ;
              errMsg.style.color = 'red';
              console.log(errMsg)
              divErr.appendChild(errMsg);
              input.value = '';
              
          } else {
              addMember.innerHTML = name
              addMember.classList.add('member-item');
              listMember.appendChild(addMember);
              input.value = '';
              
          };
      })
  }
}
app.init();