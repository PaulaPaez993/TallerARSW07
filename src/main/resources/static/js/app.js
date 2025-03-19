var useMockData = true; // Cambia a true para usar apimock
var api = useMockData ? apimock : apiclient;

var BlueprintsApp = (function () {
    var blueprints = [];
    var selectedAuthor = '';

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
            row.append(`<td>${bp.points}</td>`);

            const button = $('<button class="btn btn-secondary">Open</button>');
            button.click(function() {
                BlueprintsApp.openBlueprint(bp.name);
            });
            const cell = $('<td></td>').append(button);
            row.append(cell);

            tableBody.append(row);
            totalPoints += bp.points;
        });

        $('#total-points').text(totalPoints);
    }

    function drawBlueprint(points) {
        const canvas = document.getElementById('blueprint-canvas');
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (!points) return;

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

    return {
        getBlueprints: getBlueprints,
        openBlueprint: openBlueprint,
        setAuthor: setAuthor,
        updateBlueprints: function (author) {
            setAuthor(author);
            getBlueprints();
        }
    };
})();

$('#get-blueprints-btn').click(function () {
    const author = $('#author').val();
    BlueprintsApp.updateBlueprints(author);
});