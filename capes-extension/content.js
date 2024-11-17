(function () {
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
    overlay.style.zIndex = '9999';
    overlay.style.cursor = 'crosshair';
    document.body.appendChild(overlay);
  
    const selectionBox = document.createElement('div');
    selectionBox.style.position = 'absolute';
    selectionBox.style.border = '2px dashed white';
    selectionBox.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
    overlay.appendChild(selectionBox);
  
    let startX, startY, isSelecting = false;

    const articles = [
        {
            title: "Wilkins, M.H.F., Stokes, A.R., & Wilson, H.R. (1953). Molecular structure of deoxypentose nucleic acids.",
            link: "https://www.nature.com/articles/171738a0"
        },
        {
            title: "Franklin, R.E., & Gosling, R.G. (1953). Molecular configuration in sodium thymonucleate.",
            link: "https://www.nature.com/articles/171740a0"
        },
        {
            title: "Pauling, L., & Corey, R.B. (1953). A proposed structure for the nucleic acids.",
            link: "https://www.pnas.org/content/39/2/84"
        },
        {
            title: "Chargaff, E. (1950). Chemical specificity of nucleic acids and mechanism of their enzymatic degradation.",
            link: "https://link.springer.com/article/10.1007/BF02173653"
        },
        {
            title: "Avery, O.T., MacLeod, C.M., & McCarty, M. (1944). Studies on the chemical nature of the substance inducing transformation of pneumococcal types.",
            link: "https://rupress.org/jem/article/79/2/137/4695"
        }
    ];

    overlay.addEventListener('mousedown', (e) => {
        isSelecting = true;
        startX = e.clientX;
        startY = e.clientY;
        selectionBox.style.left = `${startX}px`;
        selectionBox.style.top = `${startY}px`;
        selectionBox.style.width = '0px';
        selectionBox.style.height = '0px';
    });
  
    overlay.addEventListener('mousemove', (e) => {
        if (isSelecting) {
            const currentX = e.clientX;
            const currentY = e.clientY;
            const width = Math.abs(currentX - startX);
            const height = Math.abs(currentY - startY);
            selectionBox.style.width = `${width}px`;
            selectionBox.style.height = `${height}px`;
            selectionBox.style.left = `${Math.min(currentX, startX)}px`;
            selectionBox.style.top = `${Math.min(currentY, startY)}px`;
        }
    });
  
    overlay.addEventListener('mouseup', () => {
        isSelecting = false;

        const popup = document.createElement('div');
        popup.style.position = 'fixed';
        popup.style.top = '50%';
        popup.style.left = '50%';
        popup.style.transform = 'translate(-50%, -50%)';
        popup.style.backgroundColor = 'white';
        popup.style.padding = '20px';
        popup.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
        popup.style.zIndex = '10000';
        popup.style.borderRadius = '8px';
        popup.style.width = '60%';
        popup.style.maxHeight = '80%';
        popup.style.overflowY = 'auto';
        popup.style.textAlign = 'left';

        const closeButton = document.createElement('button');
        closeButton.textContent = 'Fechar';
        closeButton.style.marginBottom = '10px';
        closeButton.style.display = 'block';
        closeButton.style.marginLeft = 'auto';
        closeButton.style.marginRight = 'auto';
        closeButton.style.padding = '10px 20px';
        closeButton.style.cursor = 'pointer';
        closeButton.style.border = 'none';
        closeButton.style.borderRadius = '5px';
        closeButton.style.backgroundColor = '#333';
        closeButton.style.color = 'white';

        closeButton.addEventListener('click', () => {
            document.body.removeChild(popup);
            document.body.removeChild(overlay);
        });

        const articlesList = document.createElement('ul');
        articles.forEach(article => {
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.href = article.link;
            link.textContent = article.title;
            link.style.color = '#0066cc';
            link.style.textDecoration = 'none';
            link.target = '_blank';
            listItem.appendChild(link);
            articlesList.appendChild(listItem);
        });

        popup.appendChild(closeButton);
        popup.appendChild(articlesList);
        document.body.appendChild(popup);
    });
})();
