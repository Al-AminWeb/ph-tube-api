function removeActiveClass() {
    const activeButtons = document.getElementsByClassName('active');
    console.log(activeButtons);

    for (const button of activeButtons) {
        button.classList.remove('active');
    }
}

function loadCategories() {
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
        .then(res => res.json())
        .then(data => displayCategories(data.categories))
}

function loadVideos() {
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
        .then(res => res.json())
        .then(data => {
            document.getElementById("btn-all").classList.add('active');
            displayVideos(data.videos)
        })
}

const loadCategoryVideos = (id) => {
    const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`
    fetch(url)
        .then(res => res.json())
        .then((data) => {
            removeActiveClass();
            const clickedButton = document.getElementById(`btn-${id}`)
            clickedButton.classList.add('active')
            console.log(clickedButton);
            displayVideos(data.category)
        })
}

function displayCategories(categories) {
    const categoryContainer = document.getElementById("category-button")

    for (const category of categories) {
        const categoryDiv = document.createElement("div");
        categoryDiv.innerHTML = `
         <button id="btn-${category.category_id}" onclick="loadCategoryVideos(${category.category_id})" class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${category.category}</button>
        `;
        categoryContainer.append(categoryDiv);
    }
}

const displayVideos = (videos) => {
    const videoContainer = document.getElementById("video-container")
    videoContainer.innerHTML = "";
    if (videos.length === 0) {
        videoContainer.innerHTML = `
        <div class="col-span-full flex flex-col justify-center items-center text-center py-20">
            <img class="w-[120px]" src="images/Icon.png" alt="">
            <h2 class="text-2xl font-bold">Opps! Sorry There Is No Content Here.</h2>
        </div>
        `;
        return;
    }
    videos.forEach((video) => {
        const videoCard = document.createElement("div");
        videoCard.innerHTML = `
     <div class="card">
            <figure class="relative">
                <img class="w-full h-[150px] object-cover" src="${video.thumbnail}"  alt=""/>
                <span class="absolute bottom-2 right-2 text-white bg-black rounded px-2 ">
                3hrs 56 min ago
            </span>
            </figure>
            <div class=" flex gap-3 px-0 py-5">
                <div class="profile">
                    <div class="avatar">
                    <div class="ring-primary ring-offset-base-100 w-6 rounded-full ring ring-offset-2">
                       <img src="${video.authors[0].profile_picture}" />
                    </div>
                </div>
                </div>
                <div class="intro">
                    <h2 class="font-sm font-semibold">Midnight</h2>
                    <p class="text-sm text-gray-400 flex gap-1">${video.authors[0].profile_name}              
                        <img class="w-5 h-5" src="https://img.icons8.com/?size=96&id=98A4yZTt9abw&format=png" alt="">
                    </p>
                    <p class="text-sm text-gray-400">${video.others.views}</p>
                </div>
            </div>
            <button onclick="loadVideoDetails(${video.video_id})" class="btn btn-block">Show Details</button>
        </div>
    `
        videoContainer.append(videoCard);
    })
}
loadCategories();
