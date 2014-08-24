var rotate = {

    config: {
        autoRotate: true,
        containerClass: 'rotate-container',
        nextClass: 'fade-right',
        prevClass: 'fade-left'
    },

    nsVariables: {
        collection: [],
        images: [],
        imgCounter: 0,
        ranRecursiveSetWidth: false
    },

    init: function() {

        var rotateContainers = document.getElementsByClassName(rotate.config.containerClass);
        var nextButtons = document.getElementsByClassName(rotate.config.nextClass);
        var prevButtons = document.getElementsByClassName(rotate.config.prevClass);

        for (i = 0; i < rotateContainers.length; i++) {

            var rotator = {
                html: rotateContainers[i],
                currentIndex: 0
            }

            rotate.nsVariables.collection.push(rotator);
        }

        for (i = 0; i < document.images.length; i++) {

            // Avoid undefined error
            if (!rotate.hasTwoOffsetParents(document.images[i])) continue;

            if (document.images[i].offsetParent.offsetParent.className == rotate.config.containerClass) {
                rotate.nsVariables.images.push(document.images[i]);
            }
        }

        // Add load event listener to to all images in the rotate containers
        for (i = 0; i < rotate.nsVariables.images.length; i++) {

            // If images are loaded before init function is fired
            if (rotate.nsVariables.images[i].clientWidth != 0) {
                rotate.setWidth();
                continue;
            }

            // Add load event listener 
            rotate.nsVariables.images[i].addEventListener('load', rotate.setWidth, true);
        }

        for(i = 0; i < nextButtons.length; i++){
            nextButtons[i].addEventListener('click', rotate.cycle, true);
        }

        for(i = 0; i < prevButtons.length; i++){
            prevButtons[i].addEventListener('click', rotate.cycle, true);
        }

        window.onresize = rotate.refreshLeft;
    },

    setWidth: function() {

        if (rotate.nsVariables.imgCounter != rotate.nsVariables.images.length) {
            rotate.nsVariables.imgCounter += 1;
        }


        // If all images are not loaded, return
        if (rotate.nsVariables.imgCounter != rotate.nsVariables.images.length) return;

        // Set width for all rotate lists 
        for (j = 0; j < rotate.nsVariables.collection.length; j++) {

            var activeTarget = rotate.nsVariables.collection[j].html;
            var width = 0,
                list = rotate.getListNode(activeTarget),
                listItems = list.children;

            for (i = 0; i < listItems.length; i++) {
                width += listItems[i].clientWidth;
            }

            // Add 1 to width to clear combined list-item lengths
            width++;

            // Set list width
            list.style.width = width.toString() + 'px';
            list.style.left = '0px';

            // Unhide list
            activeTarget.style.left = '0px';
        }

        if (rotate.nsVariables.ranRecursiveSetWidth) return;
        rotate.nsVariables.ranRecursiveSetWidth = true;

        // Recursive function call for Safari mobile fix
        rotate.setWidth();
    },

    cycle: function(e) {
        var currentRotateObject = (function(){

            var collection = rotate.nsVariables.collection;

            for(i = 0; i < collection.length; i++){
                if(collection[i].html == e.currentTarget.parentNode)
                    return collection[i];
            }
        })();

        var list = rotate.getListNode(currentRotateObject.html),
        maxLeftVal = currentRotateObject.html.clientWidth - list.clientWidth,
        currentLeftInt = parseInt(list.style.left.replace('px', '')),
        currentListItemWidth = list.children[currentRotateObject.currentIndex].clientWidth,
        goTo = (function() {

            // Next
            if (e.currentTarget.className == rotate.config.nextClass) {

                var next = currentLeftInt - currentListItemWidth;

                // Check if next value is greater than max left value
                if (next < maxLeftVal) {
                    next = maxLeftVal;
                    currentRotateObject.currentIndex = list.children.length - 1;
                }
                if (currentRotateObject.currentIndex < list.children.length - 1) {
                    currentRotateObject.currentIndex++;
                }
                return next;
            }

            // Previous
            if (e.currentTarget.className == rotate.config.prevClass) {

                var prev = currentLeftInt + currentListItemWidth;

                if (prev > 0) {
                    prev = 0;
                    currentRotateObject.currentIndex = 0;
                }

                if (currentRotateObject.currentIndex != 0) {
                    currentRotateObject.currentIndex--;
                }

                return prev;
            }
        })();

        // Sets the list's left css property. Uses CSS transitions for animation.
        list.style.left = goTo.toString() + 'px';
    },

    getListNode: function(activeTarget) {

        for (i = 0; activeTarget.children.length; i++) {
            if (activeTarget.children[i].tagName == 'UL') {
                return activeTarget.children[i];
            }
        }
    },

    refreshLeft: function() {
        var collection = rotate.nsVariables.collection;
        for (i = 0; i < collection.length; i++) {
            var list = rotate.getListNode(collection[i].html);
            if (list.style.left != '0px')
                list.style.left = '0px';
        }
    },

    hasTwoOffsetParents: function(activeTarget) {

        if (activeTarget.offsetParent == null) return false;
        if (activeTarget.offsetParent.offsetParent == null) return false;
        return true;
    }
}