var APIClient = (function() {
    const baseUrl = "http://localhost:8080/api/blueprints";

    function getBlueprintsByAuthor(author, callback) {
        $.get(baseUrl + "?author=" + author, function(data) {
            callback(data);
        }).fail(function(error) {
            callback(null, error); 
        });
    }

    function getBlueprintsByNameAndAuthor(author, blueprintName, callback) {
        $.get(baseUrl + "?author=" + author + "&name=" + blueprintName, function(data) {
            callback(data);
        }).fail(function(error) {
            callback(null, error);
        });
    }

    function deleteBlueprint(author, blueprintName) {
        return $.ajax({
            url: baseUrl + "?author=" + author + "&name=" + blueprintName,
            type: 'DELETE'
        });
    }

    return {
        getBlueprintsByAuthor: getBlueprintsByAuthor,
        getBlueprintsByNameAndAuthor: getBlueprintsByNameAndAuthor,
        deleteBlueprint: deleteBlueprint // Asegúrate de incluir este método
    };
})();