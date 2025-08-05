document.querySelector("body").style.backgroundImage = "var(--Light-Gradient)";

const getData = async() =>{
    const res = await fetch('./data.json');
    const data = await res.json();

    //inserting the html for extensions

    const extensionsList = document.getElementById("extensions-container");
    data.forEach(element => {
        extensionsList.insertAdjacentHTML("beforeend", `
            <div class="single-extension-container">
                <div class="top">
                <div class="img-container">
                    <img class="extension-img" src="${element.logo}" alt="extension-img">
                </div>
                <div class="extension-info">
                    <h2 class="extension-name">${element.name}</h2>
                    <p class="extension-description">${element.description}</p>
                </div>
                </div>
                <div class="bottom">
                <button id="remove-btn" class="remove-button">Remove</button>
                <div class="active-inactive-container">
                    <input type="checkbox"  id="check-${element.name}" ${element.isActive ? "checked" : ""}>
                    <label for="check-${element.name}" class="toggle-button"></label>
                </div>
                </div>
            </div>
        `);
    });

    activateRemovebtn();
}
getData();




const category = document.querySelectorAll('.category-btn');
category.forEach(button =>{
    button.addEventListener('click',()=>{
        category.forEach(btn => btn.classList.remove('selected'));
        button.classList.add('selected');
        //filtering
        const wholeExtension = document.querySelectorAll(".single-extension-container");

        if(button.innerText === "All"){
            wholeExtension.forEach((element)=>{
                element.style.display = "grid";
            });
        }else if(button.innerText === "Active"){
            wholeExtension.forEach((element) =>{
                const input = element.querySelector('input');
                if(input.checked){
                    element.style.display = "grid";
                }else{
                    element.style.display = "none";
                }
            });
        }else if(button.innerText === "Inactive"){
            wholeExtension.forEach((element)=>{
                const input = element.querySelector('input');
                if(!input.checked){
                    element.style.display = "grid";
                }else{
                    element.style.display = "none";
                }
            });
        }
        
    });
});

const activateRemovebtn = ()=>{
    const removeBtn = document.querySelectorAll('.remove-button');
    removeBtn.forEach(button =>{
        button.addEventListener("click", ()=>{
            const extention = button.closest('.single-extension-container');
            extention.remove();
        })
    })
}

const changeThemeButton = document.getElementById("theme-button");
changeThemeButton.addEventListener('click',()=>{
    const moonImg = document.querySelector(".moon-img");
    const sunImg = document.querySelector(".sun-img");
    if(moonImg.style.display === "block"){
        moonImg.style.display = "none";
        sunImg.style.display = "block";
        document.querySelector(".extensions-header").style.backgroundColor = "var(--Neutral-700)";
        document.querySelector("body").style.backgroundImage = "var(--Dark-radient)";
        document.querySelector(".extension-list-heading").style.color = "white";
        document.getElementById("theme-button").style.backgroundColor = "var(--Neutral-800)";
        document.querySelectorAll(".single-extension-container").forEach(container =>{
            container.style.backgroundColor = "var(--Neutral-700)";
            const extName = container.querySelector(".extension-name");
            const extDescription = container.querySelector(".extension-description");
            const remButton = container.querySelector(".remove-button");
            

            extName.style.color = "white";
            extDescription.style.color = "white";
            remButton.style.backgroundColor = "var(--Neutral-500)";
            remButton.style.color = "white";
        })
        
       }else{
        moonImg.style.display = "block";
        sunImg.style.display = "none";
        document.querySelector(".extensions-header").style.backgroundColor = "white";
        document.querySelector("body").style.backgroundImage = "var(--Light-Gradient)";
        document.querySelector(".extension-list-heading").style.color = "black";
        document.getElementById("theme-button").style.backgroundColor = "var(--Neutral-100)"
        document.querySelectorAll(".single-extension-container").forEach(container =>{
            container.style.backgroundColor = "white";
            const extName = container.querySelector(".extension-name");
            const extDescription = container.querySelector(".extension-description");
            const remButton = container.querySelector(".remove-button");
            extName.style.color = "black";
            extDescription.style.color = "black";
            remButton.style.backgroundColor = "white";
            remButton.style.color = "black";
        })    
    }
})






