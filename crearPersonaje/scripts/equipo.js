

  fetch("./armas.csv")
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to load the JSON file: ' + response.statusText);
        }
        console.log(response);
        transformCsv(response);
    });

    function transformCsv(file) {
            if (file) {
              Papa.parse(file, {
                header: true,  // Si el CSV tiene encabezado
                complete: function(results) {
                     let a = JSON.stringify(results.data, null, 2);
                    console.log(a);
                }
                });

            }
          }