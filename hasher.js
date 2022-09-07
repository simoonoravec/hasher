$(() => {
    $('#btn_hash').prop('disabled', false);
    $('#text').prop('disabled', false);
});

const toggleForm = (status) => {
    $('#btn_hash').prop('disabled', !status);
    status ? $('#form').removeClass('disabled') : $('#form').addClass('disabled');
}

const popup = (type, title, text, button) => {
    cuteAlert({
        type: type,
        img: `${type}.svg`,
        title: title,
        message: text,
        buttonText: button
    });
}

$('#form').submit(e => {
    e.preventDefault();
    toggleForm(false);

    $.ajax({
        type: 'POST',
        url: './hash.php',
        data: $('#form').serialize(),
        success: function (data) {
            if (data.success) {
                let results = "";
                Object.keys(data.result).forEach((r) => {
                    results = results.concat(`<tr><td style="float:right;">${r}:</td><td><input type="text" style="width:400px;" value="${data.result[r]}" readonly></td></tr>`);
                });
                popup('success', 'Hotovo bratu!', `<table>${results}</table>`, 'Zatvor');
                toggleForm(true);
            } else {
                popup('error', 'Error', 'Vyskytla sa chyba, skús to neskôr bratu.', 'OKE');
                toggleForm(true);
            }
        },
        error: function (data) {
            console.log(data);
            popup('error', 'Error', 'Vyskytla sa chyba, skús to neskôr bratu.', 'OKE');
            toggleForm(true);
        }
    });
});