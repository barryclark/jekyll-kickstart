$(document).ready(function() {
  $("#calculate-dayton-tax").click(function() {
    var income = $("#dayton-income").val();
    var oldtax = income * 0.0225;
    var newtax = income * 0.025;
    var difference = income * 0.0025;
    $("#dayton-tax-225").val("$" + oldtax.toFixed(2));
    $("#dayton-tax-25").val("$" + newtax.toFixed(2));
    $("#dayton-tax-025").val("$" + difference.toFixed(2));
  });
});
