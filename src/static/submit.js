let catUrl = undefined;

function loadCatImg() {
  fetch("https://api.thecatapi.com/v1/images/search")
  .then(v => v.json())
  .then(data => {
    catUrl = data[0].url;
    document.querySelector('#cat').src = catUrl;
  });
}

const title = document.getElementsByName('title')[0];
const comment = document.getElementsByName('comment')[0];
const user = document.getElementsByName('user')[0];

loadCatImg();

document.querySelector('#submit').addEventListener('click', () => {
  fetch(`/api/submit`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: title.value,
      user: user.value,
      comment: comment.value,
      url: catUrl,
    }),
  })
    // .then(r => r.json())
    .then(() => {
      title.value = '';
      comment.value = '';
      user.value = '';
      loadCatImg();
    });
});
