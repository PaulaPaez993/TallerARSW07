var apimock = (function () {
    var mockdata = [];

    mockdata["juan"] = [
        { name: 'house', points: [{x: 10, y: 10}, {x: 20, y: 20}, {x: 30, y: 10}] },
        { name: 'office', points: [{x: 10, y: 10}, {x: 20, y: 30}, {x: 30, y: 10}] },
        { name: 'garden', points: [{x: 10, y: 10}, {x: 20, y: 40}, {x: 30, y: 10}] }
    ];

    mockdata["maria"] = [
        { name: 'park', points: [{x: 10, y: 10}, {x: 20, y: 20}, {x: 30, y: 10}] },
        { name: 'school', points: [{x: 10, y: 10}, {x: 20, y: 30}, {x: 30, y: 10}] },
        { name: 'hospital', points: [{x: 10, y: 10}, {x: 20, y: 40}, {x: 30, y: 10}] }
    ];

    mockdata["carlos"] = [
        { name: 'mall', points: [{x: 10, y: 10}, {x: 20, y: 20}, {x: 30, y: 10}] },
        { name: 'stadium', points: [{x: 10, y: 10}, {x: 20, y: 30}, {x: 30, y: 10}] },
        { name: 'library', points: [{x: 10, y: 10}, {x: 20, y: 40}, {x: 30, y: 10}] }
    ];

    mockdata["Manuel"] = [
        { name: 'buldier', points: [{x: 10, y: 10}, {x: 20, y: 20}, {x: 30, y: 10}] },
        { name: 'torreColpatria', points: [{x: 10, y: 10}, {x: 20, y: 30}, {x: 30, y: 10}] },
        { name: 'school', points: [{x: 10, y: 10}, {x: 20, y: 40}, {x: 30, y: 10}] }
    ];

    mockdata["Paula"] = [
        { name: 'SantaFe', points: [{x: 10, y: 10}, {x: 20, y: 20}, {x: 30, y: 10}] },
        { name: 'Unicentro', points: [{x: 10, y: 10}, {x: 20, y: 30}, {x: 30, y: 10}] },
        { name: 'Andino', points: [{x: 10, y: 10}, {x: 20, y: 40}, {x: 30, y: 10}] }
    ];

    function deleteBlueprint(author, blueprintName) {
        const blueprints = mockdata[author];
        if (blueprints) {
            const index = blueprints.findIndex(bp => bp.name === blueprintName);
            if (index !== -1) {
                blueprints.splice(index, 1); // Elimina el blueprint del arreglo
                return Promise.resolve(); // Simula una operación exitosa
            }
        }
        return Promise.reject(new Error('Blueprint not found')); // Simula un error si no se encuentra
    }

    return {
        getBlueprintsByAuthor: function (author, callback) {
            callback(mockdata[author]);
        },
        getBlueprintsByNameAndAuthor: function (author, blueprintName, callback) {
            const blueprints = mockdata[author];
            if (blueprints) {
                const blueprint = blueprints.find(bp => bp.name === blueprintName);
                callback(blueprint);
            } else {
                callback(null);
            }
        },
        deleteBlueprint: deleteBlueprint // Añade el método de eliminación
    };
})();