var useMockData = true; // Cambia a true para usar apimock
var api = useMockData ? apimock : apiclient;

var BlueprintsApp = (function () {
    var blueprints = [];
    var selectedAuthor = '';
    var currentBlueprint = null;
    var originalPoints = []; // Para almacenar los puntos originales

    function getBlueprints() {
        api.getBlueprintsByAuthor(selectedAuthor, function(data) {
            blueprints = data;
            renderBlueprints();
        });
    }

    function renderBlueprints() {
        const tableBody = $('#blueprints-table');
        tableBody.empty();
        let totalPoints = 0;

        blueprints.forEach(bp => {
            const row = $('<tr></tr>');
            row.append(`<td>${bp.name}</td>`);
            row.append(`<td>${bp.points.length}</td>`);

            const button = $('<button class="btn btn-secondary">Open</button>');
            button.click(function() {
                BlueprintsApp.openBlueprint(bp.name);
            });
            const cell = $('<td></td>').append(button);
            row.append(cell);

            tableBody.append(row);
            totalPoints += bp.points.length;
        });

        $('#total-points').text(totalPoints);
    }

    function drawBlueprint(points) {
        const canvas = document.getElementById('blueprint-canvas');
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (!points || points.length === 0) return;

        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);

        for (let i = 1; i < points.length; i++) {
            ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.stroke();
    }

    function openBlueprint(name) {
        const author = $('#author').val();

        $('#current-blueprint-name').text("Cargando...");

        api.getBlueprintsByNameAndAuthor(author, name, function(blueprint) {
            if (blueprint) {
                $('#current-blueprint-name').text(name);
                currentBlueprint = blueprint;
                originalPoints = blueprint.points.slice(); // Guarda los puntos originales
                drawBlueprint(blueprint.points);
            } else {
                $('#current-blueprint-name').text("Plano no encontrado");
            }
        });
    }

    function setAuthor(author) {
        selectedAuthor = author;
        $('#author-name').text(`${author}'s blueprints:`);
    }

    function addPoint(event) {
        const canvas = document.getElementById('blueprint-canvas');
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        if (currentBlueprint) {
            currentBlueprint.points.push({x: x, y: y});
            drawBlueprint(currentBlueprint.points);
            updateTotalPoints();
        }
    }

    function updateTotalPoints() {
        let totalPoints = 0;
        blueprints.forEach(bp => {
            totalPoints += bp.points.length;
        });
        $('#total-points').text(totalPoints);
    }

    function saveOrUpdateBlueprint() {
        if (currentBlueprint) {
            const index = blueprints.findIndex(bp => bp.name === currentBlueprint.name);
            
            if (index !== -1) {
                blueprints[index].points = currentBlueprint.points.slice(); // Copia los puntos actuales
            } else {
                blueprints.push({...currentBlueprint}); // Copia el blueprint actual
            }
            updateTotalPoints();
            renderBlueprints();
        }
    }

    $('#save-blueprint-btn').click(saveOrUpdateBlueprint);

    function clearCanvas() {
        const canvas = document.getElementById('blueprint-canvas');
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function deleteBlueprint(author, blueprintName) {
        const url = `http://localhost:8080/api/blueprints?author=${author}&name=${blueprintName}`;
        return fetch(url, {
            method: 'DELETE'
        }).then(response => {
            if (!response.ok) {
                throw new Error('Error al eliminar el blueprint');
            }
            return response.json();
        });
    }

    $('#delete-blueprint-btn').click(function () {
        const author = $('#author').val();
        const blueprintName = $('#current-blueprint-name').text();
    
        if (currentBlueprint) {
            clearCanvas();
    
            api.deleteBlueprint(author, blueprintName)
                .then(() => {
                    blueprints = blueprints.filter(bp => bp.name !== blueprintName);
                    renderBlueprints();
                    currentBlueprint = null;
                    $('#current-blueprint-name').text('None');
                    updateTotalPoints(); 
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    });

    function initEventHandlers() {
        const canvas = document.getElementById('blueprint-canvas');
        canvas.removeEventListener('pointerdown', addPoint);
        canvas.addEventListener('pointerdown', addPoint);
    }

    return {
        getBlueprints: getBlueprints,
        openBlueprint: openBlueprint,
        setAuthor: setAuthor,
        updateBlueprints: function (author) {
            setAuthor(author);
            getBlueprints();
        },
        initEventHandlers: initEventHandlers
    };
})();

$(document).ready(function () {
    $('#get-blueprints-btn').click(function () {
        const author = $('#author').val();
        BlueprintsApp.updateBlueprints(author);
    });

    BlueprintsApp.initEventHandlers();
});