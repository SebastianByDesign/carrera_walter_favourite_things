const myVM = (() => {
    let animalButtons = document.querySelectorAll('.a-link'),
        lightBox = document.querySelector('.lightbox');

    function parseAnimalData(animal) {
        let targetDiv = lightBox.querySelector('.lb-content'),
            targetImg = lightBox.querySelector('img');

        let descriptionContent = `
            <p>${animal.description}</p>
            <h4>Special Ability:</h4>
            <p>${animal.ability}</p>
        `;

        targetDiv.innerHTML = descriptionContent;
        targetImg.src = animal.currentSrc;

        lightBox.classList.add('show-lb');
    }

    function getAnimalData(event) {
        event.preventDefault();

        let url = `/animals/${this.getAttribute('href')}`,
            currentImg = this.previousElementSibling.getAttribute('src');

        fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                
                data.currentSrc = currentImg;
                parseAnimalData(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    animalButtons.forEach(button => button.addEventListener("click", getAnimalData));

    lightBox.querySelector('.close').addEventListener("click", function() {
        lightBox.classList.remove('show-lb');
    });
})();