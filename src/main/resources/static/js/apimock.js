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
        }
    };
})();
