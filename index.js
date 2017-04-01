/*
microLite.js — NPM package edition!
--------------------------
An uber small 1kb lightbox, all originally
based on microlite by @danklammer:
https://github.com/danklammer/microlite
*/

module.exports = function microLite(e) {
    e.preventDefault();

    // Create variables
    var childNode = e.target,
        body = document.body,
        zoomPadding = 50,
        windowWidth = window.innerWidth - (zoomPadding * 2),
        windowHeight = window.innerHeight - (zoomPadding * 2),
        imgWidth = childNode.width,
        imgHeight = childNode.height,
        imgX = childNode.offsetLeft,
        imgY = parseInt(childNode.offsetTop - (document.documentElement.scrollTop || body.scrollTop)),
        scaleX = windowWidth / imgWidth,
        scaleY = windowHeight / imgHeight,
        scaleMax = Math.min(scaleX, scaleY),
        mlite = document.createElement('div');

    // Determine if image is portait or landscape and set appropriate X + Y
    if (scaleX <= scaleY) {
        var zoomX = zoomPadding,
            zoomY = ((windowHeight - (imgHeight * scaleMax)) / 2) + zoomPadding;
    } else {
        var zoomX = ((windowWidth - (imgWidth * scaleMax)) / 2) + zoomPadding,
            zoomY = zoomPadding;
    }

    mlite.setAttribute('id', 'ml');

    // Set onClick 
    mlite.setAttribute(
        'onclick',
        'this.className = " "; addEventListener("transitionend", function() { if (this.parentNode) { this.parentNode.removeChild(this); } });'
    );

    // Create image container 
    mlite.innerHTML = '<div class="mlbg"></div><div class="mli"></div><style>#ml{cursor:pointer;position:fixed;top:0;left:0;width:100%;height:100%}.mlbg{position:fixed;width:100%;height:100%;background:#0a0a0a;opacity:0;will-change:opacity;transition:opacity .4s ease}.mli{background:url(' + e.target.href + ')no-repeat center,url(' + childNode.src + ')no-repeat center;background-size:contain;width:' + childNode.width + 'px;height:' + childNode.height + 'px;transform:translate3d(' + imgX + 'px, ' + imgY + 'px, 0) scale(1);transform-origin:top left;will-change:transform;transition:transform .4s ease}.s .mlbg{opacity:0.8}.s .mli{transform: translate3d(' + zoomX + 'px, ' + zoomY + 'px, 0) scale(' + scaleMax + ')}</style>';

    // Append MicroLite to bottom of page
    body.appendChild(mlite);

    // Set a short time gap to allow CSS transition to occur
    setTimeout(function() {
        mlite.className = 's';
    }, 20);

    // Add event listeners for escape key (to close), and wheel (to stop scrolling)
    ['keydown', 'wheel'].forEach(function(action) {
        window.addEventListener(action, mliteEventHandler);
    });
}

// Event handler. Attaches events and also cancels them.
function mliteEventHandler(evt) {
    var mliteOpen = document.getElementById('ml');
    var isEscape = false;
    if (mliteOpen) {
        if (evt.type == "wheel") {
            evt.preventDefault();
        } else {
            if ("key" in evt) {
                isEscape = (evt.key == "Escape" || evt.key == "Esc");
            } else {
                isEscape = (evt.keyCode == 27);
            }
            if (isEscape) {
                mliteOpen.className = " ";
                addEventListener("transitionend", function() {
                    if (mliteOpen.parentNode) {
                        mliteOpen.parentNode.removeChild(mliteOpen);
                    }
                });
            }
        }
    } else {
        // Remove event listeners if microlite isn't open any longer
        window.removeEventListener('keydown', mliteEventHandler);
        window.removeEventListener('wheel', mliteEventHandler);
    }
}
