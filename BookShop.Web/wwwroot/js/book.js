$(function () {
    $("#btnSave").on("click", function (event) {
        var forms = document.getElementsByClassName('needs-validation');

        var validation = Array.prototype.filter.call(forms, function (form) {
            if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
            }
            else {                
                SaveBook();    
            }
            form.classList.add('was-validated');
            if (form.checkValidity() === true) {               
                form.classList.remove("was-validated");
                ClearInput();
            }
        });
       
    });
    $('#idAuthor').on('change', function () {        
        var id = this.value;
        var valid = ValidBookAuthor(id);
        if (valid == 0) {
            cuteAlertLargo({
                type: "warning",
                title: "Mantención de Registros",
                message: "El autor seleccionado ya cuenta con el máximo de ingresos permitidos (10).",
                buttonText: "Okay"
            });
            $("#idAuthor").prop("selectedIndex", 0);    
        }
    });
    RefreshAuthor();
    var response = GetBooks();
    DesignerTableBook(response.data);    
});
function GetBooks() {
    var responseFn = {
        status: false,
        data: 0
    };
    $.ajax({
        url: "/Book/GetBooks/",
        type: 'GET',
        processData: false,
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        async: false,
        success: function (response) {
            responseFn = response;
        },
        error: function (xhr, status, error) {
            console.log(error);
        },
    });
    return responseFn;
}
function DesignerTableBook(data) {

    let table = new DataTable('#tblBook', {
        destroy: true,
        retrieve: true,
        data: data,
        responsive: true,
        orderCellsTop: true,
        fixedHeader: true,
        fixedColumns: true,
        retrieve: true,
        paging: true,
        scrollY: '300px',
        scrollCollapse: true,
        scrollX: true,
        columns: [
            { data: "id", title: 'Id', width: '200px;', visible: false },
            { data: "title", title: 'Título', width: '200px;', className: 'dt-center' },
            { data: "year", title: 'Año', width: '100px;', className: 'dt-center' },
            { data: "numberPages", title: 'Número de páginas', width: '100px;', className: 'dt-center' },
            { data: "idAuthor", title: 'Autor', width: '100px;', visible: false },
            {
                title: "Autor", "width": "200px", "orderable": false, "data": null, className: 'dt-center',
                "render": function (data, type, full, meta) {                    
                    var nameAuthor = $("#idAuthor").find('option[value=' + data.idAuthor +']').text()
                    return nameAuthor;
                }
            },                
            {
                title: "Acciones", "width": "100px", "orderable": false, "data": null,
                "render": function (data, type, full, meta) {
                    return '<a class="dt-editBook" data-id="' + data.id + '"><i class="fa fa-edit"></i></a>&nbsp;<a class="dt-deleteBook" data-id="' + data.id + '"><i class="fa fa-trash"></i></a>';
                }
            },
        ],
        fixedHeader: {
            footer: true
        }
    });
    $('#tblBook tbody').on('click', '.dt-editBook', function () {
        var $row = $(this).closest('tr');
        var data = $('#tblBook').DataTable().row($row).data();
        $("#id").val(data['id']);
        $("#title").val(data['title']);
        $("#year").val(data['year']);        
        $("#numberPages").val(data['numberPages']);   
        $("#idAuthor option[value=" + data['idAuthor'] + "]").attr("selected", true);        
    });
    $('#tblBook tbody').on('click', '.dt-deleteBook', function () {

        var $row = $(this).closest('tr');
        var data = $('#tblBook').DataTable().row($row).data();

        var id = data['id'];

        cuteAlertLargo({
            type: "question",
            title: "Mantención de registros",
            message: "¿Deseas eliminar el registro?",
            confirmText: "Si",
            cancelText: "Cancelar"
        }).then((e) => {
            if (e == ("confirm")) {
                DeleteBook(id);
                $('#tblBook').DataTable().draw();

            }
        })
    });
}
function SaveBook() {
    var Models = {
        Id: $("#id").val(),
        Title: $("#title").val(),
        Year: $("#year").val(),
        NumberPages: $("#numberPages").val(),
        IdAuthor: $("#idAuthor").val()        
    };
    $.ajax({
        url: "/Book/SaveBook/",
        type: 'POST',
        processData: false,
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        data: JSON.stringify(Models),
        async: false,
        success: function (response) {
            if (response.status == 1) {
                var lst = GetBooks();
                $('#tblBook').DataTable().clear().rows.add(lst.data).draw();
                
            }
            else {
                cuteAlert({
                    type: "warning",
                    title: "Mantención de Registros",
                    message: "No se pudo guardar el registro.",
                    buttonText: "Okay"
                })
            }
        },
        error: function (xhr, status, error) {
            console.log(error);
        },
    });
}
function DeleteBook(id) {
    var Models = {
        Id: id
    };
    $.ajax({
        url: "/Book/DeleteBook/",
        type: 'POST',
        processData: false,
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        data: JSON.stringify(Models),
        async: false,
        success: function (response) {
            if (response.status == 1) {
                var lst = GetBooks();
                $('#tblBook').DataTable().clear().rows.add(lst.data).draw();
            }
            else {
                cuteAlert({
                    type: "warning",
                    title: "Mantención de Registros",
                    message: "No se pudo eliminar el registro.",
                    buttonText: "Okay"
                })
            }
        },
        error: function (xhr, status, error) {
            console.log(error);
        },
    }); 
}
function ClearInput() {
    $("#id").val("0");
    $("#title").val("");
    $("#year").val("");
    $("#numberPages").val("");  
    $("#idAuthor").prop("selectedIndex", 0);    
}
function RefreshAuthor() {
    var Models = {
        IdAuthor: $("#idAuthor option:selected").val(),
    };
    $.ajax({
        url: "/Author/GetAuthors/",
        type: 'POST',
        processData: false,
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        data: JSON.stringify(Models),
        async: false,
        success: function (response) {
            if (response.data != null) {
                $("#idAuthor").empty();
                if (response.data.length > 0) {
                    $("#idAuthor").append("<option value=0>Seleccione autor</option>");
                    for (var i = 0, l = response.data.length; i < l; i++) {
                        var nombre = response.data[i].firstName + " " + response.data[i].lastName;
                        $("#idAuthor").append("<option value=" + response.data[i].id + ">" + nombre +
                            "</option>");
                        $("#idAuthor").prop('disabled', false);
                    }
                }
                else {
                    cuteAlert({
                        type: "warning",
                        title: "Mantención de Registros",
                        message: "No existen autores creados, no podrá ingresar libros sin autores.",
                        buttonText: "Okay"
                    })
                }
            }
        },
        error: function (xhr, status, error) {
            console.log(error);
        },
    });
}
function ValidBookAuthor(id) { 
    var valid = 1;
    var obj = GetBooks();
    let newArray = obj.data.filter(function (el) {
        return el.idAuthor == id;
    }
    );
    if (newArray.length >= 2) {
        valid=0
    }
    return valid;
}