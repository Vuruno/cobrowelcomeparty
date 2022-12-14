fetch('/getPagados')
    .then(res => { return res.json() })
    .then(data => {
        let table = document.getElementById('tbPagados')
        let text = ''
        for (x of data) {
            text += '<tr>'

            text += `<td>${x.Nombre}</td>`
            text += `<td>${x.Cohorte}</td>`
            text += `<td>${x.Carrera}</td>`
            text += `<td>${x.Cobrador}</td>`
            text += `<td>${x.Fecha}</td>`
            text += `<td> <a class="confirmation btn btn-sm btn-primary align-center" href="/delete/${x.CIP}">
                        <span class="material-symbols-outlined">
                            delete
                        </span> </a> </td>`
            text += '</tr>'
        }

        

        table.innerHTML = text

        var confirmIt = function (e) {
            if (!confirm('Eliminar permanentemente?')) e.preventDefault();
            else that.innerHTML = '<div class="spinner-border spinner-border-sm text-light" role="status"><span class="visually-hidden">Loading...</span></div>'
        };

        var elems = document.getElementsByClassName('confirmation');
        for (var i = 0, l = elems.length; i < l; i++) {
            elems[i].addEventListener('click', confirmIt, false);
        }
    })