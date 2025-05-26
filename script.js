let inputBox = document.getElementById("inputBox");
let parent = document.getElementById("parent");
let button = document.getElementById("btn");

button.addEventListener('click', showGithubUserProfile);

async function showGithubUserProfile() {
    let username = inputBox.value.trim();

    if (!username) {
        alert("Please enter a username");
        return;
    }

    let url = `https://api.github.com/search/users?q=` + username;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            parent.innerHTML = `<p>Error fetching user</p>`;
            return;
        }

        const data = await response.json();

        if (data.items.length === 0) {
            parent.innerHTML = `<p>No users found</p>`;
            return;
        }

        parent.innerHTML = ""; 
        data.items.forEach(user => {
            let userBox = document.createElement("div");
            userBox.className = "box";
            userBox.innerHTML = `
                <div class="image">
                    <img src="${user.avatar_url}" width="100">
                </div>
                <div class="name_profile">
                    <p><strong>${user.login}</strong></p>
                    <p><strong>Bio:</strong> Not available</p>
                    <p><strong>Location:</strong> Not available</p>
                    <p><strong>Followers:</strong> Not available</p>
                    <p><strong>Following:</strong> Not available</p>
                    <a href="${user.html_url}" target="_blank">Visit profile</a><br>
                    <button class="deleteBtn">Delete</button>
                </div>`;

            parent.appendChild(userBox);

            userBox.querySelector(".deleteBtn").addEventListener("click", () => {
                userBox.remove();
            });
        });

    } catch (err) {
        console.log("Error:", err);
        parent.innerHTML = `<p>Please try again.</p>`;
    }
}
