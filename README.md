# Quote Generator<br />


&nbsp;&nbsp;&nbsp;This is a quote generator with a Tweet button. For this project, I went with a slot machine design. Click the handle and the quote will type along the screen. There are only a handful of quotes, each one an object
stored within an array. The quote generator goes through a cycle; it won't choose the same 'random' quote until all the other quotes have been shown, in which case a new random cycle begins. One of the intended challenges for this project
 was modifying strings to show correctly in both HTML and URL.
<br />A note about the red ball on the handle - I was experimenting with creating a 3D ball by rotating a lot of red div elements. The design seems to work in Chrome, creating a hybrid between a 3D ball and a 2D bar. 
For Firefox, not only does it look really wonky, but the handle 
flips the wrong direction because of how Firefox handles transforms. The '3d' design is scrapped altogether in mobile devices. I realize this was not the wisest implementation, but I included it nonetheless because I felt it was an 
interesting experiment.
<br />
<br />Project page: https://jx2bandito.github.io/quoteMachine/
<br />
<br />Originally made in Codepen: https://codepen.io/jx2bandito/pen/evjGVX
<br />
<br />FreeCodeCamp prompt: https://www.freecodecamp.org/challenges/build-a-random-quote-machine