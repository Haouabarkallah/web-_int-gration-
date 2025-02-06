document.getElementById('filter').addEventListener('change', async (event) => {  
    const status = event.target.value;  
    const response = await fetch('/candidatures');  
    const candidatures = await response.json();  
    
    const filteredCandidatures = status === 'all' ? candidatures : candidatures.filter(c => c.statut.toLowerCase() === status);  
    renderCandidatures(filteredCandidatures);  
});  

function renderCandidatures(candidatures) {  
    const candidatureList = document.getElementById('candidature-list');  
    candidatureList.innerHTML = '';  
    
    candidatures.forEach(c => {  
        const li = document.createElement('li');  
        li.innerText = `${c.nom} - ${c.programme} (${c.statut})`;  
        
        const updateForm = document.createElement('form');  
        updateForm.innerHTML = `  
            <select name="statut">  
                <option value="En attente">En attente</option>  
                <option value="Acceptée">Acceptée</option>  
                <option value="Rejetée">Rejetée</option>  
            </select>  
            <button type="submit">Mettre à jour</button>  
        `;  
        
        updateForm.addEventListener('submit', async (e) => {  
            e.preventDefault();  
            const statut = updateForm.statut.value;  
            const res = await fetch(`/update/${c.id}`, {  
                method: 'POST',  
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },  
                body: new URLSearchParams({ statut })  
            });  
            const message = await res.text();  
            alert(message);  
            renderCandidatures(candidatures); // Rafraîchir la liste  
        });  
        
        li.appendChild(updateForm);  
        candidatureList.appendChild(li);  
    });  
}  

// Initialisation de l'affichage des candidatures  
(async () => {  
    const response = await fetch('/candidatures');  
    const candidatures = await response.json();  
    renderCandidatures(candidatures);  
})();