$(function () {
    $("#btnSave").on("click", function (event) {        
        var forms = document.getElementsByClassName('needs-validation');
        
        var validation = Array.prototype.filter.call(forms, function (form) {           
            if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
            }
            else {
                SaveAuthor();                
            }
            form.classList.add('was-validated');  
            if (form.checkValidity() === true) {
                form.classList.remove("was-validated");
                ClearInput();
            }
        });
    });
    var response = GetAuthors();   
    DesignerTableAuthor(response.data);
});
function GetAuthors() {  
    var responseFn = {
        status: false,
        data: 0
    };
    $.ajax({
        url: "/Author/GetAuthors/",
        type: 'POST',
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
function DesignerTableAuthor(data) {
  
    let table = new DataTable('#tblAuthor', {
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
            { data: "id", title: 'Id', width: '10px;', visible: false },
            { data: "identifier", title: 'Rut', width: '10px;', className: 'dt-center' },            
            {
                title: "Nombre Completo", "width": "10px", "orderable": false, "data": null,                
                "render": function (data, type, full, meta) {                    
                    var name = data.firstName + " " + data.lastName;                   
                    return name;
                }
            },             
            {
                data: "birthdate", title: 'Fecha Nacimiento', width: '10px;', className: 'dt-center',
                "render": function (data, type, full, meta) {
                    var dat = data;
                    if (typeof dat !== "undefined") {
                        dat = formatDate(data);
                    }
                    return dat;
                }
            },           
            { data: "cityOrigin", title: 'Ciudad Origen', width: '10px;', className: 'dt-center' },
            { data: "email", title: 'Correo', width: '10px;', className: 'dt-center' },   
            {
                title: "Acciones", "width": "10px", "orderable": false, "data": null,
                "render": function (data, type, full, meta) {
                    return '<a class="dt-editAuthor" data-id="' + data.id + '"><i class="fa fa-edit"></i></a>&nbsp;<a class="dt-deleteAuthor" data-id="' + data.id + '"><i class="fa fa-trash"></i></a>';
                }
            },
        ],
        fixedHeader: {
            footer: true
        }
    });  
    $('#tblAuthor tbody').on('click', '.dt-editAuthor', function () {        
        var $row = $(this).closest('tr');
        var data = $('#tblAuthor').DataTable().row($row).data();        
        $("#id").val(data['id']);
        $("#identifier").val(data['identifier']);
        $("#firstname").val(data['firstName']);
        $("#lastname").val(data['lastName']);        
        birthdate = formatDateShow(data['birthdate']);        
        $("#birthdate").val(birthdate);
        $("#cityorigin").val(data['cityOrigin']);
        $("#email").val(data['email']);
    });
    $('#tblAuthor tbody').on('click', '.dt-deleteAuthor', function () {

        var $row = $(this).closest('tr');
        var data = $('#tblAuthor').DataTable().row($row).data();

        var id = data['id'];

        cuteAlertLargo({
            type: "question",
            title: "Mantención de registros",
            message: "¿Deseas eliminar el registro?",
            confirmText: "Si",
            cancelText: "Cancelar"
        }).then((e) => {
            if (e == ("confirm")) {
                DeleteAuthor(id);
                $('#tblAuthor').DataTable().draw();

            } 
        })
    });
}
function SaveAuthor() {
    var Models = {
        Id: $("#id").val(),
        Identifier: $("#identifier").val(),
        FirstName: $("#firstname").val(),
        LastName: $("#lastname").val(),
        Birthdate: $("#birthdate").val(),
        CityOrigin: $("#cityorigin").val(),
        Email: $("#email").val()
    };    
    $.ajax({
        url: "/Author/SaveAuthor/",
        type: 'POST',
        processData: false,
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        data: JSON.stringify(Models),
        async: false,
        success: function (response) {
            if (response.status == 1) {                
                var lst = GetAuthors();
                $('#tblAuthor').DataTable().clear().rows.add(lst.data).draw();                
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
function DeleteAuthor(id) {
    var Models = {
        Id: id      
    };    
    $.ajax({
        url: "/Author/DeleteAuthor/",
        type: 'POST',
        processData: false,
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        data: JSON.stringify(Models),
        async: false,
        success: function (response) {
            if (response.status == 1) {
                var lst = GetAuthors();
                $('#tblAuthor').DataTable().clear().rows.add(lst.data).draw();
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
    return responseFn;
}
function formatDate(paramDate) {
    const dateObj = new Date(paramDate);
    let year = dateObj.getFullYear();
    let month = dateObj.getMonth();
    month = ('0' + (month + 1)).slice(-2);
    let date = dateObj.getDate();
    date = ('0' + date).slice(-2);
    let hour = dateObj.getHours();
    hour = ('0' + hour).slice(-2);
    let minute = dateObj.getMinutes();
    minute = ('0' + minute).slice(-2);
    let second = dateObj.getSeconds();
    second = ('0' + second).slice(-2);
    const time = `${date}/${month}/${year}`;
    return time;
}
function formatDateShow(date) {
    const dateObj = new Date(date);
    return [       
        dateObj.getFullYear(),
        padTo2Digits(dateObj.getMonth()),
        padTo2Digits(dateObj.getDate())
    ].join('-');
}

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}
function ClearInput() {
    $("#id").val("0");
    $("#identifier").val("");
    $("#firstname").val("");
    $("#lastname").val("");
    $("#birthdate").val("");
    $("#cityorigin").val("");
    $("#email").val("");
}