/* document.addEventListener('DOMContentLoaded', function () {
    const sidebarItems = document.querySelectorAll('#intro, #Pre-Test, #Demo, #Post-Test, #learningObjective, #overview, #def, #Simulation');
    const contentSections = document.querySelectorAll('.korem-ipsum-dolor');

    sidebarItems.forEach((item, index) => {
        item.addEventListener('click', (e) => {
            contentSections.forEach(section => {
                section.style.display = 'none';
            });

            contentSections[index].style.display = 'block';
        });
    });
}); */

document.addEventListener('DOMContentLoaded', function () {
    const sidebarItems = document.querySelectorAll('#intro, #Pre-Test, #Demo, #Post-Test, #learningObjective, #overview, #def, #Simulation');
    const contentSections = document.querySelectorAll('.korem-ipsum-dolor');

    sidebarItems.forEach((item, index) => {
        item.addEventListener('click', (e) => {
            contentSections.forEach(section => {
                section.style.display = 'none';
            });

            contentSections[index].style.display = 'block';
        });
    });
});