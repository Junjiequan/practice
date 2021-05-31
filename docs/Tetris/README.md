The first javascript game I've built by following tutorial. I added bunch of new features though. Tetris(JS)
image

main goal
practice DOM, JS syntax and most importantly train my brain adapt to the language logic.

sources used help building
stackOverflow, Google, Youtube, w3shools, original tutorial link.

what have I done differently compare to the tutorial?

added visual and audio features (sound effects, game fail effects etc.,)
added level feature (increase tetromino falling speed based on score)
added reset all button
playable on mobile
design (color, font choice, button etc.,)
fixed multiple bugs (To name one, after paused game you can still force the brick to drop by press down arrow key. Fixed by adding condition into the arrow key)
what have I learned building Tetris?

I feel more comfortable with using following concepts:

document.addEventListener('action', function) |
document.querySelector('#yo') || document.getElementById('yo')
fall = setInterval (drop , 1000) drop is a function || clearInterval(fall)
Element.classList.remove('') || Element.classList.add('') || Element.classList.contains('')
Element.style.backgroundColor = ('white') || Element.style.color = ('')
Element.textContent || Element.innerHTML || Element.innerText
array.forEach(function) || array.some(function) || array.every(function) every is more often used for test condition purpose