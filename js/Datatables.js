function viewData() {
  $.ajax({
    url: "q2.tabledata.txt",
    method: "GET",
  }).done(function (data) {
    $("#example")
      .html(data)
      .DataTable({
        initComplete: function () {
          this.api()
            .columns([3]) //specify the colum number
            .every(function () {
              var column = this;
              var select = $('<select><option value=""></option></select>')
                .appendTo($(column.header()))
                .on("change", function () {
                  var val = $.fn.dataTable.util.escapeRegex($(this).val());
                  column.search(val ? "^" + val + "$" : "", true, false).draw();
                });
              column
                .data()
                .unique()
                .sort()
                .each(function (d, j) {
                  select.append('<option value="' + d + '">' + d + "</option>");
                });
            });
        },
      });
  });
}
