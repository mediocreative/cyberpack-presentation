document.addEventListener('DOMContentLoaded', () => {
    const slideFrame = document.getElementById('slide-frame');
    const prevButton = document.getElementById('prev-slide');
    const nextButton = document.getElementById('next-slide');
    const currentSlideNumberDisplay = document.getElementById('current-slide-number');
    const totalSlideNumberDisplay = document.getElementById('total-slide-number');

    // --- IMPORTANT: VERIFY THIS SECTION ---
    // This array should list the paths to your HTML slide files,
    // relative to the main index.html file.
    //
    // Example structure:
    // my_presentation_project/
    // ├── index.html
    // ├── script.js
    // └── slides/
    //     ├── slide1.html
    //     ├── slide2.html
    //     └── slide3.html
    //
    // Ensure the names and the 'slides/' prefix are correct.
    // Add or remove files as needed.
    const slideFiles = [
        'slides/slide1.html',       // Path to your first slide
        'slides/slide2.html',       // Path to your second slide
        'slides/slide3.html',       // Path to your third slide
        'slides/slide4.html',
        'slides/slide5.html',
        'slides/slide6.html',
        'slides/slide7.html',
        'slides/slide8.html',
        'slides/slide9.html',// Example for adding more slides
        // 'slides/yet_another_slide.html'
    ];
    // --- END OF IMPORTANT SECTION ---

    let currentSlideIndex = 0;

    function loadSlide(index) {
        if (index >= 0 && index < slideFiles.length) {
            slideFrame.src = slideFiles[index];
            currentSlideIndex = index;
            updateSlideCounter();
            updateNavButtons();
        } else {
            console.error("Attempted to load an invalid slide index:", index);
            // Optionally display an error in the iframe or console
            // slideFrame.srcdoc = "<p style='color:red; text-align:center; padding-top:50px;'>Error: Slide not found.</p>";
        }
    }

    function updateSlideCounter() {
        if (slideFiles.length > 0) {
            currentSlideNumberDisplay.textContent = currentSlideIndex + 1;
            totalSlideNumberDisplay.textContent = slideFiles.length;
        } else {
            currentSlideNumberDisplay.textContent = '0';
            totalSlideNumberDisplay.textContent = '0';
        }
    }

    function updateNavButtons() {
        if (slideFiles.length === 0) {
            prevButton.style.display = 'none';
            nextButton.style.display = 'none';
            return;
        }

        prevButton.disabled = currentSlideIndex === 0;
        nextButton.disabled = currentSlideIndex === slideFiles.length - 1;

        // Optional: visually indicate disabled state or hide buttons
        // prevButton.style.opacity = prevButton.disabled ? 0.5 : 1;
        // nextButton.style.opacity = nextButton.disabled ? 0.5 : 1;

        // Or hide them if at the start/end
        // prevButton.style.display = currentSlideIndex === 0 ? 'none' : 'flex';
        // nextButton.style.display = currentSlideIndex === slideFiles.length - 1 ? 'none' : 'flex';
    }

    prevButton.addEventListener('click', () => {
        if (currentSlideIndex > 0) {
            loadSlide(currentSlideIndex - 1);
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentSlideIndex < slideFiles.length - 1) {
            loadSlide(currentSlideIndex + 1);
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (event) => {
        if (slideFiles.length === 0) return; // No slides, no keyboard nav

        if (event.key === 'ArrowRight' || event.key === 'PageDown' || event.key === ' ') { // Space, Right Arrow, PageDown for next
            event.preventDefault(); // Prevent space from scrolling the page if iframe isn't focused
            if (currentSlideIndex < slideFiles.length - 1) {
                loadSlide(currentSlideIndex + 1);
            }
        } else if (event.key === 'ArrowLeft' || event.key === 'PageUp') { // Left Arrow, PageUp for previous
            event.preventDefault();
            if (currentSlideIndex > 0) {
                loadSlide(currentSlideIndex - 1);
            }
        } else if (event.key === 'Home') { // Home key to go to the first slide
            event.preventDefault();
            loadSlide(0);
        } else if (event.key === 'End') { // End key to go to the last slide
            event.preventDefault();
            loadSlide(slideFiles.length - 1);
        }
    });

    // Initial load
    if (slideFiles.length > 0) {
        loadSlide(0); // Load the first slide
    } else {
        // Handle case where no slides are defined
        const presentationContainer = document.querySelector('.presentation-container');
        if (presentationContainer) {
            presentationContainer.innerHTML = "<p style='text-align:center; padding-top: 50px; font-size: 1.2em;'>No slides found.<br>Please check the <code>slideFiles</code> array in <code>script.js</code>.</p>";
        }
        // Hide navigation elements if no slides
        if (prevButton) prevButton.style.display = 'none';
        if (nextButton) nextButton.style.display = 'none';
        const slideCounterElement = document.querySelector('.slide-counter');
        if (slideCounterElement) slideCounterElement.style.display = 'none';
        console.warn("The 'slideFiles' array is empty. No slides to display.");
    }
});
