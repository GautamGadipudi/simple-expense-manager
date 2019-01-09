//jQuery

$(document).ready(function() {
  $.ajax({
    url: 'http://127.0.0.1:3000/all',
    type: 'GET',
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    success: function(data) {
      var expenses = data.expenses;
      for (i = 0; i < expenses.length; i++) {
        var row = '<tr><td>'+expenses[i]._id+'</td><td>'+expenses[i].type+'</td><td>'+expenses[i].name+'</td><td>'+expenses[i].created_at+'</td><td class="amount">Rs '+expenses[i].amount+'/-</td></tr>';
        $("table tr:first").after(row);
      }
    },
    error: function(request, error) {
      alert("Unable to add the expense currently. Error: " + error);
    }
  });

  $name = $('input[name="item-name"');
  $amount = $('input[name="amount"');
  $type = $('select[name="type"');
  $date = $('input[name="date"');


  $('#button').click(function() {

    var paymentType = $type.val();
    var paymentName = $name.val();
    var paymentAmount = $amount.val();

    var obj = {
      "type": paymentType,
      "name": paymentName,
      "amount": paymentAmount
    }

    $.ajax({
      url: 'http://127.0.0.1:3000/addExpense',
      type: 'POST',
      data: JSON.stringify(obj),
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      success: function(data) {
        var row = '<tr><td>'+data._id+'</td><td>'+data.type+'</td><td>'+data.name+'</td><td>'+data.created_at+'</td><td class="amount">Rs '+data.amount+'/-</td><td class="amount"><i class="	glyphicon glyphicon-trash" onclick="delete('+data._id+')"></i></td></tr>';
        $("table tr:first").after(row);
      },
      error: function(request, error) {
        alert("Unable to add the expense currently. Error: " + error);
      }
    });

  });

});
