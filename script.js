document.addEventListener("DOMContentLoaded", () => {
    const profileList = document.getElementById("profileList");
    const numProfilesInput = document.getElementById("numProfiles");
    const loadProfilesButton = document.getElementById("loadProfiles");
    const clearProfilesButton = document.getElementById("clearProfiles");

    const generateProfiles = async () => {
        const numProfiles = parseInt(numProfilesInput.value, 10);

    
        if (!numProfiles || numProfiles < 1 || numProfiles > 20) {
            alert("Por favor, insira um número entre 1 e 20.");
            return;
        }

        profileList.innerHTML = "<p>Carregando perfis...</p>"; 

        try {
            const response = await fetch(`https://randomuser.me/api/?results=${numProfiles}`);
            const data = await response.json();

           
            const fragment = document.createDocumentFragment();

            data.results.forEach(user => {
                const profile = document.createElement("div");
                profile.className = "profile";

                const img = document.createElement("img");
                img.src = user.picture.medium;
                img.alt = `${user.name.first} ${user.name.last}`;
                img.loading = "lazy"; 

                const name = document.createElement("p");
                name.textContent = `${user.name.first} ${user.name.last}`;

                profile.appendChild(img);
                profile.appendChild(name);
                fragment.appendChild(profile);
            });

            
            profileList.innerHTML = ""; 
            profileList.appendChild(fragment);
        } catch (error) {
            console.error("Erro ao carregar perfis:", error);
            profileList.innerHTML = "<p>Erro ao carregar perfis. Tente novamente.</p>";
        }
    };

    
    const clearProfiles = () => {
        profileList.innerHTML = ""; 
    };

 
    loadProfilesButton.addEventListener("click", generateProfiles);
    clearProfilesButton.addEventListener("click", clearProfiles);
});
